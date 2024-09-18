![Image alt](https://github.com/KoroLev2512/120ReferralApp/blob/changes/public/Frame%20120block.png)
## 120Block: a new look at street culture

#### This is a referral telegram mini-app for the project 120block which is intended for creative people who want to find new acquaintances and monetize their creativity. With the help of the application, users will be able to invite their friends to join the movement, complete tasks and receive the first Ton-coins.

- [React documentation](https://nextjs.org/docs) to learn more info about stack.
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

## Development Server

[//]: # (Start the development server on `http://localhost:3002`:)

```bash
# npm
npm run dev
```

We use [ngrok](https://ngrok.com/) to test the application in Telegram. To do this, you need to [install ngrok](https://ngrok.com/docs/getting-started/) and run the command in the second terminal:
```bash
# nqrok
git checkout changes
ngrok http --domain=ant-logical-initially.ngrok-free.app 5173
```
## Pages

1. Welcome page (for new users)
2. Main page

## ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Status

At the moment, the project is under development. We are testing the MVP version on the [Referral 120 block](https://t.me/block_120bot/blockapp?startapp=rcZlIMXICd).

## Contacts

To contact about the project, you can write to [120Block team support](https://t.me/block_120sup).

## Gratitude

We are grateful to the React team for the React.js framework and Telegram team that we used to create this application.
