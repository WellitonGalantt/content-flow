import { Request } from 'express';
import { ITokenPayload } from '../interfaces'; // Ajuste o caminho para sua interface ITokenPayload

declare module 'express' {
    interface Request {
        user?: ITokenPayload;
    }
}

// Ao usar a declaração de módulo, você está dizendo ao TypeScript para "aumentar" a definição do módulo express, especificamente a interface Request. Você está adicionando uma nova propriedade opcional chamada user com o tipo da sua interface ITokenPayload.

// Como Isso Resolve o Erro no Controller:

// Depois de fazer essa modificação no arquivo de declaração de tipo, a interface padrão Request do Express.js(que você está usando na tipagem do req no seu controller) agora incluirá a propriedade user.Portanto, o TypeScript não reclamará mais que a propriedade user não existe nesse tipo.
