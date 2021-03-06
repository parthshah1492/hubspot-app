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
        availibility[partner.country].createEmailList(partner.email, date)
      );
    });

    let finalCountries = [];
    Object.keys(availibility).forEach((country) => {
      var availableDate = availibility[country].fetchFinalDate();
      if (availableDate) availableDate = availableDate.format("YYYY-MM-DD");
      let attendees = availibility[country].getItemByDate(availableDate) || [];
      finalCountries.push({
        attendeeCount: attendees.length,
        attendees,
        name: country,
        startDate: availableDate,
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
      "https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=56c9ab01aa79fc4d4a46dcc1a339",
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
    return (
      <ul>
        Success on POST Call Response - Please check the Network Tab in
        Developer tools for the Post Call and Response
      </ul>
    );
  }
}

export default ApiParser;
