import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_REVIEWS } from "../graphql/queries";

const useReviews = (id) => {
  console.log(id);
  const [reviews, setReviews] = useState();

  const { error, loading } = useQuery(GET_REVIEWS, {
    variables: { id },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log("data at usereviews", data);
      setReviews(data.repository.reviews);
    },
  });

  return { reviews, loading, error };
};

export default useReviews;
