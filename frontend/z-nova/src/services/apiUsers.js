import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/users';

export async function getAllUsers() {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}`,
      withCredentials: true,
    });
    return res.data.data.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function getUser(userId) {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/${userId}`,
      withCredentials: true,
    });
    const { data } = res.data;
    return data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

// export async function createUser(data) {
// try {
// const res = await axios({
// method: 'POST',
// url: `${BASE_URL}`,
// data,
// withCredentials: true,
// });
// return res.data;
// } catch (err) {
// throw new Error(err.response.data.message);
// }
// }

export async function updateUser(data, userId, message) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${BASE_URL}/${userId}`,
      data,
      withCredentials: true,
    });
    return { data: res.data, message };
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function deleteUser(userId) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/${userId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
