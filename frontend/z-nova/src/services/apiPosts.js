import axios from 'axios';
import { PAGE_SIZE } from '../utils/constants';
const BASE_URL = 'http://127.0.0.1:8000/api/v1/posts';

export async function getAllPosts(filter, sort, page, type) {
  try {
    let queryParams = '';

    if (filter && filter !== null) {
      if (queryParams) {
        queryParams += '&';
      }
      queryParams = Object.keys(filter)
        .map((key) => `${key}=${filter[key]}`)
        .join('&');

      if (queryParams.includes('page=')) {
        queryParams = queryParams.replace(/(&|\?)page=\d+/g, '');
      }
    }

    if (sort && Object.keys(sort).length > 0) {
      if (queryParams) {
        queryParams += '&';
      }
      queryParams += `sort=${sort.direction === 'asc' ? '+' : '-'}${
        sort.field
      }`;
    }

    if (page) {
      if (queryParams) {
        queryParams += '&';
      }
      queryParams += `page=${page}&limit=${PAGE_SIZE}`;
    }

    const url =
      type === 'latest'
        ? `${BASE_URL}/latest-posts`
        : `${BASE_URL}?${queryParams}`;

    const res = await axios({
      method: 'GET',
      url,
    });
    return res.data;
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

export async function updatePost(data, postId) {
  try {
    console.log('api post', postId, data);
    const res = await axios({
      method: 'PATCH',
      url: `${BASE_URL}/${postId}`,
      data,
      withCredentials: true,
    });
    console.log(res?.data);
    return res?.data;
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
