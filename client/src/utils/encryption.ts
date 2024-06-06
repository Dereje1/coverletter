import crypto from 'crypto-browserify';
import { Buffer } from 'buffer';

const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;

export const encryptApiKey = (apiKey: string): string => {
    const buffer = Buffer.from(apiKey, 'utf-8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
};

export const maskApiKey = (apiKey: string) => `${apiKey.slice(0, 5)}.........${apiKey.slice(-5)}`