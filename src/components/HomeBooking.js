import moment from "moment";
import React, { useState, useEffect } from "react";
import APIClient from "../services/APIClient";
import bookingDialogService from "../services/bookingDialogService";
import NotificationService from "../services/NotificationService";

const HomeBooking = (props) => {
  const [checkInState, setCheckInState] = useState();
  const [checkOutState, setCheckOutState] = useState();
  const [totalPriceState, setTotalPriceState] = useState();

  useEffect(() => {
    const price = props.home ? props.home.price : 0;
    const checkInDate = moment(checkInState, "YYYY-MM-DD");
    const checkOutDate = moment(checkOutState, "YYYY-MM-DD");
    const nights = checkOutDate.diff(checkInDate, "days");
    const total = nights * price;
    setTotalPriceState(total);
    total > 0 ? setTotalPriceState(total) : setTotalPriceState("00");
  }, [checkInState, checkOutState, props]);

  const handleBooking = () => {
    APIClient.bookHomes(props.home, checkInState, checkOutState).then((res) => {
      bookingDialogService.close();
      NotificationService.open(res.message);
    });
  };

  if (!props.home) {
    return <div data-testid="empty"></div>;
  }

  return (
    <>
      {/* {props.home ? props.home.title : null} */}
      <h2 data-testid="title">{props.home.title}</h2>
      <div data-testid="price" className="mb-3">
        <span className="font-weight-bold text-primary text-large">
          ${props.home.price}{" "}
        </span>
        per night
      </div>
      <div className="form-group">
        <label htmlFor="checkInDate">Choose your check-in date</label>
        <input
          data-testid="check-in"
          className="form-control"
          id="checkInDate"
          type="date"
          onChange={(e) => setCheckInState(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="checkOutDate">Choose your check-out date</label>
        <input
          data-testid="check-out"
          className="form-control"
          id="checkOutDate"
          type="date"
          onChange={(e) => setCheckOutState(e.target.value)}
        />
      </div>
      <div data-testid="total" className="my-3 text-right">
        <span className="font-weight-bold text-large">
          Total: ${totalPriceState}
        </span>
      </div>
      <div className="d-flex justify-content-end">
        <button
          data-testid="book-btn"
          type="button"
          className="btn btn-primary"
          onClick={handleBooking}
        >
          Book
        </button>
      </div>
    </>
  );
};

export default HomeBooking;
