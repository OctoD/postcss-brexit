import postcss from "postcss";
import { Maybe, Option } from "tiinvo";
import * as britishEnglish from "./fluent-british-english";

const pluginname = "🇬🇧   Brexit   🇬🇧";

export interface IBrexitOptions {
  noDeal?: boolean;
}

function createErrorsForNonBritishEnglishProperties(
  root: postcss.Root,
  result: postcss.Result,
  properties: britishEnglish.IBritishEnglish[]
) {
  properties.forEach(property =>
    walkDeclarationsAndFail(root, result, property.wrong)
  );
}

function createWarningForNonBritishEnglishProperties(
  root: postcss.Root,
  result: postcss.Result,
  properties: britishEnglish.IBritishEnglish[]
) {
  properties.forEach(property =>
    walkDeclarationsAndWarn(root, result, property.wrong)
  );
}

function createReplacementFunctionForCorrectBritishEnglishProperties(
  root: postcss.Root,
  result: postcss.Result,
  properties: britishEnglish.IBritishEnglish[]
) {
  properties.forEach(property =>
    walkDecl(root, result, property.correct, property.wrong)
  );
}

function createHardBrexitHandler(
  root: postcss.Root,
  result: postcss.Result,
  properties: britishEnglish.IBritishEnglish[]
) {
  return () => handleHardBrexit(root, result, properties);
}

function createSoftBrexitHandler(
  root: postcss.Root,
  result: postcss.Result,
  properties: britishEnglish.IBritishEnglish[]
) {
  return () => handleSoftBrexit(root, result, properties);
}

function handleHardBrexit(
  root: postcss.Root,
  result: postcss.Result,
  properties: britishEnglish.IBritishEnglish[]
) {
  createErrorsForNonBritishEnglishProperties(root, result, properties);
  createReplacementFunctionForCorrectBritishEnglishProperties(
    root,
    result,
    properties
  );
}

function handleSoftBrexit(
  root: postcss.Root,
  result: postcss.Result,
  properties: britishEnglish.IBritishEnglish[]
) {
  createWarningForNonBritishEnglishProperties(root, result, properties);
  createReplacementFunctionForCorrectBritishEnglishProperties(
    root,
    result,
    properties
  );
}

function replaceDecl(
  decl: postcss.Declaration,
  result: postcss.Result,
  nextPropertyName: string
) {
  decl.replaceWith(
    postcss.decl({
      prop: nextPropertyName,
      value: decl.value
    })
  );
}

function replaceFactory(
  nextPropertyName: string,
  result: postcss.Result
): (decl: postcss.Declaration) => any {
  return decl => replaceDecl(decl, result, nextPropertyName);
}

function walkDecl(
  root: postcss.Root,
  result: postcss.Result,
  previousCssProperty: string,
  replacementCssProperty: string
) {
  root.walkDecls(
    previousCssProperty,
    replaceFactory(replacementCssProperty, result)
  );
}

function walkDeclarationsAndFail(
  root: postcss.Root,
  result: postcss.Result,
  cssproperty: string
): void {
  root.walkDecls(cssproperty, decl => {
    console.log(cssproperty);
    throw decl.error(
      "🇬🇧   NO DEAL! American English Detected, this is not the correct British English you learned at school, so please comply to a better and more educated way of writing your CSS files.  Kind regards, the teacher.  🇬🇧",
      {
        plugin: pluginname,
        word: decl.prop
      }
    );
  });
}

function walkDeclarationsAndWarn(
  root: postcss.Root,
  result: postcss.Result,
  cssproperty: string
): void {
  root.walkDecls(cssproperty, decl => {
    decl.warn(result, "🇬🇧   Warning, American English Detected   🇬🇧", {
      from: Option(root.source!).mapOrElse(
        () => ``,
        source => source.input.file
      ),
      word: cssproperty
    });
  });
}

const brexitplugin = postcss.plugin<IBrexitOptions>(pluginname, options => {
  return (root, result) =>
    Maybe(options).cata({
      Nothing: createSoftBrexitHandler(
        root,
        result,
        britishEnglish.properties()
      ),
      Just: (val: IBrexitOptions) =>
        Maybe(val.noDeal).cata({
          Nothing: createSoftBrexitHandler(
            root,
            result,
            britishEnglish.properties()
          ),
          Just: createHardBrexitHandler(
            root,
            result,
            britishEnglish.properties()
          )
        })
    });
});

module.exports = brexitplugin;

export default brexitplugin;
