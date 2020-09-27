import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Form } from 'react-bootstrap'
import './styles.css'

class Atualizar extends Component {


    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            users: [],
            show : false
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.atualizarPessoa = this.atualizarPessoa.bind(this);
    }

    initialState = {
        id: '', nome: '', idade: '', cpf: '', cidade: '', estado: '', estadoCivil: ''
    }

    componentDidMount() {
        const personId = +this.props.match.params.id;
        if (personId) {
            this.findPersonById(personId);
        }
    }

    findPersonById = (personId) => {
        axios.get('http://localhost:8080/api/' + personId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        nome: response.data.nome,
                        idade: response.data.idade,
                        cidade: response.data.cidade,
                        cpf: response.data.cpf,
                        estadoCivil: response.data.estadoCivil,
                        estado: response.data.estado
                    })
                }
            }).catch((error) => {
                console.log(error)
            });

    }
 /*   atualizarPessoa(e){
        e.preventDefault();
            const id = document.querySelector('#update').value
            const title = document.querySelector('#update-title').value
                axios.put(`http://localhost:8080/api/${id}`,{title}).then(res => showResponse(res))
        }
    }*/

    atualizarPessoa(e) {
        e.preventDefault();
        
        const pessoa = {
            id: this.state.id,
            nome: this.state.nome,
            idade: this.state.idade,
            cidade: this.state.cidade,
            estado: this.state.estado,
            estadoCivil: this.state.estadoCivil,
            cpf: this.state.cpf,
        }

        axios.put(`http://localhost:8080/api/${pessoa.id}`, pessoa).then(reponse => {
            if(reponse.data != null){
                this.setState({"show":true, "method":"post"});
                this.returnList();
            } else {
                this.setState({"show":false});
            }
        })

    };

    returnList = () => {
        return this.props.history.push("/");
    };

    onChangeInput = (e) => this.setState({ [e.target.name]: e.target.value })


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
                            <Form.Control
                                required autoComplete="off"
                                name="id"
                                value={id}
                                disabled
                                onChange={this.onChangeInput}
                            />

                            <Form.Control
                                required autoComplete="off"
                                name="nome"
                                value={nome}
                                onChange={this.onChangeInput}
                            />

                            <Form.Control
                                required autoComplete="off"
                                name="idade"
                                value={idade}
                                type="number"
                                onChange={this.onChangeInput}
                            />
                            <Form.Control
                                required autoComplete="off"
                                name="cpf"
                                value={cpf}
                                type="text"
                                onChange={this.onChangeInput}
                            />
                            <Form.Control
                                required autoComplete="off"
                                name="cidade"
                                value={cidade}
                                onChange={this.onChangeInput}
                            />
                            <Form.Control
                                required autoComplete="off"
                                name="estado"
                                value={estado}
                                onChange={this.onChangeInput}
                            />
                            <Form.Control
                                required autoComplete="off"
                                name="estadoCivil"
                                value={estadoCivil}
                                onChange={this.onChangeInput}
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