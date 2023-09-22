import "./index.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export function CheckOut() {
  const { handleSubmit } = useForm();
  const params = useParams();

  async function handleCheckOut(data, event) {
    event.preventDefault();
    console.log(data);

    try {
      const response = await axios.post(`http://localhost:3333/checkout/${params.id}`);

      if (response.status != 200) {
        alert("Error");
        return;
      }
      alert("Check-Out Successfully");
      window.location.href = "http://localhost:5173/history";
    } catch (e) {
      console.log(e);
    }
    
  }

  function handleHistory() {
    window.location.href = "http://localhost:5173/history";
  }

  async function getInfo() {
    try {
      const response = await axios.get(
        `http://localhost:3333/checkout/${params.id}`
      );
      const data = response.data;
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="container">
      <h1>Check-Out</h1>

      <form className="form" onSubmit={handleSubmit(handleCheckOut)}>
        <div className="form-group">
          <button type="submit" className="btn-checkin">
            Check-Out Confirm
          </button>
          <button className="btn-history" type="button" onClick={handleHistory}>
            Go to History
          </button>
        </div>
      </form>
    </div>
  );
}
