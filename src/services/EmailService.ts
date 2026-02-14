/**
 * Service to handle email requests via Mayleo Email Gateway.
 */

/**
 * Mayleo Email Gateway Error Codes
 */
export const MAYLEO_ERROR_CODES = {
    DISABLED: 'MAYLEO_DISABLED',
    MISSING_CONFIG: 'MAYLEO_MISSING_CONFIG',
    INVALID_REQUEST: 'MAYLEO_INVALID_REQUEST',
    SERVICE_UNAVAILABLE: 'MAYLEO_SERVICE_UNAVAILABLE',
    UNKNOWN_ERROR: 'MAYLEO_UNKNOWN_ERROR'
} as const;

interface EmailData {
    toEmail: string;
    subject?: string;
    message?: string;
    langCode?: string;
    imageSource?: string;
    imagePath?: string;
    [key: string]: unknown;
}

/**
 * Computes an HMAC-SHA256 signature for a given payload and secret.
 * @param {Object} payload The JSON payload to sign.
 * @param {string} secret The HMAC secret key.
 * @returns {Promise<string>} The hex-encoded signature.
 */
async function computeSignature(payload: Record<string, unknown>, secret: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(payload));
    const keyData = encoder.encode(secret);

    const key = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', key, data);
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    return signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Sends an email via the Mayleo Email Gateway.
 * @param {Object} emailData The email data (toEmail, subject, message, langCode, etc.)
 * @returns {Promise<Object>} The response from the gateway.
 */
export async function sendEmail(emailData: EmailData) {
    const enabled = import.meta.env.VITE_MAYLEO_ENABLED || false;
    if (!enabled) {
        throw new Error(MAYLEO_ERROR_CODES.DISABLED);
    }

    const apiKey = import.meta.env.VITE_MAYLEO_API_KEY;
    const hmacSecret = import.meta.env.VITE_MAYLEO_HMAC_SECRET;
    const gatewayUrl = import.meta.env.VITE_MAYLEO_URL;

    if (!apiKey || !hmacSecret || !gatewayUrl) {
        throw new Error(MAYLEO_ERROR_CODES.MISSING_CONFIG);
    }

    const payload = {
        ...emailData,
        // Add default values if missing
        imageSource: emailData.imageSource || 'DEFAULT',
        imagePath: emailData.imagePath || 'postcards/postcard-0.jpg',
    };

    const signature = await computeSignature(payload, hmacSecret);
    const idempotencyKey = crypto.randomUUID();

    try {
        const response = await fetch(gatewayUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey,
                'X-SIGNATURE': signature,
                'X-Idempotency-Key': idempotencyKey,
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            if (response.status >= 400 && response.status < 500) {
                throw new Error(MAYLEO_ERROR_CODES.INVALID_REQUEST);
            }
            throw new Error(MAYLEO_ERROR_CODES.SERVICE_UNAVAILABLE);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error && (Object.values(MAYLEO_ERROR_CODES) as string[]).includes(error.message)) {
            throw error;
        }
        throw new Error(MAYLEO_ERROR_CODES.SERVICE_UNAVAILABLE);
    }
}

export default { sendEmail };
