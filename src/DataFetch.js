const headers = { "content-type": "application/json" };
const doGETCall = (url) => {
  return fetch(url, {
    method: "GET",
    headers: headers,
  }).then((res) => res.json());
};

const doPUTCall = (url, body) => {
  return fetch(url, {
    method: "PUT",
    headers: headers,
    body: body,
  }).then((response) => response.json());
};

const doPOSTCall = (url, body) => {
  return fetch(url, {
    headers: headers,
    method: "POST",
    body: body,
  }).then((response) => response.json());
};

const doDELETECall = (url) => {
  return fetch(url, {
    method: "DELETE",
  }).then((res) => res.json());
};

export { doGETCall, doPUTCall, doPOSTCall, doDELETECall };
