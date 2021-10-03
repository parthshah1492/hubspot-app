/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";

import Parserhelper from "../../helper/parserHelper";

function ApiParser(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  function getPartnerSchadule() {
    const { partners } = props.data;
    const availibility = {};

    partners.forEach((partner) => {
      if (!availibility[partner.country]) {
        availibility[partner.country] = new Parserhelper();
      }
      partner.availableDates.forEach((date) =>
        availibility[partner.country].pushToArray(partner.email, date)
      );
    });

    let finalCountries = [];
    Object.keys(availibility).forEach((country) => {
      var bestDate = availibility[country].getBestDate();
      if (bestDate) bestDate = bestDate.format("YYYY-MM-DD");
      let attendees = availibility[country].getAttendeesForDate(bestDate) || [];
      finalCountries.push({
        attendeeCount: attendees.length,
        attendees,
        name: country,
        startDate: bestDate,
      });
    });

    return {
      countries: finalCountries,
    };
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
