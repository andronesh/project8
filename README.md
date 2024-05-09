This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Init/migrate DB

First, export DB auth url

```bash
export DATABASE_URL=postgres://...
```

Then run migration

```bash
npx drizzle-kit push:pg
```

## Run the development server

```bash
npm run dev
```
