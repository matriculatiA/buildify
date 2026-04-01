export async function onRequestPost(context) {
  const { request, env } = context;

  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const { messages, pageUrl, leadEmail } = await request.json();

    if (!env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ reply: 'Конфигурационна грешка. Пиши ни на contact@buildify.bg' }),
        { status: 200, headers: cors }
      );
    }

    const system = `Ти си асистент на buildify.bg — дигитална агенция от Бургас, България.
Помагаш на посетителите да разберат услугите и да намерят подходящото решение.

УСЛУГИ И ЦЕНИ (само тези — не измисляй други):
• Уебсайтове: landing page от 350€, бизнес сайт от 750€, корпоративен от 1 800€
• Плъгини по заявка: от 150€ (калкулатори, форми, резервации, API интеграции)
• AI чатботове: от 200€ еднократно
• Безплатна SEO проверка на сайт: /proverka-na-sait

ЛИНКОВЕ В САЙТА:
/websites — Уеб дизайн и цени
/plugins — Плъгини по заявка
/ai-bots — AI чатботове
/blog — Блог статии
/contact — Контактна форма
/proverka-na-sait — Безплатна проверка на сайт

ПРАВИЛА:
- Отговаряй САМО на български
- Максимум 3 кратки изречения на отговор
- Препоръчвай конкретен линк когато е уместно (пиши като /websites)
- Ако не знаеш — кажи: пиши директно на contact@buildify.bg
- Никога не измисляй факти, цени или услуги
- Текущата страница на потребителя: ${pageUrl || '/'}`;

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

    // Collect lead + notify owner via Formspree
    if (leadEmail) {
      const now = new Date();
      const bgHour = (now.getUTCHours() + 2) % 24;
      const isWorkHours = bgHour >= 8 && bgHour < 20;

      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content ?? '';

      // Always save the lead
      context.waitUntil(
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

export function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
