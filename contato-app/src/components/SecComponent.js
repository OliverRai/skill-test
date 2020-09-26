import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import './styles.css'

///ainda sem funcionar 

class Atualizar extends Component {



    constructor(props) {
        super(props)
        this.state = this.initialState;
        this.state = {
            users: [],
        }
    }

    initialState = {
        id:'', nome:'', idade:'', estadoCivil:'', cidade:'', estado:'', cpf:''
    };

    componentDidMount() {
        const personId = +this.props.match.params.id;
        if (personId) {
            this.findPersonById(personId);
        }
    }

    findPersonById = (personId) => {
        console.log(personId)
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

    atualizarPessoa(e) {

        e.preventDefault();
        const person = {
            id: this.state.id,
            nome: this.state.nome,
            idade: this.state.idade,
            cpf: this.state.cpf,
            estado: this.state.estado,
            estadoCivil: this.state.estadoCivil,
            cidade: this.state.cidade
        }
        axios.put('http://localhost:8080', person)
            .then(res => console.log(res.data));
    };


    personChange = event => {
        
    };

    resetPerson = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const { id, nome, idade, cidade, estado, cpf, estadoCivil } = this.state;
        return (
            <div id="register-content">
                <div className="container">
                    <h1>O que você gostaria de atualizar?</h1>
                    <form>
                        <div className="input-block">
                            <input
                                type="text"
                                id="id"
                                placeholder="ID"
                                value={id}
                                onChange={this.personChange()}
                            />
                            <input
                                type="text"
                                id="nome"
                                placeholder="Nome"
                                value={nome}

                                onChange={this.personChange()}
                            />
                            <input
                                type="text"
                                id="idade"
                                placeholder="Idade"
                                value={idade}

                                onChange={this.personChange()}
                            />

                            <input
                                type="text"
                                id="cidade"

                                value={cidade}
                                placeholder="Cidade"
                                onChange={this.personChange()}
                            />
                            <input
                                type="text"
                                id="estado"
                                placeholder="Estado"
                                onChange={this.personChange()}
                                value={estado}

                            />

                            <input
                                type="text"
                                id="cpf"
                                placeholder="CPF"
                                onChange={this.personChange()}
                                value={cpf}

                            />
                            <input
                                type="text"
                                id="estadoCivil"
                                placeholder="Estado civil"
                                onChange={this.personChange()}
                                value={estadoCivil}

                            />
                        </div>
                    </form>
                    <div className="button-block">
                        <Link to='/'><button className="btn-voltar">Voltar</button></Link>
                        <button className="btn-cad" type="submit" onClick={this.atualizarPessoa}>Atualizar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Atualizar;