import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-Do API',
      version: '1.0.0',
      description: 'API para gerenciamento de tarefas',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/http/routes/**/*.ts', 'src/http/routes/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
console.log(swaggerSpec)
export default swaggerSpec;