import swaggerJsdoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Color Mixing API',
      version: '1.0.0',
      description: 'API Color Mixing (CMY-based)',
    },
  },
  apis: ['./src/routes/*.ts'], // Ini untuk baca komentar @swagger dari file routes
});

export default swaggerSpec;