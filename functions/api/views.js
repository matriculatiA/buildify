export async function onRequest(context) {
  const url = new URL(context.request.url);
  const slug = url.searchParams.get('slug');

  if (!slug) {
    return new Response(JSON.stringify({ error: 'missing slug' }), { status: 400 });
  }

  const kv = context.env.VIEWS;
  if (!kv) {
    return new Response(JSON.stringify({ views: 0 }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  // POST — increment
  if (context.request.method === 'POST') {
    const current = parseInt(await kv.get(slug) || '0');
    const next = current + 1;
    await kv.put(slug, String(next));
    return new Response(JSON.stringify({ views: next }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  // GET — read (bulk: ?slug=a&slug=b... or single)
  const slugs = url.searchParams.getAll('slug');
  if (slugs.length > 1) {
    const counts = await Promise.all(slugs.map(async s => ({
      slug: s,
      views: parseInt(await kv.get(s) || '0')
    })));
    return new Response(JSON.stringify(counts), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  const views = parseInt(await kv.get(slug) || '0');
  return new Response(JSON.stringify({ views }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}
