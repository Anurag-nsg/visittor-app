import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, ModalHeader } from 'react-bootstrap'; 
import { auth } from '../firebase.config';
import toast from 'react-hot-toast';
const Navbar = (user) => {
  const navigate = useNavigate();
  const [collapseOpen, setCollapseOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        auth.signOut(); 
      }
    });
    return () => unsubscribe();
  }, []);

  const handleNavLinkClick = (path) => {

    if (isLoggedIn) {
      navigate(path);
      setCollapseOpen(false);
    } else {
      toast.error("Login failed");
    }
  };

  const handlelogout=async () => {
      try {
        await auth.signOut(); 
        handleNavLinkClick('/')
      } catch (error) {
        console.error('Error signing out:', error);
      }
  
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid" >
        <a className="navbar-brand" style={{display:'flex'}} >
          <img src="logonav.jpeg" style={{marginRight:'10px', maxHeight: '60px', width: '50px', maxWidth: '100%', height: 'auto', marginLeft: '5px' ,background:'transparent',borderRadius:'50px',padding:'4px',boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',}} alt="Navbar Logo" />
            <p style={{marginTop:'16px',color:'black'}}>name</p>
        </a>
        <button className="navbar-toggler" type="button" onClick={() => setCollapseOpen(!collapseOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${collapseOpen ? 'show' : ''}`} id="navbarNav" style={{alignContent:'end',justifyContent:'end',margin:'auto'}}>
          <ul className="navbar-nav mr-auto">
        
       
        
          <li className="nav-item">
              <button className="nav-link active" style={{margin:'0px',color:'black'}} onClick={() => handlelogout()}>navigation</button>
            </li>
          <li className="nav-item">
              <button className="nav-link active" style={{margin:'0px',color:'black'}} onClick={() => handlelogout()}>ip address</button>
            </li>
            <li className="nav-item">
              <button className="nav-link active" style={{margin:'0px',color:'black'}} onClick={() => handlelogout()}>Logout</button>
            </li>

            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
