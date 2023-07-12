import { Suspense } from 'react';
import './App.scss';
import { Route, HashRouter, Routes } from 'react-router-dom';
import ArticleList from './components/article-list';
import Nav from './components/nav/nav';
import SideBar from './components/side-bar';
import TitleTips from './components/title-tips';
import FullLoading from './components/full-loading';
import ContentLayout from './components/layout/content-layout';
import React from 'react';
import Article from './page/article';

// Lazy load Component
const Home = React.lazy(() => import(/* webpackChunkName: 'Home' */ './page/home'));

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
    <HashRouter>
      <Suspense fallback={<FullLoading />}>
        <Nav />
        <Routes>
          {routers.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
