import { useContext, useEffect, useState } from "react";
import { Check, Trash2, PlusCircle, Filter } from "lucide-react";
import { cyberToast } from "../utils/ui";
import { CyberLoader } from "../utils/ui";
import TodoContext from "../contex/TodoContext";

const Todos = () => {
  const { getTodos, todos, error, addTodo, updateTodo, removeTodo } =
    useContext(TodoContext);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getTodos();
      setInitialLoading(false);
    })();
  }, [getTodos]);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) {
      cyberToast("Please enter a task title ⚠️");
      return;
    }
    setLoading(true);
    try {
      await addTodo(newTodo);
      setNewTodo("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await removeTodo(id);
    } catch (err) {
      // Error handled by context
    }
  };

  const handleToggleTodo = async (todo) => {
    try {
      await updateTodo(todo);
    } catch (err) {
      // Error handled by context
    }
  };

  const filteredTodos =
    filter === "done"
      ? todos.filter((t) => t.completed)
      : filter === "todo"
      ? todos.filter((t) => !t.completed)
      : todos;

  if (initialLoading) {
    return (
      <div className="todo-container">
        <div className="text-center">
          <div className="glass-spinner-large"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-container">
      <CyberLoader loading={loading} />

      <div className="todo-header">
        <h1 className="cyber-title">Create Todo : </h1>
        <div className="todo-input-group">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
            placeholder="Enter a new task..."
            className="cyber-input"
          />
          <button onClick={handleAddTodo} className="cyber-btn-glow">
            <PlusCircle size={18} />
            <span>Create</span>
          </button>
        </div>
      </div>

      <div className="todo-filter">
        <Filter size={18} />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="cyber-select"
        >
          <option value="all">All</option>
          <option value="todo">Active</option>
          <option value="done">Completed</option>
        </select>
      </div>

      {error && <div className="glass-error">{error}</div>}

      <div className="todo-list">
        {filteredTodos && filteredTodos.length > 0 ? (
          filteredTodos.map((t) => (
            <div
              key={t.id}
              className={`todo-card ${t.completed ? "done" : ""}`}
            >
              <p onClick={() => handleToggleTodo(t)}>{t.title}</p>
              <div className="todo-actions">
                <button
                  onClick={() => handleToggleTodo(t)}
                  className="todo-btn check"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={() => handleDeleteTodo(t.id)}
                  className="todo-btn delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="todo-empty">
            <p>No tasks found. Create your first task above! 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
