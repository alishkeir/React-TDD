const APIClient = {
  getHomes:async () => {
    return fetch('https://run.mocky.io/v3/62de12a6-dce1-4b9c-a34c-c77e275df98a').then(res =>res.json());
  },
};

export default APIClient;
