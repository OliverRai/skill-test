import React from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios'

import './styles.css'

///ainda sem funcionar 

export default class Atualizar extends React.Component {

    constructor(props){
        super(props)
        this.state = this.initialState;
        this.state = {
            users: []
        }
        this.personChange = this.personChange.bind(this);
    }

    initialState = {
        id:'', nome:'', cidade:'', idade:'', estado:'', estadoCivil:'', cpf:''
    };

    componentDidMount(){
        const personId = +this.props.match.params.id;
        if(personId){
            this.findPersonById(personId);
        }   
    }

    findPersonById = (personId) => {
        console.log(personId)
        axios.get('http://localhost:8080/api/'+personId)
            .then(reponse => {
                if(reponse.data != null){
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
            }).catch((error)=>{
                console.log(error)
            })
    }

    personChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render(){
        const {id, nome, idade, cidade, estado, cpf, estadoCivil} = this.state;
        return(
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
                            required
                            onChange={this.personChange}
                             />
                        <input
                            type="text"
                            id="nome"
                            placeholder="Nome"
                            value={nome}
                            required
                            onChange={this.personChange}
                             />
                        <input
                            type="text"
                            id="idade"
                            placeholder="Idade"
                            value={idade}
                            required
                            onChange={this.personChange}
                            />

                        <input
                            type="text"
                            id="cidade"
                            required
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
                            required
                             />

                        <input
                            type="text"
                            id="cpf"
                            placeholder="CPF"
                            onChange={this.personChange}
                            value={cpf}
                            required
                            />
                        <input
                            type="text"
                            id="estadoCivil"
                            placeholder="Estado civil"
                            onChange={this.personChange}
                            value={estadoCivil}
                            required
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