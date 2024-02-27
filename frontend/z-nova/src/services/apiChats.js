import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/chats';

export async function getAllChats(userId) {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/${userId}`,
      withCredentials: true,
    });
    const { chats } = res.data;
    return chats;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function createChat(data) {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}`,
      data,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
