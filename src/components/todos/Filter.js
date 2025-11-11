import { useContext, useState } from "react";
import TodoContext from "../../contex/TodoContext";

const FilterTodos = () => {
    const { filterTodos } = useContext(TodoContext);
    const [loading, setLoading] = useState(false);

    const handleFilter = async (e) => {
        setLoading(true)
        await filterTodos(e.target.value);
        setLoading(false)
    }
    return (
        <div className="glass-form-group">
            <div className="d-flex gap-2 align-items-center">
                <div style={{ minWidth: '200px' }}>
                    <label className="glass-form-label">Filter</label>
                    <select onChange={(e) => handleFilter(e)} className="glass-form-select">
                        <option value="200">all</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="60">60</option>
                        <option value="100">100</option>
                    </select>
                </div>
                {loading && <span className="glass-spinner" style={{ marginTop: '2rem' }}></span>}
            </div>
        </div>
    )
}

export default FilterTodos;