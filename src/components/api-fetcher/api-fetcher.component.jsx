import React, { useState, useEffect } from "react";

import ApiParser from "../api-parser/api-parser.component";

function ApiFetcher() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(
      "https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=c40daa2385f2dab1029ac969fafa"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <ApiParser data={data} />;
  }
}

export default ApiFetcher;
