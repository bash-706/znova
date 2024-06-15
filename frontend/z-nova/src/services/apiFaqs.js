import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/faqs';

export async function getAllFaqs() {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}`,
    });
    return res.data.data.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function getServiceFaqs(serviceId) {
  try {
    const url = `${BASE_URL}/service/${serviceId}`;
    const res = await axios({
      method: 'GET',
      url,
    });
    return res.data.data.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function createFaq(data) {
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

export async function updateFaq(data, faqId) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${BASE_URL}/${faqId}`,
      data,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function deleteFaq(faqId) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/${faqId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
