import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary: '#00B96B',
      }
    }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
