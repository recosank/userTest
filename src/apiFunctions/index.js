import axios from "axios";

const baseUrl = "https://dummyapi.io/data/v1/user";

export const getAllUsers = (url) =>
  axios
    .get(`${baseUrl}${url}`, {
      headers: { "app-id": "64098789b9ab971cd2a54daa" },
    })
    .then(async (res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));

export const updateUser = (id, data) =>
  axios
    .put(
      `${baseUrl}/${id}`,
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        street: data.street,
        country: data.country,
        city: data.city,
      },
      {
        headers: { "app-id": "64098789b9ab971cd2a54daa" },
      }
    )
    .then(async (res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

export const addUser = (data) =>
  axios
    .post(
      `${baseUrl}/create`,
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        street: data.street,
        country: data.country,
        city: data.city,
      },
      {
        headers: { "app-id": "64098789b9ab971cd2a54daa" },
      }
    )
    .then(async (res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

export const deleteUser = (id) =>
  axios
    .delete(`${baseUrl}/${id}`, {
      headers: { "app-id": "64098789b9ab971cd2a54daa" },
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
