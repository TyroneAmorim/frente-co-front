import React from 'react';
import Layout from '../../components/Layout';
import Register from '../Register';

const Configurations: React.FC = () => {
  return (
    <Layout className="layout-form-config">
      <Register isConfiguration />
    </Layout>
  );
};
export default Configurations;
