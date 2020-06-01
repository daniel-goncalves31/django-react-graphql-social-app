import React, { useContext, useEffect } from "react";
import {
  NotificationGqlType as NotificationType,
  OnNewNotificationDocument,
  useNotificationsQuery,
} from "../graphql/generated";
import { useUserContext } from "./UserContext";

interface Context {
  notifications: null | NotificationType[];
  notificationsCount: number;
}

const NotificationContext = React.createContext<Context>({
  notifications: null,
  notificationsCount: 0,
});

const useNotificationContext = () => useContext(NotificationContext);

const NotificationProvider: React.FC = ({ children }) => {
  const { data, subscribeToMore } = useNotificationsQuery();
  const { currentUser } = useUserContext();

  let notifications: NotificationType[] = [];
  if (data?.notifications) {
    notifications = data.notifications as any;
  }

  useEffect(() => {
    const unsubscribeToLess = subscribeToMore({
      variables: { currentUserId: currentUser?.id },
      document: OnNewNotificationDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        console.log(prev, subscriptionData);
        return {
          ...prev,
          notifications: [
            (subscriptionData.data as any).onNewNotification,
            ...prev!.notifications!,
          ],
        };
      },
    });

    return function unsubscribe() {
      if (unsubscribeToLess) {
        unsubscribeToLess();
      }
    };
  }, [subscribeToMore, currentUser]);

  return (
    <NotificationContext.Provider
      value={{ notifications, notificationsCount: notifications?.length }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { useNotificationContext, NotificationProvider };
