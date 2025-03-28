import React from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogoutButton = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setTimeout(()=> navigate("/login"),1000);
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-secondary'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>CRUDApplication</Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/about'>About</Link>
            </li>
            <li className='nav-item'>
              <button className='btn btn-danger' onClick={handleLogoutButton}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;