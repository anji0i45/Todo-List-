import logo from './logo.svg';

import Header from "./mycomponents/Header";
import Todos from "./mycomponents/Todos";
import Footer from "./mycomponents/Footer";
import AddTodo from "./mycomponents/AddTodo";
import About from "./mycomponents/About";
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
  
} from "react-router-dom";

import { useEffect } from 'react';


function App() {

  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {

    //let index =  todos.indexOf(todo);
    //todos.splice(index,1);

    setTodos(todos.filter((e) => {
      return e !== todo;

    }));
    localStorage.getItem("todos");
  }

  const addTodo = (title, desc) => {
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);



  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  return (
    <>
      <Router>
        <Header title="my Todo's List" searchBar={true} />

        <Routes>
          <Route exact path="/" element={
            <>
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} />
            </>
          } />


          <Route path="/about" element={<About />} />

        </Routes>

        <Footer />
      </Router>


    </>
  );
}

export default App;
