class FormatDate {
  static toISO(date: Date): string {
    const formattedDate = date.toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return `${formattedDate}`;
  }
}
