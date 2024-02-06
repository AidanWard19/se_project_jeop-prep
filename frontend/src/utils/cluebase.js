export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.jeopprep.csproject.org"
    : "http://localhost:3002";

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getData = () => {
  const data = fetch(`${BASE_URL}/clues`).then(handleServerResponse);
  return data;
};
