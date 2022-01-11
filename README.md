# Alchemy code challenge

## Intro

This project was bootstrapped with [Remix](https://remix.run/)

Other tools used are:
[Typescript](https://www.typescriptlang.org/).  
[TailwindCSS](https://tailwindcss.com/) for styling.

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

The app is configured to automatically be deployed using [Vercel](https://vercel.com/).

## Approachs

The challenge was addressed following 2 different approachs.

### `Using React-dnd`

Demo: [Alchemy react-dnd demo](https://alchemy.marianoarg.dev/)

The first one was using the [react-dnd](https://react-dnd.github.io/react-dnd/about) library.

This is the most complete version of the challenge.

The issue with this approach was setting the right position after dropping the shape into the canvas. After dealing with a couple of hours with this issue without any luck, I've decided to try a different library.

### `Using Dnd-kit`

Demo: [Alchemy dnd-kit demo](https://alchemy-test-ic10x7wew-marianoarg.vercel.app/)

In this approach I changed the app state management, migrating the whole state to a context and consuming it where necessary.
This is the less achieved approach, with different issues like shape positioning and being unable to delete them.
