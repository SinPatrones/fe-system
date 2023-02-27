import NavBar from "./NavBar.jsx";
import {Outlet} from "react-router-dom";

const Layout = ({links}) => {

  return (
    <>
      <NavBar links={links}/>
      <div className="container-fluid pt-3">
        <Outlet/>
      </div>
      <footer>
        <h4 className='bg-dark' style={{
          color: 'white',
          textAlign: 'center',
          position: 'fixed',
          bottom: 0,
          margin: 0,
          width: '100%',
          height: '20px',
          fontSize: '14px'
        }}>Armando Hinojosa</h4>
      </footer>
    </>
  );
};

export default Layout;
