import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export async function contact(name, email, subject, message) {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/contact`,
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
