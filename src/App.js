import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
//custom
import Navigation from './components/Navigation';
import TodoForm from './components/TodoForm';
import Clock from './components/Clock';
//import QrCodes from './components/QrCodes';
//data
import {todos} from './todos.json';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos:todos
    }
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handleAddTodo(todo){
    this.setState({
      todos: [...this.state.todos, todo]
    })
  }

  handleRemoveTodo(indice){
    console.log(indice);
    if(window.confirm("Estas seguro de eliminar esta tarea?")){
      this.setState({
        todos: this.state.todos.filter((todos,i) => {
          return i !== indice
        })
      })
    }
  }

  render() {
    const todos = this.state.todos.map((todo,i) =>{
      return (
        <div className="col-md-4" key={i}>
          <div className="card mt-4">
            <div className="card-header">
              <h3>{todo.titulo}</h3>
              <span className="badge badge-pill badge-danger ml-1"> 
                {todo.priority}
              </span>
            </div>
            <div className="card-body">
              <p>{todo.description}</p>
              <p>{todo.responsible}</p>
            </div>
            <div className="card-footer">
              <button 
                className="btn btn-danger"
                onClick={this.handleRemoveTodo.bind(this,i)}
              >
                Tarea Terminada/eliminar
              </button>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="App">
        <Navigation titulo="Task" TareasTotales={this.state.todos.length} />
        <Clock/>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-3">
              <TodoForm onAddTodo={this.handleAddTodo}/>
            </div>
            <div className="col-md-9">
              {todos}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-6">
              {/*<QrCodes/>*/}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
