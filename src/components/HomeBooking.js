import React from "react";

const HomeBooking = (props) => {
  if (!props.home) {
    return <div data-testid="empty"></div>;
  }

  return (
    <>
      {/* {props.home ? props.home.title : null} */}
      <div data-testid="title">{props.home.title}</div>
      <div data-testid="price">{props.home.price}</div>
      <input data-testid="check-in" type="date" />
      <input data-testid="check-out" type="date" />
    </>
  );
};

export default HomeBooking;
