import axios from "axios";
import { useCallback, useReducer } from "react";
import { cyberToast } from "../utils/ui";
import TodoContext from "./TodoContext";
import todoReducer from "./todoReducer";

const TodoProvider = ({ children }) => {
    const initialState = {
        todos: [],
        error: null
    };

    const [state, dispatch] = useReducer(todoReducer, initialState);

    const getTodos = useCallback(async () => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
            dispatch({ type: "SET_TODOS", payload: res.data });
            dispatch({ type: "SET_ERROR", payload: null });
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message });
            dispatch({ type: "SET_TODOS", payload: [] });
        }
    }, []);

    const filterTodos = async (count) => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${count}`);
            dispatch({ type: "FILTER_TODOS", payload: res.data });
            dispatch({ type: "SET_ERROR", payload: null });
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message });
            dispatch({ type: "FILTER_TODOS", payload: [] });
        }
    }

    const addTodo = async (title) => {
        try {
            const res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
                title: title,
                completed: false
            });

            dispatch({ type: "ADD_TODO", payload: res.data });
            dispatch({ type: "SET_ERROR", payload: null });
            cyberToast("✅ Task added successfully");
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message });
            dispatch({ type: "FILTER_TODOS", payload: [] });
        }
    }

    const updateTodo = async (todo) => {
        try {
            const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
                title: todo.title,
                completed: !todo.completed
            });
            
            dispatch({ type: "UPDATE_TODO", payload: res.data });
            dispatch({ type: "SET_ERROR", payload: null });
            cyberToast("✅ Task updated successfully");
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message });
            dispatch({ type: "FILTER_TODOS", payload: [] });
        }
    }

    const removeTodo = async (todoId) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
            dispatch({ type: "REMOVE_TODO", payload: todoId });
            dispatch({ type: "SET_ERROR", payload: null });
            cyberToast("🗑️ Task deleted");
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message });
            dispatch({ type: "FILTER_TODOS", payload: [] });
        }
    }

    return (
        <TodoContext.Provider value={{ ...state, getTodos, filterTodos, addTodo, updateTodo, removeTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider;