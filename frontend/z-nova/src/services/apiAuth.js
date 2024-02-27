import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/users';

export async function login(email_username, password) {
  const fieldName = email_username.includes('@') ? 'email' : 'username';
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/auth/login`,
      data: {
        [fieldName]: email_username,
        password,
      },
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function getCurrentUser() {
  // try {
  const res = await axios({
    method: 'GET',
    url: `${BASE_URL}/get-user`,
    withCredentials: true,
  });
  return res.data?.data?.user;
  // }
  //catch (err) {
  // throw new Error(err.response.data.message);
  // }
}

export async function signup(data) {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/auth/signup`,
      data,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function logout() {
  try {
    await axios({
      method: 'GET',
      url: `${BASE_URL}/logout`,
      withCredentials: true,
    });
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}

export async function updateAccount(data, type) {
  try {
    const url =
      type === 'password'
        ? `${BASE_URL}/update-password`
        : `${BASE_URL}/update-account`;
    const res = await axios({
      method: 'PATCH',
      url,
      data,
      withCredentials: true,
    });
    console.log(res.data);
    return res.data?.data?.user;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function verifyAccount(token) {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/verify-account/${token}`,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function deleteAccount(password) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/delete-account`,
      data: {
        password,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function forgotPassword(email) {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/forgot-password`,
      data: {
        email,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function resetPassword({ resetToken, password, passwordConfirm }) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${BASE_URL}/reset-password/${resetToken}`,
      data: {
        password,
        passwordConfirm,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
