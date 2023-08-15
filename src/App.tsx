import { Suspense } from 'react';
import './App.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Nav from './components/nav';
import FullLoading from './components/full-loading';
import React from 'react';
import { FloatButton } from 'antd';

// Lazy load Component
const Home = React.lazy(() => import(/* webpackChunkName: 'Home' */ './page/home'));
const Article = React.lazy(() => import(/* webpackChunkName: 'Article' */ './page/article'));
const Footer = React.lazy(() => import(/* webpackChunkName: 'Footer' */ './components/footer'));

function App() {
  const routers = [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/article/:id',
      component: Article,
    },
  ];

  return (
    <BrowserRouter>
      <Suspense fallback={<FullLoading />}>
        <Nav />
        <Routes>
          {routers.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
        </Routes>
        <Footer />
        <FloatButton.BackTop type="primary" />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
