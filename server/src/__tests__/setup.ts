/* Shared test setup — runs before every test file */

/* Silence pino pretty output during tests */
process.env['NODE_ENV']           = 'test';
process.env['LOG_LEVEL']          = 'silent';
process.env['JWT_ACCESS_SECRET']  = 'test_access_secret_32chars_minimum_x';
process.env['JWT_REFRESH_SECRET'] = 'test_refresh_secret_32chars_minimum';
process.env['PAYSTACK_SECRET_KEY']= 'sk_test_placeholder';
