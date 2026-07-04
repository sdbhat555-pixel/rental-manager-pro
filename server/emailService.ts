/**
 * Email Service for SendGrid Integration
 * 
 * To use this service:
 * 1. Sign up at https://sendgrid.com
 * 2. Create an API key
 * 3. Install sendgrid: npm install @sendgrid/mail
 * 4. Add to environment variables:
 *    - SENDGRID_API_KEY
 *    - SENDGRID_FROM_EMAIL
 */

interface EmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

let sendgridClient: any = null;

/**
 * Initialize SendGrid client
 */
function initSendGrid() {
  if (sendgridClient) return sendgridClient;

  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    console.warn("[Email] SendGrid API key not configured.");
    return null;
  }

  try {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(apiKey);
    sendgridClient = sgMail;
    return sendgridClient;
  } catch (error) {
    console.warn("[Email] SendGrid SDK not installed. Install with: npm install @sendgrid/mail");
    return null;
  }
}

/**
 * Send email notification via SendGrid
 */
export async function sendEmail({ to, subject, htmlContent, textContent }: EmailOptions): Promise<boolean> {
  try {
    const client = initSendGrid();
    if (!client) {
      console.warn("[Email] SendGrid not initialized. Email not sent.");
      return false;
    }

    const fromEmail = process.env.SENDGRID_FROM_EMAIL;

    if (!fromEmail) {
      console.warn("[Email] SENDGRID_FROM_EMAIL not configured.");
      return false;
    }

    // Validate email format
    if (!to || !to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      console.warn(`[Email] Invalid email format: ${to}`);
      return false;
    }

    const msg = {
      to,
      from: fromEmail,
      subject,
      html: htmlContent,
      text: textContent || htmlContent.replace(/<[^>]*>/g, ""),
    };

    const result = await client.send(msg);

    console.log(`[Email] Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send email:", error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Send bulk emails to multiple recipients
 */
export async function sendBulkEmail(recipients: string[], subject: string, htmlContent: string): Promise<number> {
  let successCount = 0;

  for (const recipient of recipients) {
    const success = await sendEmail({ to: recipient, subject, htmlContent });
    if (success) successCount++;
  }

  return successCount;
}

/**
 * Generate HTML email template for notifications
 */
export function generateNotificationEmailTemplate(
  title: string,
  message: string,
  actionUrl?: string,
  actionLabel?: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #f9f9f9;
          }
          .header {
            background: linear-gradient(135deg, #001a4d 0%, #003d99 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .message {
            font-size: 16px;
            margin-bottom: 20px;
            color: #555;
          }
          .action-button {
            display: inline-block;
            background: linear-gradient(135deg, #ff9500 0%, #ffb84d 100%);
            color: white;
            padding: 12px 30px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #ff9500;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">RM</div>
            <h1>Rental Manager Pro</h1>
          </div>
          <div class="content">
            <div class="title">${title}</div>
            <div class="message">${message}</div>
            ${
              actionUrl && actionLabel
                ? `<a href="${actionUrl}" class="action-button">${actionLabel}</a>`
                : ""
            }
          </div>
          <div class="footer">
            <p>Rental Manager Pro | Smart. Simple. Secure.</p>
            <p>© 2026 Developed by Shahid Ibn Rashid</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Send notification email
 */
export async function sendNotificationEmail(
  to: string,
  title: string,
  message: string,
  actionUrl?: string,
  actionLabel?: string
): Promise<boolean> {
  const htmlContent = generateNotificationEmailTemplate(title, message, actionUrl, actionLabel);
  return sendEmail({
    to,
    subject: title,
    htmlContent,
    textContent: message,
  });
}
