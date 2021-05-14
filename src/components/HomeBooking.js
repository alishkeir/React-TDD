import React from "react";

const HomeBooking = (props) => {
  return <>{props.home ? props.home.title : null}</>;
};

export default HomeBooking;
