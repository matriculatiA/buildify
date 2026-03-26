# buildify.bg

Астро проект за buildify.bg — уебсайтове, AI ботове, QA тестване и плъгини.

## Старт

```bash
npm install
npm run dev
```

## Deploy на Cloudflare Pages

1. Push в GitHub
2. Свържи repo в Cloudflare Pages
3. Build command: `npm run build`
4. Output dir: `dist`

## Структура

```
src/
  layouts/BaseLayout.astro   ← SEO, Nav, Footer
  pages/
    index.astro              ← Homepage
    qa-testване.astro        ← QA страница
    ai-botove.astro          ← AI ботове (TODO)
    websites.astro           ← Уебсайтове (TODO)
    plugini.astro            ← Плъгини (TODO)
    kontakt.astro            ← Контакти
    blog/
      index.astro            ← Блог листинг
  styles/global.css
```
