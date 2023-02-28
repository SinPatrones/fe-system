function formatDate(date, toInput = false) {
  const [day, month, year] = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    //timeStyle: "long",
    timeZone: "America/Lima",
  })
    .format(new Date(date))
    .split("/");

  if (toInput){
    return `${year}-${month}-${day}`;
  }
  return `${day}/${month}/${year}`;
}

export default formatDate;
