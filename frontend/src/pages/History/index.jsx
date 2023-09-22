import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";

export function History() {
  function handleBack() {
    window.location.href = "http://localhost:5173/checkin";
  }

  const [history, setHistory] = useState([])

  async function getHistory() {
    const response = await axios.get("http://localhost:3333/checkin");

    const data = response.data;

    console.log(data)

    setHistory(data)

    
  }

  useEffect(() => {
    getHistory()
  },[])

  return (
    <section>
      <h1>History</h1>

      <div className="header">
        <div className="firstname">
          <span>First Name</span>
        </div>

        <div className="lastname">
          <span>Last Name</span>
        </div>

        <div className="checkin">
          <span>Check-in</span>
        </div>

        <div className="checkout">
          <span>Check-out</span>
        </div>
      </div>

      {history.map(user => (
        
        <div className="card" key={user.id}>
        <div className="firstname">
          <span>{user.firstName}</span>
        </div>

        <div className="lastname">
          <span>{user.lastName}</span>
        </div>

        <div className="checkin">
          <span>{user.checkin}</span>
        </div>

        <div className="checkout">
          <span>{user.checkout == null ? 'Not done' : user.checkout }</span>
        </div>
      </div>
        
      ))}


      <button className="btn" type="button" onClick={handleBack}>
        Back
      </button>
    </section>
  );
}



