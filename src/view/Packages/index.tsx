import React, { useEffect, useState } from 'react';
import { Progress, Table, Typography } from 'antd';
import moment from 'moment';
import Layout from '../../components/Layout';
import { getPackages } from '../../services/operation';
import routerConfig from '../../Routers/routerConfig';

const { Title } = Typography;

const Packages: React.FC = () => {
  const [packagesData, setPackagesData] = useState<any>();

  const getAllPackages = async () => {
    const { data } = await getPackages();
    setPackagesData(data);
  };

  useEffect(() => {
    getAllPackages();
  }, [0]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'pck_id',
      key: 'pck_id',
      render: (id: string) => `ID${id}`,
    },
    {
      title: 'Status do pacote',
      dataIndex: 'value',
      key: 'value',
      render: (text: string, record: any) => {
        const limit = parseInt(process.env.REACT_APP_PACKAGE_LIMIT_MONEY ?? '', 10);
        const percent = (Number(record.pck_paper_money_total) / limit) * 100;
        return <Progress percent={percent} />;
      },
    },
    {
      title: 'Tipo de cédula',
      dataIndex: 'pck_paper_money_type',
      key: 'pck_paper_money_type',
      render: (type: string) => `R$ ${type}`,
    },
    {
      title: 'Data de abertura',
      dataIndex: 'pck_opened_at',
      key: 'pck_opened_at',
      render: (date: string) =>
        moment(date, 'yyyy-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/yyyy \\à\\s HH:mm:ss'),
    },
    {
      title: 'Data de fechamento',
      dataIndex: 'pck_closed_at',
      key: 'pck_closed_at',
      render: (date: string) =>
        date === null
          ? '-'
          : moment(date, 'yyyy-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/yyyy \\à\\s HH:mm:ss'),
    },
  ];
  useEffect(() => {
    document.title = routerConfig.packages.title;
  }, []);

  return (
    <Layout>
      <Title level={2}>Extrato de suas operações</Title>
      <Table bordered columns={columns} dataSource={packagesData} />
    </Layout>
  );
};

export default Packages;
