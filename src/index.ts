import postcss from "postcss";
import { Maybe } from "tiinvo";

export interface IBrexitOptions {
  noDeal?: boolean;
}

function createHardBrexitHandler(root: postcss.Root) {
  return () => handleHardBrexit(root);
}

function createSoftBrexitHandler(root: postcss.Root) {
  return () => handleSoftBrexit(root);
}

function handle(root: postcss.Root) {
  walkDecl(root, "background-colour", "background-color");
  walkDecl(root, "colour", "color");
}

function handleHardBrexit(root: postcss.Root) {
  walkDeclAndFail(root, "background-color");
  walkDeclAndFail(root, "color");
  handle(root);
}

function handleSoftBrexit(root: postcss.Root) {
  walkDeclAndWarn(root, "background-color");
  walkDeclAndWarn(root, "color");
  handle(root);
}

function replaceDecl(decl: postcss.Declaration, nextPropertyName: string) {
  decl.replaceWith(
    postcss.decl({
      prop: nextPropertyName,
      value: decl.value
    })
  );
}

function replaceFactory(
  nextPropertyName: string
): (decl: postcss.Declaration) => any {
  return decl => replaceDecl(decl, nextPropertyName);
}

function walkDecl(
  root: postcss.Root,
  previousCssProperty: string,
  replacementCssProperty: string
) {
  root.walkDecls(previousCssProperty, replaceFactory(replacementCssProperty));
}

function walkDeclAndFail(root: postcss.Root, cssproperty: string): void {
  root.walkDecls(cssproperty, decl => {
    const error = new Error();

    error.name = "🇬🇧Britain, Britain, Britain🇬🇧";
    error.message = `🇬🇧Warning, American English Detected🇬🇧`;

    throw error;
  });
}

function walkDeclAndWarn(root: postcss.Root, cssproperty: string): void {
  root.walkDecls(cssproperty, decl => {
    console.warn(`🇬🇧Warning, American English Detected🇬🇧`);
  });
}

const brexitplugin = postcss.plugin<IBrexitOptions>("🇬🇧brexit🇬🇧", options => {
  return root =>
    Maybe(options).cata({
      Nothing: createSoftBrexitHandler(root),
      Just: (val: IBrexitOptions) =>
        Maybe(val.noDeal).cata({
          Nothing: createSoftBrexitHandler(root),
          Just: createHardBrexitHandler(root)
        })
    });
});

module.exports = brexitplugin;

export default brexitplugin;
