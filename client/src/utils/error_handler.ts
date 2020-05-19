import { ApolloError } from "apollo-client";
import { toast } from "react-toastify";

export const handleErrors = (error: ApolloError) => {
  if (error.graphQLErrors[0]) {
    if (error.graphQLErrors[0].message === "Bad Request Exception") {
      const errors_list =
        error.graphQLErrors[0].extensions?.exception.response.message;
      errors_list.forEach((err: string) => toast.error(err));
    } else {
      toast.error(error.graphQLErrors[0].message);
    }
  } else {
    toast.error(error.message);
  }
};
