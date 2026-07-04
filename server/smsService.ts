/**
 * SMS Service for Twilio Integration
 * 
 * To use this service:
 * 1. Sign up at https://www.twilio.com
 * 2. Get your Account SID and Auth Token
 * 3. Get a Twilio phone number
 * 4. Install twilio: npm install twilio
 * 5. Add to environment variables:
 *    - TWILIO_ACCOUNT_SID
 *    - TWILIO_AUTH_TOKEN
 *    - TWILIO_PHONE_NUMBER
 */

interface SMSOptions {
  to: string;
  message: string;
}

let twilioClient: any = null;

/**
 * Initialize Twilio client
 */
function initTwilio() {
  if (twilioClient) return twilioClient;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    console.warn("[SMS] Twilio credentials not configured.");
    return null;
  }

  try {
    // Dynamic require to avoid import errors if twilio is not installed
    const twilio = require("twilio");
    twilioClient = twilio(accountSid, authToken);
    return twilioClient;
  } catch (error) {
    console.warn("[SMS] Twilio SDK not installed. Install with: npm install twilio");
    return null;
  }
}

/**
 * Send SMS notification via Twilio
 */
export async function sendSMS({ to, message }: SMSOptions): Promise<boolean> {
  try {
    const client = initTwilio();
    if (!client) {
      console.warn("[SMS] Twilio not initialized. SMS not sent.");
      return false;
    }

    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    if (!fromNumber) {
      console.warn("[SMS] TWILIO_PHONE_NUMBER not configured.");
      return false;
    }

    // Validate phone number format (E.164)
    if (!to || !to.match(/^\+?[1-9]\d{1,14}$/)) {
      console.warn(`[SMS] Invalid phone number format: ${to}`);
      return false;
    }

    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: to,
    });

    console.log(`[SMS] Message sent successfully. SID: ${result.sid}`);
    return true;
  } catch (error) {
    console.error("[SMS] Failed to send SMS:", error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Send bulk SMS to multiple recipients
 */
export async function sendBulkSMS(recipients: string[], message: string): Promise<number> {
  let successCount = 0;

  for (const recipient of recipients) {
    const success = await sendSMS({ to: recipient, message });
    if (success) successCount++;
  }

  return successCount;
}

/**
 * Format notification message for SMS (keep it short)
 */
export function formatSMSMessage(title: string, message: string): string {
  const maxLength = 160; // SMS character limit
  const fullMessage = `${title}: ${message}`;

  if (fullMessage.length <= maxLength) {
    return fullMessage;
  }

  return fullMessage.substring(0, maxLength - 3) + "...";
}
