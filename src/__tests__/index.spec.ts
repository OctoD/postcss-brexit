import postcss from "postcss";
import brexit from "../index";

describe(`mylib`, () => {
  //#region placeholder
  it(`Tests a soft brexit scenario`, async () => {
    const css = `
      .brexit {
        background-colour: white;
        colour: blue;
      }
    `;

    expect(
      async () => await postcss([brexit()]).process(css)
    ).not.toThrowError();
    const result = await postcss([brexit()]).process(css);

    expect(result.messages.length).toBe(0);
  });
  //#endregion
});
