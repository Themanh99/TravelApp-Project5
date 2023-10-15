const json = require("../mockAPI");

describe("json module", () => {
  it("should have a title property", () => {
    expect(json).toHaveProperty("title");
  });

  it("should have a message property", () => {
    expect(json).toHaveProperty("message");
  });

  it("should have a time property", () => {
    expect(json).toHaveProperty("time");
  });

  it("should have the correct values", () => {
    expect(json.title).toBe("test json response");
    expect(json.message).toBe("this is a message");
    expect(json.time).toBe("now");
  });
});
