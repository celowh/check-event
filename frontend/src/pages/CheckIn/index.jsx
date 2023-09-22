import "./index.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

export function CheckIn() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function handleCheckIn(data, event) {
    event.preventDefault();
    try {
      setIsLoading(true);

      const response = await axios.post("http://localhost:3333/checkin", data);

      const ticketUser = response.data.ticket

      window.location.href = `http://localhost:5173/checkout/${ticketUser}`
      
    } catch (e) {
      if (e.response.status === 409) {
        alert("This ticket already been used. Please try another ticket")
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleHistory() {
    window.location.href = "http://localhost:5173/history";
  }

  return (
    <div className="container">
      <h1>Check-In</h1>

      <form className="form" onSubmit={handleSubmit(handleCheckIn)}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="error">First Name is required</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="error">Last Name is required</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ticket">Ticket</label>
          <input
            type="text"
            className="form-control"
            id="ticket"
            {...register("ticket", { required: true })}
          />
          {errors.ticket && <span className="error">Ticket is required</span>}
        </div>

        <div className="form-group">
          <label htmlFor="checkinDate">Check-In Date</label>
          <input
            type="date"
            className="form-control"
            id="checkinDate"
            {...register("checkin", { required: true })}
          />
          {errors.checkin && <span className="error">A date is required</span>}
        </div>

        <div className="form-group">
          <button type="submit" className="btn-checkin" disabled={!!isLoading}>
            {isLoading ? "Loading" : "Check-In"}
          </button>
          <button className="btn-history" type="button" onClick={handleHistory}>
            Go to History
          </button>
        </div>
      </form>
    </div>
  );
}
