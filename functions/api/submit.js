export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    try {
      const body = await request.json();
      if (!body.formId || !body.data) {
        return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400, headers: { 'content-type': 'application/json' } });
      }

      const id = body.id || crypto.randomUUID();
      const createdAt = body.createdAt || new Date().toISOString();
      const record = {
        id,
        formId: String(body.formId),
        customerId: body.customerId ?? null,
        data: body.data,
        status: ['reviewed', 'merged'].includes(String(body.status || 'new')) ? String(body.status) : 'new',
        createdAt,
      };

      const key = `submission:${id}`;
      if (env?.MAINTER_KV?.put) {
        await env.MAINTER_KV.put(key, JSON.stringify(record), { expirationTtl: 60 * 60 * 24 * 30 });
      }

      return new Response(JSON.stringify({ ok: true, id }), { status: 200, headers: { 'content-type': 'application/json' } });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'bad_request' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }
  },
};
