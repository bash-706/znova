import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/orders';

export async function checkoutSession({ serviceId, item }) {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/checkout-session/${serviceId}`,
      data: {
        item,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
