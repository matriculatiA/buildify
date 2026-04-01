export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/chat') {
      return handleChat(request, env, ctx);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleChat(request, env, ctx) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { messages, pageUrl, leadEmail } = await request.json();

    if (!env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ reply: 'Конфигурационна грешка. Пиши ни на contact@buildify.bg' }),
        { status: 200, headers: cors }
      );
    }

    const system = `Ти си асистент на buildify.bg — дигитална агенция от Бургас, България.

СЪЩНОСТ НА АГЕНЦИЯТА:
buildify.bg изгражда дигитални продукти за бизнеса — уебсайтове, AI чатботове, и custom функционалности. По принцип може да се изгради всичко, което е технически постижимо в рамките на съвременните уеб технологии.

ЦЕНОВИ ОРИЕНТИРИ (само за справка, не ги изброявай проактивно):
• Landing page от 350€, бизнес сайт от 750€, корпоративен от 1 800€
• Custom функционалности: от 150€
• AI чатботове: от 200€

ЛИНКОВЕ (използвай само когато е наистина уместно):
/websites, /plugins, /ai-bots, /blog, /contact, /proverka-na-sait

КАК ДА СЕ ДЪРЖИШ:
1. Първо отговори на въпроса — ако някой пита нещо, помогни му директно. Не питчвай услуги.
2. Задавай уточняващи въпроси само ако е нужно да разбереш по-добре — не засипвай с въпроси.
3. Ако имаш нещо конкретно и полезно от сайта (статия, страница, цена) — спомени го естествено като информация, не като реклама.
4. Едва когато разговорът стигне до конкретно запитване — предложи /contact.
5. Никога не изреждай какво можем и какво не можем да правим.

ПРАВИЛА:
- Отговаряй САМО на български
- Кратко — максимум 2-3 изречения
- Никога не измисляй факти или цени
- Не използвай емоджита
- Текущата страница: ${pageUrl || '/'}`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 280,
        system,
        messages,
      }),
    });

    if (!res.ok) throw new Error('Claude error ' + res.status);

    const data = await res.json();
    const reply = data.content[0].text;

    if (leadEmail) {
      const now = new Date();
      const bgHour = (now.getUTCHours() + 2) % 24;
      const isWorkHours = bgHour >= 8 && bgHour < 20;
      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content ?? '';

      ctx.waitUntil(
        fetch('https://formspree.io/f/xjgpvgle', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: leadEmail,
            _subject: `Чатбот лийд: ${leadEmail}`,
            message: `Лийд от чатбота\n\nИмейл: ${leadEmail}\nСтраница: ${pageUrl}\nПоследно съобщение: ${lastUserMsg}\nРаботно време: ${isWorkHours ? 'да' : 'не'}`,
          }),
        })
      );
    }

    return new Response(JSON.stringify({ reply }), { headers: cors });

  } catch {
    return new Response(
      JSON.stringify({ reply: 'Имам технически проблем. Пиши ни директно на contact@buildify.bg' }),
      { status: 200, headers: cors }
    );
  }
}
