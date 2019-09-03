import postcss from "postcss";
import { EitherLike, Left, Right } from "tiinvo";

export interface IBrexitOptions {
  noDeal?: boolean;
}

interface IPropertiesDictionary {}

function shouldCheck(
  property: string,
  propertiesDictionary: IPropertiesDictionary
): EitherLike<boolean, boolean> {
  return property in propertiesDictionary ? Left(false) : Right(true);
}

function walkDeclarations(decl: postcss.Declaration, index: number): any {}

module.exports = postcss.plugin<IBrexitOptions>("🇬🇧brexit🇬🇧", options => {
  return (root, result) => {
    root.walkDecls("*", walkDeclarations);
  };
});
