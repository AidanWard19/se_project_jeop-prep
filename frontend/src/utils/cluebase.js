const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getData = () => {
  const data = fetch("http://cluebase.lukelav.in/clues").then(
    handleServerResponse
  );
  return data;
};
