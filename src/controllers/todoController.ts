import { Request, Response } from 'express';

import { Todo } from '../models/Todo';


export const all = async (req: Request, res: Response) => {
    //sequelize utilizando o find all e mandando como resposta o res.json
    const list = await Todo.findAll();
    res.json({ list });
}

export const add = async (req: Request, res: Response) => {
    // fazendo a verificação se foi enviada o corpo da requisição request{body}
        if(req.body.title) {
    // se ele fez a verificação de que foi enviada o corpo da requisição title: e done: ele faz a inserção
        let newTodo = await Todo.create ({
        title: req.body.title,
        done: req.body.done ? true : false
    });
   //enviando a resposta de que foi adicionado ao banco de dados com a resposta 201 created.
    res.status(201);
 } else {
  res.json({error: 'Dados não enviados'});
    }
}

export const update = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    // adicionando na variavel o id que a gente enviar via params(id) e se ele existe
    let todo = await Todo.findByPk(id);
    if(todo){

        if(req.body.title.toLowerCase()) {
        todo.title = req.body.title;
        }
        if(req.body.done){
            switch(req.body.done) {
                case 'true': 
                case '1':   
                todo.done = true;
                break;
                case 'false': 
                case '0':   
                todo.done = false;
                break;
            }
           
        }
        await todo.save();
        res.status(200);
    }
        res.json({error: 'item não encontrado'});
}

export const del = async (req: Request, res: Response) => {
    let id = req.params.id;

    let todo = await Todo.findByPk(id);
    if(todo){
        await Todo.destroy()
    }
    res.json({});
}