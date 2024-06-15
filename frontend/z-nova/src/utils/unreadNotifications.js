export const unreadNotifications = (notifications) =>
  notifications?.filter((n) => n.isRead === false);
