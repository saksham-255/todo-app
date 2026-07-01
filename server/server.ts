import express from "express";
import type { Request, Response } from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todoapp",
});

db.connect((err) => {
  if (err) {
    console.log("Connection Failed");
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

// ================= GET TODOS =================

app.get("/todos", (req: Request, res: Response) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// ================= ADD TODO =================

app.post("/todos", (req: Request, res: Response) => {
  const { text } = req.body;

  db.query("INSERT INTO todos(text) VALUES(?)", [text], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Todo Added Successfully",
    });
  });
});

// ================= UPDATE TODO TEXT =================

app.put("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;

  db.query("UPDATE todos SET text=? WHERE id=?", [text, id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Todo Updated Successfully",
    });
  });
});

// ================= UPDATE COMPLETE / FAVOURITE =================

app.patch("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed, favourite } = req.body;

  db.query(
    "UPDATE todos SET completed=?, favourite=? WHERE id=?",
    [completed, favourite, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Todo Updated",
      });
    }
  );
});

// ================= DELETE TODO =================

app.delete("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  db.query("DELETE FROM todos WHERE id=?", [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Todo Deleted Successfully",
    });
  });
});

// ================= START SERVER =================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
