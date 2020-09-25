import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../service/userService';
import * as Icon from 'react-feather'

import './styles.css';
class ListPessoas extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        UserService.getUsers().then((reponse) => {
            this.setState({ users: reponse.data})
        });
    }

    deletePessoa(id){
        if(window.confirm('Você tem certeza?')){
            fetch('http://localhost:8080/api/'+id,{
                method: 'DELETE',
                headers: {'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
            });
            this.componentDidMount();
        }
    }

    render(){
        return(
            <div className="content-container">
                <div className="tabela">
                    <h1>Tabela de Pessoas</h1>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>CPF</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Estado Civil</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                user =>
                                <tr key = {user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.idade}</td>
                                    <td>{user.cpf}</td>
                                    <td>{user.cidade}</td>
                                    <td>{user.estado}</td>
                                    <td>{user.estadoCivil}</td>
                                    <td><Link to={"/edit/"+user.id}><button className="btn-edit"><Icon.Edit></Icon.Edit></button></Link></td>
                                    <td><button className="btn-del" onClick={() =>this.deletePessoa(user.id)}><Icon.Trash></Icon.Trash></button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div id="button-add">
                    <Link  to="/register"><button id="btn-add">Adicionar</button></Link>
                </div>
                </div>
            </div>
        )
    }

}

export default ListPessoas;