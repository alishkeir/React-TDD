import { Dialog, DialogContent } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import APIClient from "../services/APIClient";
import bookingDialogService from "../services/bookingDialogService";
import HomeBooking from "./HomeBooking";

const Homes = () => {
  const [homesState, setHomesState] = useState([]);
  const [dialogState, setDialogState] = useState({ open: false });

  useEffect(() => {
    const homesDataPromise = APIClient.getHomes();

    homesDataPromise.then((homesData) => setHomesState(homesData));
  }, []);

  useEffect(() => {
    const subscription = bookingDialogService.events$.subscribe((state) =>
      setDialogState(state)
    );
    return () => subscription.unsubscribe();
  }, []);

  let homes = homesState.map((home, index) => {
    return (
      <div className="col-6 col-md-6 col-lg-4 col-xl-3 mb-3" key={index}>
        <div data-testid="home" className="card w-100">
          <img
            data-testid="home-image"
            src={home.image}
            alt=""
            className="card-img-top"
          />
          <div className="card-body">
            <div data-testid="home-title" className="card-title h5">
              {home.title}
            </div>
            <div data-testid="home-location">{home.location}</div>
            <div data-testid="home-price">${home.price}/night</div>

            <div className="d-flex justify-content-end">
              <button
                data-testid="home-booking-btn"
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  bookingDialogService.open(home);
                }}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container m-2 ">
      <h1>Homes</h1>
      <div className="row">{homes}</div>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={dialogState.open}
        onClose={() => bookingDialogService.close()}
      >
        <DialogContent>
          <HomeBooking home={dialogState.home} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Homes;
