import { useContext, useState } from "react";
import TodoContext from "../../contex/TodoContext";

const DeleteTodo = ({ todoId }) => {
    const [loading, setLoading] = useState(false);
    const { removeTodo } = useContext(TodoContext);

    const handleDelete = async () => {
        setLoading(true)
        await removeTodo(todoId)
    }

    return (
        <div className="d-flex align-items-center">
            <i onClick={() => handleDelete()} className={`bi bi-trash-fill glass-icon delete ${loading ? 'opacity-50' : ''}`}></i>
            {loading && <span className="glass-spinner"></span>}
        </div>
    )
}

export default DeleteTodo;