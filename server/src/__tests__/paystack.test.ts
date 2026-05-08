import './setup';
import crypto from 'crypto';
import { verifyWebhookSignature, generateReference } from '../services/paystack';

describe('Paystack service', () => {

  describe('verifyWebhookSignature', () => {
    const secret = 'test_paystack_secret';

    function makeSignature(body: Buffer | string): string {
      return crypto
        .createHmac('sha512', secret)
        .update(body)
        .digest('hex');
    }

    it('accepts a valid signature', () => {
      const body = Buffer.from('{"event":"charge.success"}');
      const sig  = makeSignature(body);
      // Patch env for this call
      process.env['PAYSTACK_SECRET_KEY'] = secret;
      expect(verifyWebhookSignature(body, sig)).toBe(true);
    });

    it('rejects a tampered body', () => {
      const original = Buffer.from('{"event":"charge.success"}');
      const sig      = makeSignature(original);
      const tampered = Buffer.from('{"event":"charge.failed"}');
      process.env['PAYSTACK_SECRET_KEY'] = secret;
      expect(verifyWebhookSignature(tampered, sig)).toBe(false);
    });

    it('rejects a wrong signature', () => {
      const body = Buffer.from('{"event":"charge.success"}');
      process.env['PAYSTACK_SECRET_KEY'] = secret;
      expect(verifyWebhookSignature(body, 'wrong_signature_here_padded_to_128_chars_00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')).toBe(false);
    });
  });

  describe('generateReference', () => {
    it('includes the prefix', () => {
      const ref = generateReference('ORD');
      expect(ref).toMatch(/^AGC-ORD-/);
    });

    it('generates unique references', () => {
      const refs = new Set(Array.from({ length: 100 }, () => generateReference('TEST')));
      expect(refs.size).toBe(100);
    });
  });
});
