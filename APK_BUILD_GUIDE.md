# Rental Manager Pro - Android APK Build Guide

## Overview

This guide explains how to build and distribute your Rental Manager Pro Android APK. The project has been set up with Capacitor, which wraps your web app into a native Android application.

## Project Structure

```
rental-manager-pro/
├── capacitor.config.ts          # Capacitor configuration
├── android/                      # Android native project
│   ├── app/
│   │   ├── build.gradle         # Android build configuration
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/            # Java source code
│   │   │   └── res/             # Resources (icons, layouts, etc.)
│   │   └── gradlew              # Gradle wrapper
├── dist/public/                  # Built web assets
└── app-icon.png                 # Generated app icon
```

## Prerequisites

Before building the APK, ensure you have:

1. **Java Development Kit (JDK)** - Version 11 or higher
   ```bash
   java -version
   ```

2. **Android SDK** - Installed and configured
   - Download from: https://developer.android.com/studio
   - Set `ANDROID_HOME` environment variable
   - Install SDK Platform for Android API level 31+

3. **Gradle** - Usually comes with Android Studio
   - The project includes a Gradle wrapper (`gradlew`)

## Build Steps

### Step 1: Prepare the Web Assets

```bash
cd /home/ubuntu/rental-manager-pro
pnpm build
```

This creates optimized web assets in `dist/public/`.

### Step 2: Sync with Android Project

```bash
npx cap sync android
```

This copies the web assets to the Android project.

### Step 3: Build Debug APK

For development and testing:

```bash
cd android
./gradlew assembleDebug
```

The debug APK will be created at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Step 4: Build Release APK

For production distribution:

```bash
cd android
./gradlew assembleRelease
```

The release APK will be created at:
```
android/app/build/outputs/apk/release/app-release.apk
```

**Note:** Release builds require signing with a keystore. See "Signing" section below.

## Signing the APK

To distribute your app on Google Play Store or other platforms, you need to sign it with a keystore.

### Generate a Keystore

```bash
keytool -genkey -v -keystore rental-manager-pro.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias rental-manager-pro
```

This will prompt you for:
- Keystore password
- Key password
- Your name, organization, etc.

### Configure Signing in build.gradle

Edit `android/app/build.gradle` and add:

```gradle
signingConfigs {
    release {
        storeFile file('path/to/rental-manager-pro.keystore')
        storePassword 'your_keystore_password'
        keyAlias 'rental-manager-pro'
        keyPassword 'your_key_password'
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### Build Signed Release APK

```bash
cd android
./gradlew assembleRelease
```

## App Configuration

### App Metadata

Edit `capacitor.config.ts` to customize:

```typescript
const config: CapacitorConfig = {
  appId: 'com.rentalpro.app',           // Unique package ID
  appName: 'Rental Manager Pro',         // App display name
  webDir: 'dist/public',                 // Web assets directory
  server: {
    androidScheme: 'https'               // Use HTTPS
  }
};
```

### Android Manifest

Edit `android/app/src/main/AndroidManifest.xml` to add permissions:

```xml
<!-- Internet access -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Camera (if needed) -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Location (if needed) -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

<!-- Notifications -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

### App Icon

The app icon has been generated and placed in:
- `android/app/src/main/res/mipmap-*/ic_launcher_foreground.png`

To customize:
1. Replace the PNG files with your own icons
2. Ensure icons are in the correct sizes for each DPI:
   - mdpi: 48x48
   - hdpi: 72x72
   - xhdpi: 96x96
   - xxhdpi: 144x144
   - xxxhdpi: 192x192

## Installation & Testing

### Install on Device/Emulator

```bash
# Debug APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Release APK
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Run on Emulator

```bash
cd android
./gradlew installDebug
```

## Troubleshooting

### Java Compiler Error

If you get: "Toolchain installation does not provide the required capabilities: [JAVA_COMPILER]"

Solution: Ensure you have JDK (not just JRE) installed:
```bash
sudo apt-get install openjdk-17-jdk
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

### Android SDK Not Found

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### Gradle Build Fails

Try cleaning the build:
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

## Distribution

### Google Play Store

1. Create a Google Play Developer account
2. Sign your APK with a keystore
3. Create an app listing
4. Upload the signed APK
5. Fill in app details and submit for review

### Direct Distribution

1. Build and sign the release APK
2. Host the APK on a server
3. Users can download and install via:
   ```bash
   adb install rental-manager-pro.apk
   ```

### Alternative Stores

- Amazon Appstore
- Samsung Galaxy Store
- F-Droid (for open-source apps)

## Performance Optimization

### Code Minification

Enable ProGuard in `android/app/build.gradle`:

```gradle
buildTypes {
    release {
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### App Size Reduction

1. Use WebP format for images
2. Enable compression in build.gradle:
   ```gradle
   android {
       bundle {
           density {
               enableSplit = true
           }
           abi {
               enableSplit = true
           }
       }
   }
   ```

## Native Features

To add native Android features, use Capacitor plugins:

```bash
# Add camera plugin
npm install @capacitor/camera
npx cap sync android

# Add geolocation plugin
npm install @capacitor/geolocation
npx cap sync android
```

Then use in your React code:
```typescript
import { Camera } from '@capacitor/camera';

const photo = await Camera.getPhoto({
  quality: 90,
  allowEditing: true,
  resultType: CameraResultType.Uri
});
```

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/build-apk.yml`:

```yaml
name: Build APK

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - uses: actions/setup-java@v2
        with:
          java-version: '17'
      - run: npm install
      - run: npm run build
      - run: npx cap sync android
      - run: cd android && ./gradlew assembleRelease
      - uses: actions/upload-artifact@v2
        with:
          name: app-release.apk
          path: android/app/build/outputs/apk/release/app-release.apk
```

## Support & Resources

- Capacitor Docs: https://capacitorjs.com/docs
- Android Developer Guide: https://developer.android.com/guide
- Gradle Documentation: https://gradle.org/
- React Native Web: https://necolas.github.io/react-native-web/

## Next Steps

1. Build the debug APK and test on your device
2. Set up signing for release builds
3. Configure app metadata and permissions
4. Test all features thoroughly
5. Prepare for distribution on Google Play Store

Good luck with your Rental Manager Pro Android app! 🚀
