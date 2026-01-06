# NextJS app

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

# Expo app

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Commands

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Rebuild clean

   ```
   npx expo prebuild --clean
   npx expo run:android
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Install fully packed app on device

```bash
npx expo run:android --device --variant release
```

```bash
npx expo run:ios --device --configuration Release
```
