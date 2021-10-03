/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import moment from "react-moment";
import _ from "lodash";

function ApiParser({ data }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dates, setDates] = useState([]);

  const beginningOfYear = moment("2017-01-01");

  mapDateToIndex = (date) => date.diff(this.beginningOfYear, "days");

  getBestDate = () => {
    let maxCount = 0;
    let startDate = null;

    let previousCount = this.dates[0].length;

    for (let i = 1; i < this.days; i++) {
      let currentCount = this.dates[i].length;
      let attendBothDays = _.intersection(this.dates[i], this.dates[i - 1]);
      let attendingCount = attendBothDays.length;

      if (attendingCount > maxCount && currentCount > 0 && previousCount > 0) {
        maxCount = attendingCount;
        startDate = moment(this.beginningOfYear).add(i - 1, "days");
      }

      previousCount = currentCount;
    }

    return startDate;
  };

  pushToArray = (email, date) =>
    this.dates[this.mapDateToIndex(moment(date))].push(email);

  getAttendeesForDate = (date) => this.dates[this.mapDateToIndex(moment(date))];

  function getPartnerSchadule() {
    const { partners } = data;
    const countries = {};

    partners.forEach((partner) => {});
  }

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getPartnerSchadule()),
    };
    fetch(
      "https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=c40daa2385f2dab1029ac969fafa",
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
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
    return <ul>Success</ul>;
  }
}

export default ApiParser;
