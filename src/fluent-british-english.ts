export interface IBritishEnglish {
  correct: string;
  wrong: string;
}

function create(
  correctEnglishKey: string,
  restOfTheWorldEnglishKey: string
): IBritishEnglish {
  return {
    correct: correctEnglishKey,
    wrong: restOfTheWorldEnglishKey
  };
}

export const backgroundColour = create(`background-colour`, "background-color");
export const borderBottomColour = create(
  `border-bottom-colour`,
  "border-bottom-color"
);
export const borderColour = create(`border-colour`, "border-color");
export const borderLeftColour = create(
  `border-left-colour`,
  "border-left-color"
);
export const borderRightColour = create(
  `border-right-colour`,
  "border-right-color"
);
export const borderTopColour = create(`border-top-colour`, "border-top-color");
export const colour = create(`colour`, "color");
export const outlineColour = create(`outline-colour`, "outline-color");
export const textDecorationColour = create(
  `text-decoration-colour`,
  "text-decoration-color"
);

export function properties(): IBritishEnglish[] {
  return [
    backgroundColour,
    borderBottomColour,
    borderColour,
    borderLeftColour,
    borderRightColour,
    borderTopColour,
    colour,
    outlineColour,
    textDecorationColour
  ];
}
