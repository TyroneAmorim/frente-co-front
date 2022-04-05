import React, { useEffect } from 'react';
import { Typography, Image, Row, Col } from 'antd';
import Layout from '../../components/Layout';
import './style.css';
import routerConfig from '../../Routers/routerConfig';

const { Title, Text } = Typography;

const Home: React.FC = () => {
  useEffect(() => {
    document.title = routerConfig.home.title;
  }, []);

  return (
    <Layout>
      <Row>
        <Col span={12} className="column-home">
          <Title level={2}>Bem vindo ao seu centro de operações!</Title>
          <Text className="text-description-home">
            Faça suas transações de forma rápida e segura.
            <br /> Você consegue dinheiro na mão sem sair de casa.
          </Text>
        </Col>
        <Col span={12}>
          <Image src="/img/banner1.jpg" preview={false} />
        </Col>
      </Row>
    </Layout>
  );
};
export default Home;
