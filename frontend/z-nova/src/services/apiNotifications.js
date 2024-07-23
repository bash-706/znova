import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1/notifications';

export async function getUserNotifications() {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/unread`,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
}

export async function markNotificationAsRead(notificationId) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/markAsRead/${notificationId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
