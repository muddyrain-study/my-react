import { add } from ".";

describe("sum", () => {
  it("test sum result", () => {
    expect(add(2, 3)).toBe(5);
  });
});