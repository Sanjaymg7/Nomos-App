const url = "https://api2.juegogames.com/NOMOS-V3/";

const doGETCall = (
  endPoint,
  headers = { "content-type": "application/json" }
) => {
  return fetch(url + endPoint, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.responseCode === 200) {
        return data.responseData;
      } else {
        alert(data.responseMessage);
        return false;
      }
    })
    .catch((err) => {
      alert(err);
      return false;
    });
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
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.responseCode === 200) {
        return data.responseData;
      } else {
        alert(data.responseMessage);
        return false;
      }
    })
    .catch((err) => {
      alert(err);
      return false;
    });
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
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.responseCode === 200) {
        return data.responseData;
      } else {
        alert(data.responseMessage);
        return false;
      }
    })
    .catch((err) => {
      alert(err);
      return false;
    });
};

const doDELETECall = (
  endPoint,
  headers = { "content-type": "application/json" }
) => {
  return fetch(url + endPoint, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.responseCode === 200) {
        return data.responseData;
      } else {
        alert(data.responseMessage);
        return false;
      }
    })
    .catch((err) => {
      alert(err);
      return false;
    });
};

export { doGETCall, doPUTCall, doPOSTCall, doDELETECall };
