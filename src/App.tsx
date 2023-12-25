import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { TodoList } from "./first-time/components/todiList";

import { Route, Routes } from "react-router-dom";
import Login from "./first-time/components/Login";
import SignUp from "./first-time/components/SignUp";
import { AuthProvider } from "./first-time/context/AuthProvider";
function App() {
  return (
    <AuthProvider value={{ isLogged: false }}>
      <div className="App">
        <Routes>
          <Route path="/login" Component={Login}></Route>
          <Route path="/todo" Component={TodoList}></Route>
          <Route path="/signup" Component={SignUp}></Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}
export default App;
