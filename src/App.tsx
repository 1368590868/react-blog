import { Suspense } from 'react';
import './App.scss';
import { Route, HashRouter, Routes, BrowserRouter } from 'react-router-dom';
import ArticleList from './components/article-list';
import Nav from './components/nav';
import SideBar from './components/side-bar';
import TitleTips from './components/title-tips';
import FullLoading from './components/full-loading';
import ContentLayout from './components/layout';
import React from 'react';
import Article from './page/article';

// Lazy load Component
const Home = React.lazy(() => import(/* webpackChunkName: 'Home' */ './page/home'));
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
