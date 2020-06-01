import React from "react";
import { useNotificationContext } from "../../../../../context/NotificationContext";
import NotificationItem from "./NotificationItem";

interface Props {}

const Notifications: React.FC<Props> = () => {
  const { notifications } = useNotificationContext();
  return (
    <div>
      <h1 className="text-2xl">Notifications</h1>
      <div className="mt-2">
        {notifications?.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
