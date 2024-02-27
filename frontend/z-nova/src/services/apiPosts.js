import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/posts';

export async function getAllPosts(type) {
  try {
    const url = type === 'latest' ? `${BASE_URL}/latest-posts` : `${BASE_URL}`;
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

export async function getPost(slug) {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/get-post/${slug}`,
    });
    const { data } = res.data;
    return data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function createPost(data) {
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

export async function deletePost(postId) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/${postId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
