import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
//Libs
import axios from 'axios';
//components
import Navigation from './components/Navigation';
import TodoForm from './components/TodoForm';
import Clock from './components/Clock';
import Usuarios from './components/Usuarios';
//import QrCodes from './components/QrCodes';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos:[],
      isToggleOn:true,
      users:[]
    }
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  componentWillMount(){
      /**var misCabeceras = new Headers();
      var init = {
          method: 'GET',
          headers: misCabeceras,
          mode: 'no-cors',
          cache: 'default'
      };
      fetch('http://localhost:8000/api/alltodos')
      .then(response => response.json())
      .then(todos => {
              console.log(todos);
              todos.results.forEach(
                  todo => {
                      let data = {
                          titulo:todo.titulo,
                          responsible:todo.responsible,
                          description:todo.description,
                          priority:todo.priority,
                          activa:todo.activa
                      }
                      this.setState({users:this.state.users.concat([data])})
                  }
              )
          })
       **/

  }
  componentDidMount(){
      var config = {
          headers: {'Access-Control-Allow-Origin': '*','Accept': 'application/json'}
      };
      axios
          .get("http://localhost:8000/api/alltodos", config)
          .then(response => response.data)
          .then(todos => {
              console.log(todos.result);
              todos.result.forEach(
                  todo => {
                      let data = {
                          titulo:todo.titulo,
                          responsible:todo.responsible,
                          description:todo.description,
                          priority:todo.priority,
                          activa:todo.activa
                      }
                      this.setState({todos:this.state.todos.concat([data])})
                  }
              )
          })
          .catch(error => console.log(error));
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
      const todos = this.state.todos.length > 0 ? this.state.todos.map((todo, i) => {
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
                              onClick={this.handleRemoveTodo.bind(this, i)}
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
      }) : <span>Cargando Items To Do!...</span>;
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
