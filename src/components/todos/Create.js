import { useContext, useState } from "react";
import TodoContext from "../../contex/TodoContext";

const CreateTodo = () => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const { addTodo } = useContext(TodoContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title) {
            setLoading(true)
            await addTodo(title)
            setLoading(false)
        }
    }
    return (
        <div className="glass-form-group">
            <h4 className="glass-section-title">Create Todo</h4>
            <form onSubmit={(e) => handleSubmit(e)} className="d-flex gap-2 align-items-start">
                <div style={{ flex: 1 }}>
                    <input 
                        type="text" 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title}
                        className="glass-form-input" 
                        placeholder="Todo title ..." 
                    />
                    <div className="glass-form-text error">
                        {title ? '' : 'Title is required'}
                    </div>
                </div>
                <div>
                    <button type="submit" className="glass-button" disabled={loading || !title}>
                        Create
                        {loading && <span className="glass-spinner"></span>}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTodo;