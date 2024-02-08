import { BrowserRouter, Routes, Route } from "react-router-dom"
import Articles from './components/Article/Articles'
import EditArticle from './components/Article/Edit'
import CreaterArticle from './components/Article/Creater'
import './bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Header from "./components/Header";
function App() {

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" exact element={<Articles />} />
              <Route path="/create" exact element={<CreaterArticle />} />
              <Route path="/edit/:articleId" exact element={<EditArticle />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  )
}

export default App
