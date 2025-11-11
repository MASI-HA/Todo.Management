import { useContext, useState } from "react";
import TodoContext from "../../contex/TodoContext";

const UpdateTodo = ({todo}) => {
    const [loading, setLoading] = useState(false);
    const { updateTodo } = useContext(TodoContext);

    const handleUpdate = async () => {
        setLoading(true)
        await updateTodo(todo)
        setLoading(false)
    }
    return (
        <div className="d-flex align-items-center">
            {todo.completed ?
                <i onClick={() => handleUpdate()} className={`bi bi-check-all glass-icon check ${loading ? 'opacity-50' : ''}`}></i>
                :
                <i onClick={() => handleUpdate()} className={`bi bi-check glass-icon check ${loading ? 'opacity-50' : ''}`}></i>
            }
            {loading && <span className="glass-spinner"></span>}
        </div>
    )
}

export default UpdateTodo;