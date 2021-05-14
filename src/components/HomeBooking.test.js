import { getByTestId, render } from "@testing-library/react";
import React from "react";
import HomeBooking from "./HomeBooking";

const mockedHome = {
  title: "Home Test 1",
  image: "CRHotel.jpg",
  location: "Test Location 1",
  price: "125",
};

//~ Create container to fill in tests
let container = null;

//~ run this function before each test
beforeEach(() => {
  container = render(<HomeBooking home={mockedHome} />).container;
});

//~checking if components is rendering properly
it("foo", () => {
  expect(true).toBeTruthy();
});

it("should show title", () => {
  expect(getByTestId(container, "title").textContent).toBe("Home Test 1");
});

it("should show price", () => {
  expect(getByTestId(container, "price").textContent).toBe("125");
});

it("should show check-in date field", () => {
  expect(getByTestId(container, "check-in")).toBeTruthy();
});

it("should show check-out date field", () => {
  expect(getByTestId(container, "check-out")).toBeTruthy();
});

//~ should calculate total
//~ should book after clicking
//~ should close dialog and show toast notification

it("should show empty when no home provided", () => {
  container = render(<HomeBooking home={null} />).container;

  expect(getByTestId(container, "empty")).toBeTruthy();
});
