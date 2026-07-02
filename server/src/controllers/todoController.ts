import { Request, Response } from "express";
import db from "../config/db";

// get todos

export const getTodos = (req: Request, res: Response) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// add todo

export const addTodo = (req: Request, res: Response) => {
  const { text } = req.body;

  db.query(
    "INSERT INTO todos(text, completed, favourite) VALUES (?,0,0)",
    [text],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Todo Added Successfully",
      });
    }
  );
};

// delete todo

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;

  db.query("DELETE FROM todos WHERE id=?", [id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Todo Deleted Successfully",
    });
  });
};

// edit todo

export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;

  db.query("UPDATE todos SET text=? WHERE id=?", [text, id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Todo Updated Successfully",
    });
  });
};
//   complete and favourite

export const patchTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed, favourite } = req.body;

  db.query(
    "UPDATE todos SET completed=?, favourite=? WHERE id=?",
    [completed, favourite, id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Todo Updated Successfully",
      });
    }
  );
};
