import { Request, Response } from "express";
import Todo from "../models/Todo";

// Get Todos

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll({
      order: [["id", "ASC"]],
    });

    res.json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add Todo

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    await Todo.create({
      text,
      completed: false,
      favourite: false,
    });

    res.json({
      message: "Todo Added Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete Todo

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Todo.destroy({
      where: {
        id,
      },
    });

    res.json({
      message: "Todo Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update Todo

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    await Todo.update(
      { text },
      {
        where: {
          id,
        },
      }
    );

    res.json({
      message: "Todo Updated Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Complete & Favourite

export const patchTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { completed, favourite } = req.body;

    await Todo.update(
      {
        completed,
        favourite,
      },
      {
        where: {
          id,
        },
      }
    );

    res.json({
      message: "Todo Updated Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
