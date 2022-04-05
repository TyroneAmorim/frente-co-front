import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import moment from 'moment';
import Layout from '../../components/Layout';
import { getOperations } from '../../services/operation';
import routerConfig from '../../Routers/routerConfig';

const { Title } = Typography;

const Operations: React.FC = () => {
  const [operationsData, setOperationsData] = useState<any>();

  const getAllOperations = async () => {
    const { data } = await getOperations();
    setOperationsData(data);
  };

  useEffect(() => {
    getAllOperations();
  }, [0]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => `ID${id}`,
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Tipo de cédula',
      dataIndex: 'paperMoneyType',
      key: 'paperMoneyType',
      render: (type: string) => `R$ ${type}`,
    },
    {
      title: 'Operação principal',
      dataIndex: 'mainOperation',
      key: 'mainOperation',
      render: (id: string) => (id === null ? '-' : `ID${id}`),
    },
    {
      title: 'Data de abertura',
      dataIndex: 'openedAt',
      key: 'openedAt',
      render: (date: string) =>
        moment(date, 'yyyy-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/yyyy \\à\\s HH:mm:ss'),
    },
    {
      title: 'Data de fechamento',
      dataIndex: 'closedAt',
      key: 'closedAt',
      render: (date: string) =>
        date === null
          ? '-'
          : moment(date, 'yyyy-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/yyyy \\à\\s HH:mm:ss'),
    },
  ];
  useEffect(() => {
    document.title = routerConfig.operations.title;
  }, []);

  return (
    <Layout>
      <Title level={2}>Extrato de suas operações</Title>
      <Table bordered columns={columns} dataSource={operationsData} />
    </Layout>
  );
};

export default Operations;
