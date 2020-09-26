import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Atualizar from './pages/Atualizar';
import ListPessoas from './pages/List';
import Register from './pages/Register';

export default function Routes(){
    return(
        <BrowserRouter>
        <Route path="/" exact component={ListPessoas} />
        <Route path="/register" component={Register}/>
        <Route path="/edit/:id" component={Atualizar}/>
    </BrowserRouter>
    )
}