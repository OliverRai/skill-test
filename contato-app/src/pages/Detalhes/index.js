import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {Button} from 'react-bootstrap'
import './styles.css'

///ainda sem funcionar 

class DetalhesContato extends Component {


    constructor(props) {
        super(props)
        this.state = {value: 'DeepScan'};
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        const personId = +this.props.match.params.id;
        if (personId) {
            this.findPersonById(personId);
        }
    }

    deletePessoa(id){
        if(window.confirm('Você tem certeza?')){
            fetch('http://localhost:8080/api/'+id,{
                method: 'DELETE',
                headers: {'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
            });
            this.returnList();
        }
    }

    returnList = () => {
        return this.props.history.push("/");
    };

    findPersonById = (personId) => {
        axios.get('http://localhost:8080/api/' + personId)
            .then(reponse => {
                if (reponse.data != null) {
                    this.setState({
                        id: reponse.data.id,
                        nome: reponse.data.nome,
                        idade: reponse.data.idade,
                        cidade: reponse.data.cidade,
                        cpf: reponse.data.cpf,
                        estadoCivil: reponse.data.estadoCivil,
                        estado: reponse.data.estado
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    }



    render() {
        const { id, nome, idade, cidade, estado, cpf, estadoCivil } = this.state;
        return (
            <div id="register-content">
                <div className="container">
                    <h1>Olha lá hein! Tem certeza que quer deletar?</h1>
                    <form>
                        <div className="input-block">
                            <input
                                type="text"
                                id="id"
                                placeholder="ID"
                                disabled
                                value={id}
                                onChange={this.personChange}
                            />
                            <input
                                type="text"
                                id="nome"
                                placeholder="Nome"
                                value={nome}
                                disabled
                                onChange={this.personChange}
                            />
                            <input
                                type="text"
                                id="idade"
                                placeholder="Idade"
                                value={idade}
                                disabled
                                onChange={this.personChange}
                            />

                            <input
                                type="text"
                                id="cidade"
                                disabled
                                value={cidade}
                                placeholder="Cidade"
                                onChange={this.personChange}
                            />
                            <input
                                type="text"
                                id="estado"
                                placeholder="Estado"
                                onChange={this.personChange}
                                value={estado}
                                disabled
                            />

                            <input
                                type="text"
                                id="cpf"
                                placeholder="CPF"
                                onChange={this.personChange}
                                value={cpf}
                                disabled
                            />
                            <input
                                type="text"
                                id="estadoCivil"
                                placeholder="Estado civil"
                                onChange={this.personChange}
                                value={estadoCivil}
                                disabled
                            />
                        </div>
                    </form>
                    <div className="button-block">
                        <Link to="/"><Button className="btn btn-info voltar">Voltar</Button> </Link>
                        <Button className="btn btn-danger" onClick={() =>this.deletePessoa(id)}>Deletar</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetalhesContato;