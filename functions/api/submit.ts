export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
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
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    try {
      const body = await request.json();
      if (!body.formId || !body.data) {
        return new Response(JSON.stringify({ error: 'Invalid payload' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
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

      return new Response(JSON.stringify({ ok: true, id }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'bad_request' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};
