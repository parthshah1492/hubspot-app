import React, { useState, useEffect } from "react";

import ApiParser from "../api-parser/api-parser.component";

function ApiFetcher() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      "https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=56c9ab01aa79fc4d4a46dcc1a339"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          setIsLoaded(true);
          console.log(data);
        },
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
