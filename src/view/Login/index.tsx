import React from 'react';

import { Layout, Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginData } from './loginData.interface';

import makeLogin from '../../services/login';
import constants from '../../utils/constants';
import { errorsMessages, getErrorByCode } from '../../utils/errorsMessages';
import routerConfig from '../../Routers/routerConfig';

const { Content } = Layout;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const loginInApi = async (loginData: LoginData) => {
    try {
      const loginState = await makeLogin(loginData);
      const { data } = loginState;
      localStorage.setItem(constants.TOKEN_USER, data.token);
      navigate('/');
    } catch (error: any) {
      const codStatus = error.response.status;
      const msgError = getErrorByCode(errorsMessages.login, codStatus);
      message.error(msgError);
    }
  };
  return (
    <Layout className="layout-form-login">
      <Content className="layout-form-login">
        <Form className="form-login" layout="vertical" form={form} onFinish={loginInApi}>
          <div className="login-form-logo" />
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Por favor, informe um email válido',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              {
                required: true,
                message: 'Por favor, informe sua senha',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Entrar
            </Button>
            <Link to={routerConfig.register.path}>
              <>&nbsp;&nbsp;Ainda não tenho cadastro</>
            </Link>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Login;
