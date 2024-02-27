import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/messages';

export async function getAllMessages(chatId) {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/${chatId}`,
      withCredentials: true,
    });
    const { messages } = res.data;
    return messages;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function createMessage(data) {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/`,
      data,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}
