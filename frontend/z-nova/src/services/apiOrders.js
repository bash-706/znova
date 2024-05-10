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

export async function checkoutBusinessSession(plan) {
  try {
    console.log(plan);
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/checkout-business-session?plan=${plan}`,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function getAllOrders() {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}`,
      withCredentials: true,
    });
    const { data } = res.data.data;
    return { data };
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function getOrder(orderId) {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/${orderId}`,
      withCredentials: 'true',
    });
    const { data } = res.data;
    return data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function updateOrder(data, orderId) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${BASE_URL}/${orderId}`,
      data,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function deleteOrder(orderId) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/${orderId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
