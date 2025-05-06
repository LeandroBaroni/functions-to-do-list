import {Express, Request, Response} from 'express'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'Rest API To-Do Docs',
      version: "1.0.0"
    },
    components: {

    }
  }
}