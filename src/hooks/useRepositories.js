import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";
import parseSortBy from "../utils/parseSortBy";

const useRepositories = (sortBy, filterText) => {
  const [repositories, setRepositories] = useState();

  const sortVariables = parseSortBy(sortBy);

  const queryVariables = {
    ...sortVariables,
    searchKeyword: filterText,
  };

  const { error, loading } = useQuery(GET_REPOSITORIES, {
    variables: queryVariables,
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setRepositories(data.repositories);
    },
  });

  return { repositories, loading, error };
};

export default useRepositories;
