import {act, getAllByTestId, render } from "@testing-library/react";
import React from "react";
import APIClient from "../services/APIClient";
import Homes from "./Homes";


//~ Create container to fill in tests
let container = null;

//~ run this function before each test
beforeEach(async () => {


jest.spyOn(APIClient,'getHomes').mockImplementation(()=>{
  return Promise.resolve([
      {
        title: "Home Test 1",
        image: "CRHotel.jpg",
        location: "Test Location 1",
        price: "1",
      },
      {
        title: "Home Test 2",
        image: "CRHotel.jpg",
        location: "Test Location 2",
        price: "2",
      },
      {
        title: "Home Test 3",
        image: "CRHotel.jpg",
        location: "Test Location 3",
        price: "3",
      },
    ]);
})


  container = render(<Homes />).container;
  await act(async () => {});
});

it("should show homes", () => {
  const homes = getAllByTestId(container, "home");


  //~ Component should display at least 1 home
  expect(homes.length).toBeGreaterThan(0);
});
