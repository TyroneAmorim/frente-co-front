import React from 'react';
import { Menu as MeuAntd } from 'antd';
import {
  HomeOutlined,
  DollarCircleOutlined,
  SettingOutlined,
  ContainerOutlined,
  SendOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import routerConfig from '../../Routers/routerConfig';
import { logoutUser } from '../../utils/user';

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    logoutUser();
    navigate('/');
    window.location.reload();
  };
  return (
    <>
      <div className="logo" />
      <MeuAntd theme="dark" mode="horizontal">
        <MeuAntd.Item key="1" icon={<HomeOutlined />}>
          <Link
            to={{
              pathname: routerConfig.home.path,
            }}
          >
            {routerConfig.home.title}
          </Link>
        </MeuAntd.Item>
        <MeuAntd.Item key="2" icon={<DollarCircleOutlined />}>
          <Link
            to={{
              pathname: routerConfig.operations.path,
            }}
          >
            {routerConfig.operations.title}
          </Link>
        </MeuAntd.Item>
        <MeuAntd.Item key="3" icon={<SendOutlined />}>
          <Link
            to={{
              pathname: routerConfig.newOperation.path,
            }}
          >
            {routerConfig.newOperation.title}
          </Link>
        </MeuAntd.Item>
        <MeuAntd.Item key="4" icon={<ContainerOutlined />}>
          <Link
            to={{
              pathname: routerConfig.packages.path,
            }}
          >
            {routerConfig.packages.title}
          </Link>
        </MeuAntd.Item>
        <MeuAntd.Item key="5" icon={<SettingOutlined />}>
          <Link
            to={{
              pathname: routerConfig.configurations.path,
            }}
          >
            {routerConfig.configurations.title}
          </Link>
        </MeuAntd.Item>
        <MeuAntd.Item key="6" icon={<PoweroffOutlined />} onClick={logout}>
          Sair
        </MeuAntd.Item>
      </MeuAntd>
    </>
  );
};
export default Menu;
