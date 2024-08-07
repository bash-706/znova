import axios from 'axios';
import { PAGE_SIZE } from '../utils/constants';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/services';

export async function getAllServices(filter, sort, page) {
  try {
    let queryParams = '';

    if (filter && filter !== null) {
      if (queryParams) {
        queryParams += '&';
      }
      queryParams = Object.keys(filter)
        .map((key) => `${key}=${filter[key]}`)
        .join('&');
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

    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}?${queryParams}`,
    });
    const { data, totalDocs } = res.data;
    return { totalDocs, data };
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function getServiceById(serviceId) {
  try {
    console.log(serviceId);
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/${serviceId}`,
    });
    const { data } = res.data;
    return data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function getService(slug) {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/get-service/${slug}`,
    });
    const { data } = res.data;
    return data.service;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function createService(data) {
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

export async function updateService({ data, serviceId }) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${BASE_URL}/${serviceId}`,
      data,
      withCredentials: true,
    });
    return res?.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function deleteService(serviceId) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/${serviceId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
