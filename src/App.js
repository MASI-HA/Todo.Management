import { BrowserRouter, Switch, Route } from "react-router-dom"
import Header from "./components/Header";
import TodoProvider from "./contex/TodoProvider";
import Home from "./pages/Home";
import Todos from "./pages/Todos";

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/todos">
            <Header />
            <TodoProvider>
              <Todos />
            </TodoProvider>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
