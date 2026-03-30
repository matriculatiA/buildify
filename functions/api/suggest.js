export async function onRequest(context) {
  const url = new URL(context.request.url);
  const query = url.searchParams.get('q') || '';

  if (!query.trim()) {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    const googleUrl = `https://suggestqueries.google.com/complete/search?client=firefox&hl=bg&gl=bg&q=${encodeURIComponent(query)}`;
    const res = await fetch(googleUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0' }
    });
    const data = await res.json();
    const suggestions = Array.isArray(data[1]) ? data[1] : [];
    return new Response(JSON.stringify(suggestions), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
