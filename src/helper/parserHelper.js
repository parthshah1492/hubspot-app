import moment from "moment";
import _ from "lodash";

class Parserhelper {
  constructor() {
    this.dates = [];
    this.days = 366;
    this.beginningOfYear = moment("2017-01-01");

    for (let i = 0; i < this.days; i++) {
      this.dates.push([]);
    }
  }

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
}

export default Parserhelper;
