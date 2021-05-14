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
    Number.isInteger(total)
      ? setTotalPriceState(total)
      : setTotalPriceState("00");
  }, [checkInState, checkOutState, props]);

  const handleBooking = () => {
    APIClient.bookHomes(props.home, checkInState, checkOutState).then(
      (res) => {
        bookingDialogService.close();
        NotificationService.open(res.message);
      }
    );
  };

  if (!props.home) {
    return <div data-testid="empty"></div>;
  }

  return (
    <>
      {/* {props.home ? props.home.title : null} */}
      <div data-testid="title">{props.home.title}</div>
      <div data-testid="price">{props.home.price}</div>
      <input
        data-testid="check-in"
        type="date"
        onChange={(e) => setCheckInState(e.target.value)}
      />
      <input
        data-testid="check-out"
        type="date"
        onChange={(e) => setCheckOutState(e.target.value)}
      />
      <div data-testid="total">${totalPriceState}</div>
      <button className="btn btn-primary"data-testid="book-btn" onClick={handleBooking}>
        Book
      </button>
    </>
  );
};

export default HomeBooking;
