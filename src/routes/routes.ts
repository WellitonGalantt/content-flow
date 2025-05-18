import Router from 'express';
import { Request, Response } from 'express';
import { ProjectControllers } from '../controllers/ProjectControllers';
import { Middlewares } from '../middlewares/Middleware';
import { createProjectSchema, createTagSchema, updateProjectSchema } from '../shared/schemas/projectSchema';

const router = Router();

// Criar um projeto
router.post(
    '/project',
    Middlewares.validateJwtToken(),
    Middlewares.validateSchema(createProjectSchema),
    ProjectControllers.createProject
);

// Pegar a lista dos projetos
router.get('/project', Middlewares.validateJwtToken(), ProjectControllers.getAllProject);

// Pegar um projeto especfico
router.get('/project/:id', Middlewares.validateJwtToken(), ProjectControllers.getProjectById);

// Atualizar um projeto
router.put(
    '/project/:id',
    Middlewares.validateJwtToken(),
    Middlewares.validateSchema(updateProjectSchema),
    ProjectControllers.updateProject
);

//Deletar um projeto
router.delete('/project/:id', Middlewares.validateJwtToken(), ProjectControllers.deleteProjectById);

// Tags

//Criar uma tag
router.post(
    '/project/tag',
    Middlewares.validateJwtToken(),
    Middlewares.validateSchema(createTagSchema),
    ProjectControllers.createTag
);

//Buscar as tags
router.post('/project/tag', Middlewares.validateJwtToken(), ProjectControllers.getTagById);

//Buscar uma tags
router.post('/project/tag/:id', Middlewares.validateJwtToken(), ProjectControllers.getAllTag);

//Deletar uma tag
router.post('/project/tag', Middlewares.validateJwtToken(), ProjectControllers.deleteTagById);

export default router;
