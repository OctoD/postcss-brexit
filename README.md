🇬🇧 post(css) brexit 🇬🇧
======================

> DISCLAIMER: this is a joke and does not want to be offensive to anyone, it's my way to laught at my worries about a hard Brexit

Put some correct British English into your CSS files before brexiting

# 🎉 Features

📦 This postcss plugin helps you to:

* write your CSS files in correct British English
* maybe makes you smile

# ⚙ Install

```bash
# npm
npm i postcss-brexit

# yarn
yarn add postcss-brexit
```

# 🔍 Usage

```ts
import postcss from 'postcss';
import brexit from 'postcss-brexit';

postcss(
  [
    brexit(
      {
        noDeal: true
      }
    )
  ]
).process(fs.readFileSync('./my-british-english-stylesheet.css'))
```

# What's next

Changing every single CSS property to correct British English (using genitive)

E.g.

```css
.Sky {
  background's colour: var(--sometimes-blue);
}
```

# ️❤️ Contributing

Every contribution is really welcome!

If you feel that something can be improved or should be fixed, feel free to open an issue with the feature or the bug found.

If you want to fork and open a pull request (adding features or fixes), feel free to do it. Remember only to use the `dev` branch as a base.

Read the [contributing guidelines](./CONTRIBUTING.md)

# 📃 Licence

Read the [licence](./LICENCE)
