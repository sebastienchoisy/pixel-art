export default {
  type: 'object',
  properties: {
    username: {
      type: 'string', minLength: 4, maxLength: 20, pattern: '^[a-zA-Z0-9]+$',
    },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6, maxLength: 20 },
    password2: { type: 'string', minLength: 6, maxLength: 20 },

  },
  required: [
    'username',
    'email',
    'password',
    'password2',
  ],
};
