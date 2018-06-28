import React, {Component} from 'react';

class Usuarios extends Component{
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.data.length > 0){
            return (
                this.props.data.map((user,i) =>
                    <li key={i}>
                        <p> Name: {user.name}</p>
                        <p> Email {user.email}</p>
                    </li>
                )
            )
        }else{
            return ( <p>Cargando usuarios...</p>)
        }
    }
}

export default Usuarios;
