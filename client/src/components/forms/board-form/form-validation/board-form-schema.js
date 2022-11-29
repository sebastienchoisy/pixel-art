export default {
  type: 'object',
  properties: {
    name: {
      type: 'string', minLength: 4, maxLength: 50, pattern: '^[a-zA-Z0-9]+$',
    },
    nbLine: { type: 'integer', minimum: 8, maximum: 128 },
    nbColumn: { type: 'integer', minimum: 8, maximum: 128 },
    dateOfClosure: { type: 'string', format: 'date' },
    intervalPixel: { type: 'integer', minimum: 0 },
    multipleDrawPixel: { type: 'boolean' },
  },
  required: [
    'name',
    'nbLine',
    'nbColumn',
    'dateOfClosure',
    'intervalPixel',
    'multipleDrawPixel',
  ],
};
