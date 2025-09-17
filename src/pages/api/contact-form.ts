import type { APIRoute } from 'astro';
import { sendTelegramMessage, formatContactMessage } from '../../utils/telegram';
import { CHAT_ID } from '../../utils/constants';
import { getPathLanguage } from '../../utils/get-path-language';

export const POST: APIRoute = async ({ redirect, request }) => {

  const formData = await request.text();
  const params = new URLSearchParams(formData);

  const [name, phone, email, message] = params.values();
  let paths = request.headers.get('referer')

  let language = getPathLanguage(paths)

  const formattedMessage = formatContactMessage({
    name,
    phone,
    email,
    message,
    language
  });

  await sendTelegramMessage({
    chat_id: CHAT_ID,
    text: formattedMessage,
  });

  return redirect(`/${language ? language : ''}/#contact`, 302)
};

export const prerender = false;