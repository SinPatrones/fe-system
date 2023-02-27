import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Client from "./pages/Client.jsx";
import Layout from "./components/Layout.jsx";
import Products from "./pages/Products.jsx";

const urlList = [
  {
    label: 'Inicio',
    url: '/'
  },
  {
    label: 'Clientes',
    url: '/client'
  },
  {
    label: 'Productos',
    url: '/products'
  },
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout links={urlList}/>}>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/client' element={<Client/>}/>
          <Route exact path='/products' element={<Products/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
