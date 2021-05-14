import {act, getAllByTestId, getNodeText, render } from "@testing-library/react";
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


  //~ Component should contain at least 1 home
  expect(homes.length).toBeGreaterThan(0);
});


it("should show home title", () => {
  const homeTitles = getAllByTestId(container, "home-title");


  //~ Component should contain specific home title
  expect(getNodeText(homeTitles[0])).toBe('Home Test 1');
});





it("should show home image", () => {
  const homeImages = getAllByTestId(container, "home-image");


  //~ Component should have an image
  expect(homeImages[0]).toBeTruthy();
});




it("should show home location", () => {
  const homeLocations = getAllByTestId(container, "home-location");


  //~ Component should contain specific home location
  expect(getNodeText(homeLocations[0])).toBe('Test Location 1');
});


it("should show home location", () => {
  const homePrices = getAllByTestId(container, "home-price");


  //~ Component should contain specific home price
  expect(getNodeText(homePrices[0])).toBe('$1/night');
});
