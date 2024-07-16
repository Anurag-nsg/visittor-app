import React, { useState ,useEffect} from "react";
import { auth } from "../firebase.config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import "../App.css"; 


const Signin = (log) => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, settoken] = useState(null);

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await auth.signOut(); 
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };
  
    handleSignOut();

  }, []); 

  
  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    if (name === "email") {
        const lowercaseEmail = value.toLowerCase(); 
        setEmail(lowercaseEmail); 
    } else if (name === "password") {
        setPassword(value); 
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      settoken(await user.getIdToken());
  
      setLoading(false);  
      setIsLoggedIn(true);
      toast.success('Login successful!');
      log.user1(true);
      log.email(email);
      navigate('/home');

          
    } catch (error) {
      console.error(error);
      setLoading(false);
      settoken(null);
      log.user1(false);
      toast.error('Invalid email or password. Please try again.');
      console.log('Login unsuccessful!');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      log.user1(false);
      settoken(null);
      toast.success('Logout successful!');

    } catch (error) {
      console.error(error);
      toast.error('Error occurred during logout. Please try again.');
      console.log('Logout error!');
    }
  };

  const isLoginEnabled = email && password  && !loading;
  
  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            {isLoggedIn ? (
              <p>Redirecting to home screen...</p>
            ) : (
              <form className="login" onSubmit={handleLogin} >
                <h2 >ParkEase</h2>
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    type="username"
                    className="login__input custom-input"
                    placeholder="Email"
                    style={{
                      border: "none",
                      borderBottom: "2px solid #D1D1D4",
                      background: "none",
                      borderRadius: "40px",
                      padding: "10px",
                      paddingLeft: "24px",
                      fontWeight: "700",
                      width: "100%",
                      alignItems: "center",
                      transition: ".2s"
                  }}
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    className="login__input custom-input"
                    placeholder="Password"
                    style={{
                        border: "none",
                        borderBottom: "2px solid #D1D1D4",
                        background: "none",
                        borderRadius: "40px",
                        padding: "10px",
                        paddingLeft: "24px",
                        fontWeight: "700",
                        width: "100%",
                        alignItems: "center",
                        transition: ".2s"
                    }}
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    required
                    autoComplete="current-password"
                    />
                </div>
                <button
                  className={`button login__submit ${isLoginEnabled ? "" : "disabled"} ${loading ? "loading" : ""}`}
                  disabled={!isLoginEnabled || loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-grow" role="status" aria-hidden="true" style={{width:"15px",height:"15px"}}></span>
                      &nbsp; {  }
                      <span className="sr-only">  Loading...</span>
                    </>
                  ) : (
                    <>
                      Login
                      <i className="button__icon fas fa-chevron-right"></i>
                    </>
                  )}
                </button>
              </form>
            )}
           
            {isLoggedIn && (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
          <div className="social-login">
            <h3>Parking Assist</h3>
          </div>
        </div>
        <Toaster position="top-center" /> 
      </div>
    </>
  );
}

export default Signin;