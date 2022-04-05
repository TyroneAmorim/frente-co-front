import React, { useEffect } from 'react';
import { Form, Input, Button, Col, Row, DatePicker, message, Modal, Typography } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { deleteAccountData, getRegisterData, saveUser } from '../../services/register';
import { RegisterData } from '../../interfaces/registerData';
import { errorsMessages, getErrorByCode } from '../../utils/errorsMessages';
import './style.css';
import { logoutUser } from '../../utils/user';
import routerConfig from '../../Routers/routerConfig';

const { Title } = Typography;

interface Props {
  isConfiguration?: boolean;
}

const Register: React.FC<Props> = ({ isConfiguration }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const getUserData = async () => {
    try {
      const { data } = await getRegisterData();

      form.setFieldsValue({
        name: data.name,
        email: data.email,
        birthDate: moment(data.birthDate),
        cpf: data.cpf,
        addressText: data.address.address,
        city: data.address.city,
        state: data.address.state,
      });
    } catch (error) {
      //
    }
  };

  const saveUserData = async (data: RegisterData) => {
    try {
      const userData = data;
      delete userData.confirmPassword;
      await saveUser(userData);
      message.success('Operação concluída com sucesso');
      navigate('/');
    } catch (error: any) {
      const codStatus = error.response.status;
      const msgError = getErrorByCode(errorsMessages.cadastro, codStatus);
      message.error(msgError);
    }
  };

  const deleteAccount = () => {
    Modal.confirm({
      title: 'Atenção',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja realmente excluir sua conta?',
      okText: 'Sim',
      cancelText: 'Não',
      onOk: async () => {
        try {
          await deleteAccountData();
          message.success('Usuário excuído com sucesso');
          logoutUser();
          navigate('/');
        } catch (error: any) {
          const codStatus = error.response.status;
          const msgError = getErrorByCode(errorsMessages.login, codStatus);
          message.error(msgError);
        }
      },
    });
  };

  useEffect(() => {
    getUserData();
    if (isConfiguration) document.title = routerConfig.configurations.title;
    else document.title = routerConfig.register.title;
  }, []);

  return (
    <>
      <Form className="form-config" layout="vertical" form={form} onFinish={saveUserData}>
        {!isConfiguration ? <Title level={2}>Cadastro de novo usuário</Title> : null}
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="Nome"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Por favor, informe seu nome',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
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
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="Data de Aniversário"
              name="birthDate"
              rules={[
                {
                  required: true,
                  message: 'Por favor, informe sua data de aniversário',
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Cpf"
              name="cpf"
              rules={[
                {
                  pattern: /[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/,
                  required: true,
                  message: 'Por favor, informe seu cpf',
                },
              ]}
            >
              <Input placeholder="Somente números" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              hasFeedback
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
          </Col>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="confirmPassword"
              label="Repita a senha"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Por favor, repita sua senha',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('As senhas não combinam'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={14}>
            <Form.Item
              label="Endereço"
              name="addressText"
              rules={[
                {
                  required: true,
                  message: 'Por favor, informe seu endereço',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="Cidade"
              name="city"
              rules={[
                {
                  required: true,
                  message: 'Por favor, informe sua cidade',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item
              label="Estado"
              name="state"
              rules={[
                {
                  required: true,
                  message: 'Por favor, informe seu Estado',
                },
              ]}
            >
              <Input maxLength={2} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </Col>
          <Col offset={16}>
            {isConfiguration ? (
              <Button type="primary" danger onClick={deleteAccount}>
                Excluir conta
              </Button>
            ) : null}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
