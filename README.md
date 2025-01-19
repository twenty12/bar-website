# Getting starting

This is a TypeScript, React, and Vite app. It is deployed using Vercel. Vercel also provides a tool for running the entire app. To start the app locally run
`vercel dev` or `npm run dev`

To deploy the app, push the to `main` branch of the repo.

Us `yarn build` to find all type errors before deploying.

# Weirdnes with `vercel.json`
for some reason this is what the file needs to look like locally to work
```
{
  "version": 2,
  "rewrites": [
  ]
}
```
and when deployed it needs to look like this
```
{
  "version": 2,
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```
So just be careful nto to commit changes in that when running locally

# image handling
Mostly served by app, a couple videos are uploaded to daniels personal S3.

## Setting Up Environment Variables for Local Development

Follow these steps to configure environment variables for local development when using `vercel dev`.

1. Run the following command to add your environment variables to Vercel: `vercel env add`
2. Then after the env has been added, run: `vercel env pull .env.local`