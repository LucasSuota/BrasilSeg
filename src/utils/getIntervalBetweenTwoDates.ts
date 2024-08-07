export class GetInterval {
  static getIntervalBetweenTwoDates(
    date1: Date,
    date2: Date
  ): { month: string; year: string }[] {
    const startMonth = date1.getMonth() + 1;
    const startYear = date1.getFullYear();
    const endMonth = date2.getMonth() + 1;
    const endYear = date2.getFullYear();

    const monthsArray = [];
    let currentMonth = startMonth;
    let currentYear = startYear;

    while (
      currentYear < endYear ||
      (currentYear === endYear && currentMonth <= endMonth)
    ) {
      monthsArray.push({
        month: currentMonth.toString(),
        year: currentYear.toString(),
      });
      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
    }

    return monthsArray;
  }
}
