import { getByTestId, render } from "@testing-library/react";
import React from "react";
import Header from "./Header";
render;


//~ Create container to fill in tests
let container = null;


//~ run this function before each test
beforeEach(() => {
  container = render(<Header />).container;
});


//~there should be a component with 'logo' data-testid 
it("should show logo", () => {
  expect(getByTestId(container, "logo")).toBeTruthy();
});


//~there should be a component with 'search' data-testid 
it("should show search", () => {
  expect(getByTestId(container, "search")).toBeTruthy();
});


//~there should be a component with 'menu' data-testid 
it("should show menu", () => {
  expect(getByTestId(container, "menu")).toBeTruthy();
});



//~there should be a component with ['home-type' - 'dates' - 'guests' - 'price' - 'rooms' - 'amenities' ] data-testid 
it("should show filters", () => {
  expect(getByTestId(container, "home-type")).toBeTruthy();
  expect(getByTestId(container, "dates")).toBeTruthy();
  expect(getByTestId(container, "guests")).toBeTruthy();
  expect(getByTestId(container, "price")).toBeTruthy();
  expect(getByTestId(container, "rooms")).toBeTruthy();
  expect(getByTestId(container, "amenities")).toBeTruthy();
});
