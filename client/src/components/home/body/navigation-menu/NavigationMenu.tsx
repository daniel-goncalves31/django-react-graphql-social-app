import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { RiFeedbackLine } from "react-icons/ri";
import { useUserContext } from "../../../../context/UserContext";
import NavigationMenuItem from "./NavigationMenuItem";

interface Props {}

const NavigationMenu: React.FC<Props> = () => {
  const { currentUser } = useUserContext();
  const { firstName, lastName, username } = currentUser!;
  return (
    <div className="w-12/12">
      <h1 className="text-gray-400 text-2xl">{`${firstName} ${lastName} (${username})`}</h1>
      <ul className="flex items-center">
        <NavigationMenuItem path="/" Icon={BsBook}>
          Feed
        </NavigationMenuItem>
        <NavigationMenuItem path="/" Icon={AiOutlineUser}>
          Profile
        </NavigationMenuItem>
        <NavigationMenuItem path="/" Icon={RiFeedbackLine}>
          Notifications
        </NavigationMenuItem>
      </ul>
    </div>
  );
};

export default NavigationMenu;
