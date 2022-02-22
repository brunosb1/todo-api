import { Router } from 'express';

import * as todoController from '../controllers/todoController';

const router = Router();

// listando todas tarefas
router.get('/todo', todoController.all);

//Inserção de uma tarefa 
router.post('/todo', todoController.add);

//edit de alguma tarefa por id
router.put('/todo/:id', todoController.update);

//delete de alguma tarefa pelo ID;
router.delete('/todo/:id', todoController.del);

export default router;