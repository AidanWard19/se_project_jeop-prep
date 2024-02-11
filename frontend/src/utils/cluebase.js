export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.jeopprep.csproject.org"
    : "http://localhost:3002";

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const fetchRandomDouble = () => {
  const data = fetch(`${BASE_URL}/clues/random`).then(handleServerResponse);
  return data;
};

export const fetchRandomFinal = () => {
  const data = fetch(`${BASE_URL}/clues/random?difficulty=5`).then(
    handleServerResponse
  );
  return data;
};

export const fetchSelectedFinal = (id) => {
  console.log(id);
  const data = fetch(`${BASE_URL}/clues/${id}`).then(handleServerResponse);
  return data;
};

export const fetchSelectedDouble = (id) => {
  console.log(id);
  const data = fetch(`${BASE_URL}/clues/${id}`).then(handleServerResponse);
  return data;
};

// const gameCount = 6314;
