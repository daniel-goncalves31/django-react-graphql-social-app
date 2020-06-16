import { useApolloClient } from "@apollo/react-hooks";
import React, { useContext, useEffect, useState } from "react";
import {
  UserStatisticsDocument,
  UserStatisticsType,
} from "../graphql/generated";

interface Context {
  userStatistics: UserStatisticsType;
  setUserStatistics: React.Dispatch<React.SetStateAction<UserStatisticsType>>;
}

const UserStatisticsContext = React.createContext<Context>({
  userStatistics: {},
  setUserStatistics: () => {},
});

const useUserStatisticsContext = () => useContext(UserStatisticsContext);

const UserStatisticsProvider: React.FC = ({ children }) => {
  const [userStatistics, setUserStatistics] = useState<UserStatisticsType>({});

  const { query } = useApolloClient();

  const fetchUserStatistics = async () => {
    try {
      const res = await query({
        query: UserStatisticsDocument,
      });
      const userStatistics = res.data.userStatistics;
      if (!userStatistics) {
        setUserStatistics({});
      } else {
        setUserStatistics(userStatistics);
      }
    } catch (error) {
      console.error(error.message);
      setUserStatistics({});
    }
  };

  useEffect(() => {
    fetchUserStatistics();
    // eslint-disable-next-line
  }, []);

  return (
    <UserStatisticsContext.Provider
      value={{
        userStatistics,
        setUserStatistics,
      }}
    >
      {children}
    </UserStatisticsContext.Provider>
  );
};

export { useUserStatisticsContext, UserStatisticsProvider };
