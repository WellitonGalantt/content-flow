import Router from 'express';
import { Request, Response } from 'express';
import { ProjectControllers } from '../controllers/ProjectControllers';
import { Middlewares } from '../middlewares/Middleware';

const router = Router();

// Criar um projeto
router.post('/project', Middlewares.validateJwtToken(), ProjectControllers.createProject);

// Pegar a lista dos projetos
router.get('/project', ProjectControllers.createProject);

// Pegar um projeto especfico
router.get('/project/:id', ProjectControllers.createProject);

// Atualizar um projeto
router.put('/project', ProjectControllers.createProject);

//Deletar um projeto
router.delete('/project', ProjectControllers.createProject);

// Tags

//Criar uma tag
router.post('/project/tag', Middlewares.validateJwtToken(), ProjectControllers.createTag);

//Buscar as tags

//Deletar uma tag

export default router;
