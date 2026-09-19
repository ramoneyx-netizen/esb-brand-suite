# ESB Brand Suite mobile app

A cross-platform iOS and Android starter built with Expo and React Native. It provides the ESB creative-studio home experience with brand tools and an AI brief flow ready to connect to the existing Gemini backend.

## Run locally

```bash
npm install
npx expo start
```

Then press `i` for iOS Simulator, `a` for Android Emulator, or scan the QR code with Expo Go.

## Build for stores

Install EAS CLI and authenticate with Expo:

```bash
npm install -g eas-cli
eas build:configure
eas build --platform all
```

Before production release, replace the placeholder bundle identifiers in `app.json`, add app icons/splash assets, and connect the Generate actions to a protected server endpoint. Never ship a Gemini API key in the mobile app.
