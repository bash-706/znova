import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/comments';

export async function getAllComments() {
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

export async function createComment(data) {
  console.log(data);
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

export async function updateComment(data, commentId) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${BASE_URL}/${commentId}`,
      data: {
        text: data,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function deleteComment(commentId) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/${commentId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
