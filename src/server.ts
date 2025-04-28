import express from 'express';
import { testDbConnection } from './database/knex/connection';
import dotenv from 'dotenv';
import router from './routes/routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/contentflow/api', router);

testDbConnection()
.then(() => {
    app.listen(process.env.PORT || 3333, () => {
      console.log(`🚀 Servidor rodando na porta http://localhost:${process.env.PORT || 3333}/api`);
    });
  })
  .catch((error) => {
    console.error('Falha ao iniciar o servidor:', error);
  });

// app.listen(3333, () => {
//     console.log(`Rodando em http://localhost:3333`);
// });
