import React, { useState, useEffect } from 'react';
import { Routes, Route ,useNavigate} from 'react-router-dom';
import { auth } from './firebase.config';
import Signin from './components/signin';
import HashLoader from "react-spinners/HashLoader";
import './App.css';
import toast from 'react-hot-toast';
import Home from './components/home';

function App() {
  const [log, setLog] = useState(false);
  const [mail, setMail] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleSignOut = async (e) => {
    try {
      await auth.signOut(); 
    } catch (error) {

      toast.dismiss();
      toast.error("error while logout");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        setLoading(true); 
  
        if (user) {
          setMail(user.email);
        } else {
          setMail('');
          await auth.signOut();
        }
  
        setLoading(false);
      } catch (error) {
        console.error('Error during authentication state change:', error);
        setLoading(false); 
      }
    });
  
    return () => unsubscribe(); // Clean up subscription on component unmount
  }, []);

  if (loading) {
    return (
      <div style={{display:'flex',justifyContent:'center', alignItems:'center',margin:'auto',height:'100vh'}}>
       <HashLoader color="white" />
      </div>
    );
  }


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin user1={setLog} email={setMail}/>} />
        <Route path="/home" element={auth.currentUser ? <Home/> : <Signin user1={setLog} email={setMail}/>} />

      </Routes>
    </div>
  );
}

export default App;
