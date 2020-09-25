import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css'
import api from '../../service/api'

export default function Register() {

    const history = useHistory();

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [cidade, setCidade] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [estado, setEstado] = useState('');
    const [cpf, setCpf] = useState('');

    function handleCreateClass(e) {
        e.preventDefault();

        api.post('api', {
            nome,
            idade,
            cidade,
            estadoCivil,
            estado,
            cpf,
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro.');
        });
    }

    
    return (
        <div id="register-content">
            <div className="container">
                <h1>Adicione um novo contato!</h1>
                <form>
                    <div className="input-block">
                        <input
                            type="text"
                            id="nome"
                            placeholder="Nome"
                            required
                            value={nome}
                            onChange={(e) => { setNome(e.target.value) }} />
                        <input
                            type="text"
                            id="idade"
                            placeholder="Idade"
                            required
                            value={idade}
                            onChange={(e) => { setIdade(e.target.value) }} />

                        <input
                            type="text"
                            id="cidade"
                            required
                            placeholder="Cidade"
                            value={cidade}
                            onChange={(e) => { setCidade(e.target.value) }} />
                        <input
                            type="text"
                            id="estado"
                            placeholder="Estado"
                            required
                            value={estado}
                            onChange={(e) => { setEstado(e.target.value) }} />

                        <input
                            type="text"
                            id="cpf"
                            placeholder="CPF"
                            required
                            value={cpf}
                            onChange={(e) => { setCpf(e.target.value) }} />
                        <input
                            type="text"
                            id="estadoCivil"
                            placeholder="Estado civil"
                            required
                            value={estadoCivil}
                            onChange={(e) => { setEstadoCivil(e.target.value) }} />
                    </div>
                </form>
                <div className="button-block">
                    <Link to='/'><button className="btn-voltar">Voltar</button></Link>
                    <button className="btn-cad" type="submit" onClick={handleCreateClass}>Enviar</button>
                </div>
            </div>
        </div>
    )
}