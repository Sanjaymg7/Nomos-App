const url = "https://api2.juegogames.com/NOMOS-V3/";

const doGETCall = (
  endPoint,
  headers = { "content-type": "application/json" }
) => {
  return fetch(url + endPoint, {
    method: "GET",
    headers: headers,
  }).then((res) => res.json());
};

const doPUTCall = (
  endPoint,
  body,
  headers = { "content-type": "application/json" }
) => {
  return fetch(url + endPoint, {
    method: "PUT",
    headers: headers,
    body: new URLSearchParams(body),
  }).then((response) => response.json());
};

const doPOSTCall = (
  endPoint,
  body,
  headers = { "content-type": "application/json" }
) => {
  return fetch(url + endPoint, {
    headers: headers,
    method: "POST",
    body: new URLSearchParams(body),
  }).then((response) => response.json());
};

const doDELETECall = (
  endPoint,
  headers = { "content-type": "application/json" }
) => {
  return fetch(url + endPoint, {
    method: "DELETE",
  }).then((res) => res.json());
};

export { doGETCall, doPUTCall, doPOSTCall, doDELETECall };
