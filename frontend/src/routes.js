import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewRequest from './pages/NewRequest';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/cadastro" component={Register}/>
                <Route path="/perfil" component={Profile}/>
                <Route path="/solicitacao/novo" component={NewRequest}/>
            </Switch>
        </BrowserRouter>
    );
}