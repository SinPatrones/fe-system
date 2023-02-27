import { Link } from 'react-router-dom';

const NavBar = ({links}) => {

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">DEV</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {
              links.map(({label, url}, idx) => (
                <li className="nav-item" key={`link${idx}`}>
                  <Link to={url} className="nav-link ">{label}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
