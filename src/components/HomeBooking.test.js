import { act, fireEvent, getByTestId, render } from "@testing-library/react";
import React from "react";
import HomeBooking from "./HomeBooking";
import APIClient from "../services/APIClient";
import NotificationService from "../services/NotificationService";
import bookingDialogService from "../services/bookingDialogService";

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
  expect(getByTestId(container, "price").textContent).toBe("$125 per night");
});

it("should show check-in date field", () => {
  expect(getByTestId(container, "check-in")).toBeTruthy();
});

it("should show check-out date field", () => {
  expect(getByTestId(container, "check-out")).toBeTruthy();
});

it("should calculate total", () => {
  //~ enter check-in date: 2020-12-04
  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2020-12-04" },
  });

  //~ enter check-out date: 2020-12-07
  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2020-12-07" },
  });

  expect(getByTestId(container, "total").textContent).toBe("Total: $375");
});




it("should show 00 for invalid dates", () => {
  //~ enter check-in date: 2020-12-04
  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2020-12-04" },
  });

  //~ enter check-out date: 2020-12-07
  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2020-12-02" },
  });

  expect(getByTestId(container, "total").textContent).toBe("Total: $00");
});



it("should book after clicking", () => {
  jest.spyOn(APIClient, "bookHomes").mockImplementation(() => {
    return Promise.resolve({ message: 'Mocked home booked!' });
  });

  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2020-12-04" },
  });

  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2020-12-07" },
  });

  getByTestId(container, "book-btn").click();

  expect(APIClient.bookHomes).toHaveBeenCalledWith(
    mockedHome,
    "2020-12-04",
    "2020-12-07"
  );
});

it("should close dialog and show toast notification", async () => {
  jest
    .spyOn(APIClient, "bookHomes")
    .mockImplementation(() => Promise.resolve({ message:"Mocked Home Booked !!"}));

  jest.spyOn(bookingDialogService, "close").mockImplementation(() => {});

  jest.spyOn(NotificationService, "open").mockImplementation(() => {});

  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2020-12-04" },
  });

  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2020-12-07" },
  });

  getByTestId(container, "book-btn").click();
  await act(async () => {});
  expect(bookingDialogService.close).toHaveBeenCalled();


  expect(NotificationService.open).toHaveBeenCalledWith('Mocked Home Booked !!');

});

it("should show empty when no home provided", () => {
  container = render(<HomeBooking home={null} />).container;

  expect(getByTestId(container, "empty")).toBeTruthy();
});
