import { validateForm } from "../js/formHandler";
describe("validateForm function", () => {
  it("should return true for valid data", () => {
    const data = {
      location: "Some Location",
      city: "Some City",
      datestart: "2023-10-16",
      datend: "2023-10-20",
    };
    const result = validateForm(data);
    expect(result).toBe(true);
  });

  it("should return false if any field is empty", () => {
    const emptyData = {
      location: "",
      city: "Some City",
      datestart: "2023-10-16",
      datend: "2023-10-20",
    };
    const result = validateForm(emptyData);
    expect(result).toBe(false);
  });

  // Add more test cases as needed
});
