import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/services';
const BASE_URL2 = 'http://127.0.0.1:8000/api/v1/reviews';

export async function getAllReviews() {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL2}`,
      withCredentials: true,
    });
    const { data } = res.data;
    return { data };
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function getServiceReviews(serviceId) {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/${serviceId}/reviews`,
      withCredentials: true,
    });
    const { data } = res.data;
    return { data };
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function getUserReviews(userId) {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL2}/user-reviews/${userId}`,
      withCredentials: true,
    });
    const { data } = res.data;
    return { data };
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function getUnreviewedOrders(serviceId) {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL2}/services/${serviceId}`,
      withCredentials: true,
    });
    const { data } = res.data;
    return { data };
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function createReview(serviceId, rating, review, order) {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/${serviceId}/reviews`,
      data: {
        review,
        rating,
        order,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function updateReview(data, reviewId) {
  try {
    console.log(data, reviewId);
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8000/api/v1/reviews/${reviewId}`,
      data: {
        review: data,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function deleteReview(reviewId) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/reviews/${reviewId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
