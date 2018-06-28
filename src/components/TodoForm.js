import React, { Component} from 'react';

class TodoForm extends Component{
    constructor(){
        super();
        this.state = {
            "titulo":"",
            "responsible":"",
            "description":"",
            "priority":"medium",
            "activa":false
        };
        //inicializar
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e){
        const { value, name} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onAddTodo(this.state);
    }

    componentDidUpdate(){

    }

    render(){
        return (
            <div className="card">
                <form className="card-body" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="titulo"
                            onChange={this.handleInput}
                            className="form-control"
                            placeholder="Title"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="responsible"
                            onChange={this.handleInput}
                            className="form-control"
                            placeholder="Responsible"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="description"
                            onChange={this.handleInput}
                            className="form-control"
                            placeholder="Description"
                        />
                    </div>
                    <div className="form-group">
                        <select 
                            name="priority"
                            onChange={this.handleInput}
                            className="form-control">
                            <option>low</option>
                            <option>medium</option>
                            <option>hihgh</option>
                        </select>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input className="toggleInput" type="checkbox" checked data-toggle="toggle"/>
                            Terminada
                        </label>
                    </div>
                    <button type="submt" className="btn btn-primary">
                        Guardar
                    </button>
                </form>
            </div>
        )
    }
}

export default TodoForm