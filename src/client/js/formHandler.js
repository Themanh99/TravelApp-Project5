export function validateForm(data) {
  if (
    data.location == "" ||
    data.city == "" ||
    data.datestart == "" ||
    data.datend == ""
  ) {
    return false;
  }

  return true;
}
