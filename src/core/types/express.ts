import { DecodedIdToken } from 'firebase-admin/auth';

declare global {
  namespace Express {
    interface Request {
      /**
       * Um hash único gerado para identificar o dispositivo do cliente.
       * Este hash é baseado no IP, user-agent e origin do cliente.
       *
       * @requires Utilização do middleware `ensureDeviceHash` para estar disponível na requisição.
       */
      deviceHash: string;

      /**
       * Objeto contendo informações do usuário decodificadas do token de autenticação do Firebase.
       * Inclui detalhes como UID, email, e claims personalizados.
       */
      user: DecodedIdToken;
    }
  }
}