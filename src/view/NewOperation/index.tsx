import { Button, Col, Image, Input, message, Row, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import routerConfig from '../../Routers/routerConfig';
import { saveOperation } from '../../services/operation';
// import { NewOperationData } from '../../interfaces/newOperation';
// import { saveOperation } from '../../services/operation';

import './style.css';

const { Title } = Typography;

const NewOperation: React.FC = () => {
  const navigate = useNavigate();
  const [moneyValue, setMoneyValue] = useState<string>();
  const [, setStatusSwitch] = useState<boolean>();
  const [paperMoneyType, setPaperMoneyType] = useState<number>();

  const checkFields = (): boolean => {
    const money = Number(moneyValue?.replace(/\D+/, ''));
    const paperType = Number(paperMoneyType);
    return money > 0 && paperType > 0;
  };

  const checkValueAndPaperType = () => {
    const money = parseInt(moneyValue?.replace(/\D+/, '') ?? '', 10);
    const paperType = parseInt(paperMoneyType?.toString() ?? '', 10);
    if (money % paperType > 0) {
      message.error('Valor incompatível com o tipo de nota selecionado');
      return false;
    }
    return true;
  };

  useEffect(() => {
    checkValueAndPaperType();
    document.title = routerConfig.newOperation.title;
  }, [paperMoneyType]);

  const saveOparacao = async () => {
    if (checkFields()) {
      try {
        const checkStatusOperation = checkValueAndPaperType();
        if (checkStatusOperation) {
          await saveOperation({
            value: Number(moneyValue?.replace(/\D+/, '')),
            paperMoneyType: Number(paperMoneyType),
          });
          message.success('Operação cadastrada com sucesso');
          setTimeout(() => navigate('/'), 1000);
        }
      } catch (error) {
        //
      }
    }
  };

  const maskMoney = (event: React.ChangeEvent<HTMLInputElement>) => {
    const money = event.target.value.replace(/\D+/g, '');
    const limitOperacao = parseInt(process.env.REACT_APP_LIMIT_OPERATION ?? '', 10);
    const resultValue = parseInt(money, 10);
    if (resultValue > limitOperacao) message.error(`O limite de operação é de R$ ${limitOperacao}`);
    setMoneyValue(`R$ ${money}`);
  };

  const checkValue = () => {
    const valueMoneyStatus = parseInt(moneyValue?.replace(/\D+/, '') ?? '', 10) % 10;
    if (valueMoneyStatus > 0) message.error('O valor da operação precisa ser inteiro');
  };

  return (
    <Layout className="layout-operacao">
      <>
        <Row className="layout-row-operacao layout-row-operacao-1">
          <Col>
            <Title level={2} className="text-operacao">
              Valor da operação
            </Title>
          </Col>
        </Row>
        <Row className="layout-row-operacao layout-row-operacao-2">
          <Col span={12}>
            <Input
              value={moneyValue}
              onChange={maskMoney}
              onBlur={checkValue}
              className="input-valor"
              placeholder="R$ 0"
            />
          </Col>
        </Row>
        <Title level={2} className="text-operacao">
          Escolha a opção de nota
        </Title>
        <Row className="layout-row-operacao" gutter={24}>
          <Col span={8} className="col-cedula">
            <Image src="/img/nota10.jpg" preview={false} className="cedula" />
            <Switch
              checked={paperMoneyType === 10}
              onChange={(checked: boolean) => {
                setStatusSwitch(checked);
                if (checked) setPaperMoneyType(10);
              }}
            />
          </Col>
          <Col span={8} className="col-cedula">
            <Image src="/img/nota50.jpg" preview={false} className="cedula" />
            <Switch
              checked={paperMoneyType === 50}
              onChange={(checked: boolean) => {
                setStatusSwitch(checked);
                if (checked) setPaperMoneyType(50);
              }}
            />
          </Col>
          <Col span={8} className="col-cedula">
            <Image src="/img/nota100.jpg" preview={false} className="cedula" />
            <Switch
              checked={paperMoneyType === 100}
              onChange={(checked: boolean) => {
                setStatusSwitch(checked);
                if (checked) setPaperMoneyType(100);
              }}
            />
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="layout-salvar-operacao-btn"
          onClick={saveOparacao}
        >
          Salvar
        </Button>
      </>
    </Layout>
  );
};
export default NewOperation;
