export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  cat: string;
  date: string;
}

// Най-новата статия е първа в масива
export const posts: Post[] = [
  { slug: "kolko-struva-ai-chatbot",                  title: "Колко струва AI чатбот за малкия бизнес в България?",                  excerpt: "Реални цени за 2026 — от готов плъгин до персонализиран бот. Кога се изплаща и кога не си струва.",                                cat: "AI",         date: "Март 2026"  },
  { slug: "wordpress-sreshtu-custom-sayt",            title: "WordPress срещу custom сайт — кое е по-добро за малкия бизнес?",    excerpt: "Честно сравнение — цена, скорост, SEO, поддръжка. Кога WordPress е достатъчен и кога custom си струва.",                       cat: "Уебсайтове", date: "Март 2026"  },
  { slug: "kak-da-izberem-ueb-razrabotchik-bulgaria", title: "Как да изберем уеб разработчик в България — 7 въпроса преди да подпишеш", excerpt: "Практичен наръчник за избор на агенция или фрийлансър. Червените флагове, на които да внимаваш.",                        cat: "Уебсайтове", date: "Март 2026"  },
  { slug: "tsena-uebsayt-bulgaria-2026",              title: "Колко струва изработката на уебсайт в България за 2026?",              excerpt: "Пълен ценови наръчник - от landing page до корпоративен сайт.",                                                              cat: "SEO",        date: "Март 2026"  },
  { slug: "koga-ti-trqbva-ai-bot",                    title: "Кога имаш нужда от AI бот за бизнеса си?",                             excerpt: "3 ясни знака, че е момент да автоматизираш клиентското обслужване.",                                                          cat: "AI",         date: "Февр. 2026" },
  { slug: "sayt-gubi-klienti-tehniches-greshki",      title: "Защо сайтът ти губи клиенти заради технически грешки?",               excerpt: "Счупени форми, бавно зареждане, мобилни бъгове - невидимите убийци на продажбите.",                                           cat: "QA",         date: "Февр. 2026" },
];
