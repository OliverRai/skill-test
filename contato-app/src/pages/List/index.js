import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather'
import {Table} from 'react-bootstrap'
import axios from 'axios'

import './styles.css';

function ListPessoas(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async() =>{
            const res = await axios.get('http://localhost:8080/api');
            setUsers(res.data);
        };

        fetchUsers();
    }, []);

        return(
            <div className="content-container">
                <div className="tabela">
                    <h1>Tabela de Pessoas</h1>
                    <Table className="table table-striped">
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
                    {users.map(user => (
                                <tr key = {user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.idade}</td>
                                    <td>{user.cpf}</td>
                                    <td>{user.cidade}</td>
                                    <td>{user.estado}</td>
                                    <td>{user.estadoCivil}</td>
                                    <td><Link to={"edit/"+user.id}><button className="btn-edit"><Icon.Edit></Icon.Edit></button></Link></td>
                                    <td><Link to={"detalhes/"+user.id}><button className="btn-del"><Icon.Trash></Icon.Trash></button></Link></td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <div id="button-add">
                    <Link  to="/register"><button id="btn-add">Adicionar</button></Link>
                </div>
                </div>
               
            </div>
        )
    }



export default ListPessoas;