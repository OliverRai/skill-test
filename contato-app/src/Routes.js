import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import ListPessoas from './pages/List';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={ListPessoas} />
        </BrowserRouter>
    )
}