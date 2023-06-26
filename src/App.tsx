import './App.scss'
import ArticleList from './components/article-list'
import Nav from './components/nav'
import SideBar from './components/side-bar'
import TitleTips from './components/title-tips'

function App() {

  return (
    <>
      <Nav />
      <TitleTips />
      <div className="content">
        <ArticleList />
        <SideBar />
      </div>
    </>
  )
}

export default App
