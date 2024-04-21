import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/post-categories';

export async function getAllPostCategories() {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}`,
      withCredentials: true,
      retry: false,
    });
    return res.data.data.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function createPostCategory(data) {
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

export async function updatePostCategory(data, categoryId) {
  console.log(data, categoryId);
  try {
    console.log(data, categoryId);
    const res = await axios({
      method: 'PATCH',
      url: `${BASE_URL}/${categoryId}`,
      data: {
        name: data,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function deletePostCategory(categoryId) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/${categoryId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
