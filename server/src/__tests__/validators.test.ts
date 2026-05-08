import './setup';
import { registerSchema, loginSchema, otpVerifySchema } from '../validators/auth';
import { createProductSchema } from '../validators/products';
import { createOrderSchema } from '../validators/orders';

describe('Auth validators', () => {

  describe('registerSchema', () => {
    const valid = {
      name: 'Tunde Bakare', email: 'tunde@test.com',
      phone: '+2348034567890', password: 'securepass1', role: 'farmer',
    };

    it('accepts a valid farmer registration', () => {
      expect(registerSchema.safeParse(valid).success).toBe(true);
    });

    it('rejects an invalid email', () => {
      expect(registerSchema.safeParse({ ...valid, email: 'not-an-email' }).success).toBe(false);
    });

    it('rejects a non-Nigerian phone number', () => {
      expect(registerSchema.safeParse({ ...valid, phone: '+1555123456' }).success).toBe(false);
    });

    it('rejects a short password', () => {
      expect(registerSchema.safeParse({ ...valid, password: 'short' }).success).toBe(false);
    });

    it('rejects an invalid role', () => {
      expect(registerSchema.safeParse({ ...valid, role: 'admin' }).success).toBe(false);
    });
  });

  describe('loginSchema', () => {
    it('accepts valid credentials', () => {
      expect(loginSchema.safeParse({ email: 'a@b.com', password: 'password123' }).success).toBe(true);
    });
    it('rejects empty password', () => {
      expect(loginSchema.safeParse({ email: 'a@b.com', password: '' }).success).toBe(false);
    });
  });

  describe('otpVerifySchema', () => {
    it('accepts a valid 6-digit OTP', () => {
      expect(otpVerifySchema.safeParse({ phone: '+2348034567890', code: '123456' }).success).toBe(true);
    });
    it('rejects a non-numeric OTP', () => {
      expect(otpVerifySchema.safeParse({ phone: '+2348034567890', code: 'abcdef' }).success).toBe(false);
    });
    it('rejects a short OTP', () => {
      expect(otpVerifySchema.safeParse({ phone: '+2348034567890', code: '12345' }).success).toBe(false);
    });
  });
});

describe('Product validator', () => {
  const valid = {
    name: 'Hybrid Maize Seeds', inputType: 'seeds',
    subCategory: 'Hybrid Seeds', price: 15000, unit: 'kg', stock: 450,
  };

  it('accepts a valid product', () => {
    expect(createProductSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a negative price', () => {
    expect(createProductSchema.safeParse({ ...valid, price: -100 }).success).toBe(false);
  });

  it('rejects an invalid inputType', () => {
    expect(createProductSchema.safeParse({ ...valid, inputType: 'shoes' }).success).toBe(false);
  });
});

describe('Order validator', () => {
  const valid = {
    items:           [{ productId: 'prod-1', qty: 2 }],
    deliveryName:    'Tunde Bakare',
    deliveryPhone:   '+2348034567890',
    deliveryAddress: '45 Ahmadu Bello Way, Kaduna',
    deliveryState:   'Kaduna',
    deliveryCity:    'Kaduna North',
    paymentMethod:   'wallet',
  };

  it('accepts a valid order', () => {
    expect(createOrderSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects an empty items array', () => {
    expect(createOrderSchema.safeParse({ ...valid, items: [] }).success).toBe(false);
  });

  it('rejects an invalid paymentMethod', () => {
    expect(createOrderSchema.safeParse({ ...valid, paymentMethod: 'bitcoin' }).success).toBe(false);
  });
});
