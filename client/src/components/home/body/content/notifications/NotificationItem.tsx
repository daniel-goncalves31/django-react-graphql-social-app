import React from "react";
import {
  NotificationGqlType,
  NotificationType,
} from "../../../../../graphql/generated";
import { getImageUrl } from "../../../../../utils/getImageUrl";

interface Props {
  notification: NotificationGqlType;
}

const NotificationItem: React.FC<Props> = ({ notification }) => {
  const image = getImageUrl(notification.sender.photo, "photo");

  const getNotificationMessage = () => {
    if (notification.type === NotificationType.MarkedInPost) {
      return `The user ${notification.sender.name} has marked you in a post`;
    }

    return "";
  };

  return (
    <>
      <div className="p-3 space-x-2 flex justify-between rounded bg-indigo-100">
        <img
          src={image}
          alt="sender"
          className="h-12 w-12 rounded-full object-cover object-center"
        />
        <p className="text-xs flex-grow">{getNotificationMessage()}</p>
        <button
          type="button"
          className="bg-transparent border-none text-xs text-indigo-400 focus:outline-none"
        >
          Mark as Read
        </button>
      </div>
      <hr />
    </>
  );
};

export default NotificationItem;
