import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routerConfig from './routerConfig';

const Routers: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route key={1} path={routerConfig.login.path} element={<routerConfig.login.component />} />
        <Route key={2} path={routerConfig.home.path} element={<routerConfig.home.component />} />
        <Route
          key={3}
          path={routerConfig.operations.path}
          element={<routerConfig.operations.component />}
        />
        <Route
          key={4}
          path={routerConfig.packages.path}
          element={<routerConfig.packages.component />}
        />
        <Route
          key={5}
          path={routerConfig.newOperation.path}
          element={<routerConfig.newOperation.component />}
        />
        <Route
          key={6}
          path={routerConfig.configurations.path}
          element={<routerConfig.configurations.component />}
        />
        <Route
          key={7}
          path={routerConfig.register.path}
          element={<routerConfig.register.component />}
        />
      </Routes>
    </Router>
  );
};

export default Routers;
