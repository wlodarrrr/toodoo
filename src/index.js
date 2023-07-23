import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TodoListApp from "./components/TodoListApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
document.body.setAttribute("data-bs-theme", "dark");
root.render(
  <div className="container mt-2 vh-100 h-100">
    <TodoListApp />
  </div>
);
