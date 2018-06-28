import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
//custom
import Navigation from './components/Navigation';
import TodoForm from './components/TodoForm';
import Clock from './components/Clock';
import Usuarios from './components/Usuarios';
//import QrCodes from './components/QrCodes';
//data
import {todos} from './todos.json';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos:todos,
      isToggleOn:true,
      users:[]
    }
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  componentWillMount(){
      fetch('https://randomuser.me/api?results=50')
          .then(response => response.json())
          .then(users => {
              users.results.forEach(
                  user => {
                      let data = {
                          name:user.name.first,
                          email:user.email,
                          password:user.login.password
                      }
                      this.setState({users:this.state.users.concat([data])})
                  }
              )
          })
  }

  handleAddTodo(todo){
    this.setState({
      todos: [...this.state.todos, todo]
    })
  }

  handleRemoveTodo(indice){
    if(window.confirm("Estas seguro de eliminar esta tarea?")){
      this.setState({
        todos: this.state.todos.filter((todos,i) => {
          return i !== indice
        })
      })
    }
  }

  handleClick(indice) {
      this.setState({
          todos : this.state.todos.map((todo,i) => {
                  if (i === indice ){
                      todo.activa = todo.activa ? false : true;
                  }
              return todo;
          })
      })
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
                eliminar
              </button>
            </div>
            <div>
                <button onClick={this.handleClick.bind(this, i)}>
                    Tarea Terminada {todo.activa ? 'SI' : 'NO'}
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
                <Usuarios data={this.state.users} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
