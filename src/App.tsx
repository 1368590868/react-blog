import { Suspense, createContext } from 'react';
import './App.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Nav from './components/nav';
import FullLoading from './components/full-loading';
import React from 'react';
import { FloatButton } from 'antd';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
// Lazy load Component
const Home = React.lazy(() => import(/* webpackChunkName: 'Home' */ './page/home'));
const Article = React.lazy(() => import(/* webpackChunkName: 'Article' */ './page/article'));
const Footer = React.lazy(() => import(/* webpackChunkName: 'Footer' */ './components/footer'));
const FriendLink = React.lazy(
  () => import(/* webpackChunkName: 'FriendLink' */ './page/friend-link')
);

export const ThemeContext = createContext({});
export const initThemeConfig = {
  // token: {
  //   colorPrimary: '#00B96B', //Primary Color,
  //   // colorPrimary: '#212421', //Primary Color,
  //   borderRadius: 4
  // }
  token: {
    colorPrimary: '#272727',
    colorInfo: '#272727',
    colorSuccess: '#52c41a',
    borderRadius: 8,
    wireframe: false,
    colorError: '#f5222d',
    sizeStep: 4,
    sizeUnit: 4,
    fontSize: 14
  },
  components: {
    List: {
      algorithm: true
    },
    Dropdown: {
      algorithm: true
    },
    Typography: {
      colorLinkHover: 'rgb(162, 149, 149)'
    }
  }
};

function App() {
  const routers = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/article/:id',
      component: Article
    },
    {
      path: '/friend-link',
      component: FriendLink
    },
    {
      path: '*',
      component: Home
    }
  ];

  const [themeConfig, setThemeConfig] = React.useState(initThemeConfig);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        cssVar: true,
        hashed: false,
        algorithm: theme.defaultAlgorithm,

        ...themeConfig
      }}
    >
      <BrowserRouter>
        <Suspense fallback={<FullLoading />}>
          <ThemeContext.Provider value={{ ...themeConfig, setThemeConfig }}>
            <Nav />
          </ThemeContext.Provider>
          <Routes>
            {routers.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
          </Routes>
          <Footer />
          <FloatButton.BackTop type="primary" />
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
