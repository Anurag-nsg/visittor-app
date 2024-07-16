import NavigationBar from "./navbar";
import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";

const Home = () => {

    const [data, setData] = useState(null); // Initialize state to hold fetched data

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5002/home");
            setData(response.data); // Update state with fetched data
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };

        fetchData(); // Call the async function to fetch data when component mounts
    }, []);
    

    console.log(data);

    return ( 
       
        <>
         <NavigationBar/>

         <div className="square-container" style={{ minHeight: '300px', marginLeft: '15%', maxHeight: '500px', maxWidth: '500px', marginRight: '15%', background: 'black', margin: 'auto', marginTop: '50px', position: 'relative', overflow: 'hidden' }}>
        <iframe title="YouTube Video" width="100%" height="100%" src="https://www.youtube.com/embed/gtw2T55VXQQ" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', border: 'none' }}></iframe>
        </div>


         
         <div className="square-container" style={{minHeight:'500px',marginLeft:'15%',maxWidth:'500px',marginRight:'15%',background:'pink',margin:'auto',marginTop:'50px',paddingBottom:'15px',paddingTop:'15px'}}>
           
         {data && data.length > 0 ? (
      <div
        className="square-container"
        style={{
          minHeight: "500px",
          marginLeft: "15%",
          maxWidth: "500px",
          marginRight: "15%",
          background: "pink",
          margin: "auto",
          paddingBottom: "15px",
          paddingTop: "15px",
      
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              width: "90%",
              backgroundColor: "yellow",
              borderRadius: "15px",
              margin: "5px auto",
              display: "flex",
              justifyContent: "center",
              padding: "2px",
            }}
          >
            <div style={{ display: "grid", alignItems:'center',justifyContent:'center',alignContent:'center',margin: "auto" }}>
              <p style={{ textAlign: "left", marginLeft: "10px", marginTop:'15px',marginBottom:'5px',fontWeight:'bold'}}>name : {item.name}</p>
              <p style={{ textAlign: "left", marginLeft: "10px", fontWeight:'bold' }}>slot : {item.slot}</p>
            </div>
            <div style={{ display: "grid", textAlign: "right", margin: "auto" }}>
              <p style={{ textAlign: "left", marginLeft: "10px", marginTop:'15px',marginBottom:'5px',fontWeight:'bold'}}>
                arrivaltime : {item.arrivaltime} / {item.date}
              </p>
              <p style={{ textAlign: "left", marginLeft: "10px", fontWeight:'bold' }}>Number plate : {item.numberplate}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>Loading...</p>
    )}
        </div>
    
        </>
     );
}
 
export default Home;