import { useApolloClient } from "@apollo/react-hooks";
import React, { useContext, useEffect, useState } from "react";
import { UsersDocument, UserType as User } from "../graphql/generated";

interface Context {
  allUsers: User[] | null | undefined;
}

const AllUsersContext = React.createContext<Context>({
  allUsers: null,
});

const useAllUsersContext = () => useContext(AllUsersContext);

const AllUsersProvider: React.FC = ({ children }) => {
  const [allUsers, setAllUsers] = useState<User[] | null | undefined>(null);

  const { query } = useApolloClient();

  const fetchAllUsers = async () => {
    try {
      const res = await query({
        query: UsersDocument,
      });
      const users = res.data.users;
      if (!users) {
        setAllUsers(null);
      } else {
        setAllUsers(users);
      }
    } catch (error) {
      console.error(error.message);
      setAllUsers(null);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <AllUsersContext.Provider value={{ allUsers }}>
      {children}
    </AllUsersContext.Provider>
  );
};

export { useAllUsersContext, AllUsersProvider };
