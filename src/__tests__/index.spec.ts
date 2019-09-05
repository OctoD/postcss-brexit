import postcss from "postcss";
import brexit from "../index";
import * as english from "../fluent-british-english";

describe(`mylib`, () => {
  it(`Tests a soft brexit scenario`, async () => {
    const css = `
      .brexit {
        background-colour: white;
        colour: blue;
      }
    `;
    const notsobritishcss = `
      .brexit {
        background-color: white;
        colour: blue;
      }
    `;

    const plugins = [brexit({ noDeal: false })];
    const result = await postcss(plugins).process(css);

    expect(
      async () => await postcss(plugins).process(notsobritishcss)
    ).not.toThrowError();

    const notsobritishresult = await postcss(plugins).process(notsobritishcss);

    expect(result.messages.length).toBe(0);
    expect(notsobritishresult.warnings().length).toBeGreaterThan(0);
  });

  it(`Tests a hard brexit scenario`, async () => {
    const css = `
      .brexit {
        background-colour: white;
        colour: blue;
      }
    `;

    const plugins = [brexit({ noDeal: true })];
    const result = await postcss(plugins).process(css);

    expect(result.messages.length).toBe(0);
  });

  english.properties().forEach(async property => {
    test(property.correct, async () => {
      const css = `
        .test {
          ${property.correct}: red;
        }
      `;

      const result = await postcss([brexit()]).process(css);

      expect(result.css.includes(property.correct)).toBeFalsy();
      expect(result.css.includes(property.wrong)).toBeTruthy();
    });
  });
});
