import postcss from "postcss";
import { EitherLike, Left, Right } from "tiinvo";

export interface IBrexitOptions {
  noDeal?: boolean;
}

function replaceFactory(
  nextPropertyName: string
): (decl: postcss.Declaration) => any {
  return decl => {
    decl.replaceWith(
      postcss.decl({ prop: nextPropertyName, value: decl.value })
    );
  };
}

module.exports = postcss.plugin<IBrexitOptions>("🇬🇧brexit🇬🇧", options => {
  return root => {
    root.walkDecls("background-colour", replaceFactory("background-color"));
    root.walkDecls("colour", replaceFactory("color"));
  };
});
