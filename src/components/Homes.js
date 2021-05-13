import React, { useState, useEffect } from "react";
import APIClient from "../services/APIClient";

const Homes = () => {
  const [homesState, setHomesState] = useState([]);

  useEffect(() => {
    const homesDataPromise = APIClient.getHomes();

    homesDataPromise.then((homesData) => setHomesState(homesData));
  }, []);

  let homes = homesState.map((home, index) => {
    return (
      <div data-testid="home" key={index}>
        Home!!
      </div>
    );
  });

  return <div>{homes}</div>;
};

export default Homes;
