import { API_URL } from './constants';

export interface TelegramMessage {
  chat_id: number | string;
  text: string;
  parse_mode?: string;
}

export async function sendTelegramMessage(
  message: TelegramMessage,
): Promise<boolean> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: message.chat_id,
        text: message.text,
        parse_mode: message.parse_mode || 'HTML',
      }),
    });

    if (!response.ok) {
      console.error('Telegram API error:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    return false;
  }
}

export function formatContactMessage(formData: {
  name: string;
  phone: string;
  email: string;
  message: string;
  language?: string;
}): string {
  const { name, phone, email, message, language = 'ru' } = formData;

  return `
<b>📧 New Contact Request</b>

<b>👤 Name:</b> <code>${escapeHtml(name)}</code>
<b>📞 Phone:</b> <code>${escapeHtml(phone)}</code>
<b>📧 Email:</b> <code>${escapeHtml(email || 'Not provided')}</code>
<b>🌐 Language:</b> <code>${escapeHtml(language)}</code>

<b>💬 Message:</b>
${escapeHtml(message || 'No message provided')}
`.trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
