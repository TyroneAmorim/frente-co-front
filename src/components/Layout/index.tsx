import React from 'react';
import { Layout as LayoutAntd } from 'antd';
import { Navigate } from 'react-router-dom';
import Menu from '../Menu';
import './style.css';
import routerConfig from '../../Routers/routerConfig';
import { getTokenUser } from '../../utils/user';

const { Header, Content } = LayoutAntd;

const Layout: React.FC<any> = ({ children }) => {
  return getTokenUser() === null ? (
    <Navigate to={routerConfig.login.path} replace />
  ) : (
    <LayoutAntd>
      <Header className="top-menu">
        <Menu />
      </Header>
      <Content>{children}</Content>
    </LayoutAntd>
  );
};

export default Layout;
