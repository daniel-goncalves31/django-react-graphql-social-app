import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { RiFeedbackLine } from "react-icons/ri";
import { useNotificationContext } from "../../../../context/NotificationContext";
import { usePostContext } from "../../../../context/PostContext";
import { useUserContext } from "../../../../context/UserContext";
import NavigationMenuItem from "./NavigationMenuItem";

interface Props {}

const NavigationMenu: React.FC<Props> = () => {
  const { currentUser } = useUserContext();
  const { notificationsCount } = useNotificationContext();
  const { postsCount } = usePostContext();
  const { name, username } = currentUser!;

  return (
    <div className="w-12/12 mt-4">
      <h1 className="text-gray-200 text-2xl">{`${name} (${username})`}</h1>
      <ul className="flex items-center py-1">
        <NavigationMenuItem path="/home/feed" Icon={BsBook} count={postsCount}>
          Feed
        </NavigationMenuItem>
        <NavigationMenuItem path="/home/profile" Icon={AiOutlineUser}>
          Profile
        </NavigationMenuItem>
        <NavigationMenuItem
          path="/home/notifications"
          Icon={RiFeedbackLine}
          count={notificationsCount}
        >
          Notifications
        </NavigationMenuItem>
      </ul>
    </div>
  );
};

export default NavigationMenu;
