import { getByTestId, render } from "@testing-library/react";
import React from "react";
import HomeBooking from "./HomeBooking";

const mockedHome = {
  title: "Home Test 1",
  image: "CRHotel.jpg",
  location: "Test Location 1",
  price: "1",
};

//~ Create container to fill in tests
let container = null;

//~ run this function before each test
beforeEach(() => {
  container = render(<HomeBooking home={mockedHome} />).container;
});

//~checking if components is rendering properly
it("foo", () => {
  console.log(container.innerHTML);
  expect(true).toBeTruthy();
});



//~ should show title
//~ should show price
//~ should show check-in date field
//~ should show check-out date field
//~ should calculate total 
//~ should book after clicking
//~ should close dialog and show toast notification