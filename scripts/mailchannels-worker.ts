const makeResponse = ({ statusText, status }) =>
  new Response(JSON.stringify({ statusText, status }), {
    headers: {
      'content-type': 'application/json',
    },
  });

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Hello World!');
    }

    const accessKey = await env.accessKeys.get('membership');
    const data = await request.json();

    console.log({ data });

    if (accessKey !== data.secret) {
      return makeResponse({ status: 404, statusText: 'Forbidden' });
    }

    const mailReq = new Request('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: 'gnimmelf@gmail.com', name: 'Test Recipient' }],
          },
        ],
        from: {
          email: 'data@intergate.io',
          name: 'Workers - MailChannels integration',
        },
        reply_to: {
          email: 'data@intergate.io',
          name: 'Workers - MailChannels integration',
        },
        subject: 'Look! No servers',
        content: [
          {
            type: 'text/plain',
            value: [
              `And no email service accounts and all for free too!`,
              `Data: ${JSON.stringify({ accessKey, data }, null, 2)}`,
            ].join('\n'),
          },
        ],
      }),
    });

    const res = await fetch(mailReq);

    return makeResponse(res);
  },
};
