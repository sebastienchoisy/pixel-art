// Schema pour le form du login
export default {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },

  },
  required: [
    'username',
    'password',
  ],
};
