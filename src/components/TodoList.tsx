import type { Todo } from "../types/todo";
import TodoCard from "./TodoCard";

interface Props {
  todos: Todo[];

  editIndex: number | null;
  editText: string;

  setEditText: (text: string) => void;

  startEdit: (index: number) => void;
  saveEdit: () => void;

  completeTask: (todo: Todo) => void;
  favouriteTask: (todo: Todo) => void;
  deleteTask: (id: number) => void;
}

const TodoList = ({
  todos,
  editIndex,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  completeTask,
  favouriteTask,
  deleteTask,
}: Props) => {
  return (
    <div className="space-y-4">
      {todos.map((todo, index) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          index={index}
          editIndex={editIndex}
          editText={editText}
          setEditText={setEditText}
          startEdit={startEdit}
          saveEdit={saveEdit}
          completeTask={completeTask}
          favouriteTask={favouriteTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TodoList;
