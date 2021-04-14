export default (n) => {
  function subtractDaysToDate(days) {
    let res = new Date();
    res.setDate(res.getDate() - days);
    return res;
  }
  let nova = subtractDaysToDate(n);
  let final =
    nova.getFullYear() +
    "-" +
    ("0" + (nova.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + nova.getDate()).slice(-2);
  return final;
};
