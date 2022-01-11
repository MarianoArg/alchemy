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

## Dnd-kit Implementation

**Demo**: [Alchemy dnd-kit demo](https://alchemy-test-ic10x7wew-marianoarg.vercel.app/).  

In this approach I changed the app state management, migrating the whole state to a context and consuming it where necessary.
This is the less achieved approach, with different issues like shape positioning and being unable to delete them.
