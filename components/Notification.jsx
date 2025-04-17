import React from 'react';
import { useNotification } from '@/context/NotificationContext';

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  const { message, type } = notification;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}
    >
      {message}
    </div>
  );
};

export default Notification;