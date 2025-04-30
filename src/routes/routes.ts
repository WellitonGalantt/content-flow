import Router from 'express';
import { Request, Response } from 'express';

const router = Router();

router.post('/project');

router.get('/project');

router.get('/project/:id');

router.put('/project');

router.delete('/project');

export default router;
