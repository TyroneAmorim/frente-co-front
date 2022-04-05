import React from 'react';
import Register from '../view/Register';

import Home from '../view/Home';
import Login from '../view/Login';
import NewOperation from '../view/NewOperation';
import Operations from '../view/Operations';
import Configurations from '../view/Configurations';
import Packages from '../view/Packages';

interface Route {
  [key: string]: {
    path: string,
    title: string,
    component: React.FC,
  };
}

const routerConfig: Route = {
  home: {
    path: '/',
    title: 'Início',
    component: Home,
  },
  operations: {
    path: '/operacoes',
    title: 'Operações',
    component: Operations,
  },
  newOperation: {
    path: '/nova-operacao',
    title: 'Nova Operação',
    component: NewOperation,
  },
  packages: {
    path: '/pacotes',
    title: 'Pacotes de remessa',
    component: Packages,
  },
  configurations: {
    path: '/configuracoes',
    title: 'Configurações',
    component: Configurations,
  },
  register: {
    path: '/cadastro',
    title: 'Cadastro',
    component: Register,
  },
  login: {
    path: '/login',
    title: 'Login',
    component: Login,
  },
};

export default routerConfig;
