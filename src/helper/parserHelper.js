import moment from "moment";
import _ from "lodash";

class Parserhelper {
  constructor() {
    this.availability = [];
    this.days = 365;
    this.initialDate = moment("2017-01-01");

    for (let i = 0; i < this.days; i++) {
      this.availability.push([]);
    }
  }

  fetchFinalDate = () => {
    let maxCount = 0;
    let startDate = null;
    let previousCount = this.availability[0].length;

    for (let i = 1; i < this.days; i++) {
      let currentCount = this.availability[i].length;
      let twoDays = _.intersection(
        this.availability[i],
        this.availability[i - 1]
      );
      let attendingCount = twoDays.length;

      if (attendingCount > maxCount && currentCount > 0 && previousCount > 0) {
        maxCount = attendingCount;
        startDate = moment(this.initialDate).add(i - 1, "days");
      }

      previousCount = currentCount;
    }

    return startDate;
  };

  getItemByDate = (date) => this.availability[this.addIndex(moment(date))];
  addIndex = (date) => date.diff(this.initialDate, "days");
  createEmailList = (email, date) =>
    this.availability[this.addIndex(moment(date))].push(email);
}

export default Parserhelper;
