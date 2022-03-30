import { DateAsAgoPipe } from "./dateAgo.pipe";
describe("Pipe: DateAsAgoPipe", () => {
  it("if no value", () => {
    let dateAgoPipe = new DateAsAgoPipe();
    expect(dateAgoPipe.transform("")).toEqual("a long time ago");
  });
});
