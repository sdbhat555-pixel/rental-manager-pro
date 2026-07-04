# 📱 Rental Manager Pro - Android APK Setup & Distribution Guide

## Quick Start

Your Rental Manager Pro app has been configured for Android using **Capacitor**, which wraps your React web app into a native Android application.

### What You Have

✅ **Capacitor Framework** - Web app wrapper for Android  
✅ **Android Project** - Complete native Android setup  
✅ **App Icons** - Professional dark navy & gold design  
✅ **Build Scripts** - Automated APK building  
✅ **Documentation** - Complete build guides  

## Prerequisites for Building

Before you can build the APK, install these on your development machine:

### 1. Java Development Kit (JDK)

**Windows/Mac/Linux:**
- Download from: https://www.oracle.com/java/technologies/downloads/
- Or use OpenJDK: `brew install openjdk@17` (Mac) or `sudo apt install openjdk-17-jdk` (Linux)
- Verify: `java -version` (should show version 11+)

### 2. Android SDK

**Option A: Android Studio (Recommended)**
- Download: https://developer.android.com/studio
- Install Android SDK Platform 31 or higher
- Set `ANDROID_HOME` environment variable

**Option B: Command Line Tools**
- Download: https://developer.android.com/studio#command-tools
- Extract and set `ANDROID_HOME` to the extraction directory

### 3. Node.js & npm/pnpm

- Download: https://nodejs.org/
- Verify: `node --version` && `npm --version`

## Building the APK

### Method 1: Using the Build Script (Easiest)

```bash
cd /home/ubuntu/rental-manager-pro
chmod +x build-apk.sh
./build-apk.sh
```

Follow the prompts to choose Debug or Release build.

### Method 2: Manual Build

```bash
# Step 1: Build web assets
cd /home/ubuntu/rental-manager-pro
pnpm build

# Step 2: Sync with Android
npx cap sync android

# Step 3: Build APK
cd android

# For Debug (testing)
./gradlew assembleDebug

# For Release (distribution)
./gradlew assembleRelease
```

### Output Locations

- **Debug APK:** `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK:** `android/app/build/outputs/apk/release/app-release.apk`

## Installing on Device/Emulator

### Using ADB (Android Debug Bridge)

```bash
# Install debug APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Or release APK
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Using Android Studio

1. Open Android Studio
2. Go to: Build → Select Build Variant → Debug/Release
3. Go to: Run → Run 'app'
4. Select your device/emulator

## Signing for Distribution

To publish on Google Play Store or distribute directly, you must sign your APK.

### Generate Signing Key

```bash
keytool -genkey -v -keystore rental-manager-pro.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias rental-manager-pro
```

**Save this information securely:**
- Keystore file: `rental-manager-pro.keystore`
- Keystore password: (you'll set this)
- Key alias: `rental-manager-pro`
- Key password: (you'll set this)

### Configure Signing in Gradle

Edit `android/app/build.gradle`:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('path/to/rental-manager-pro.keystore')
            storePassword 'YOUR_KEYSTORE_PASSWORD'
            keyAlias 'rental-manager-pro'
            keyPassword 'YOUR_KEY_PASSWORD'
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Build Signed APK

```bash
cd android
./gradlew assembleRelease
```

## Publishing on Google Play Store

### Step 1: Create Developer Account
- Go to: https://play.google.com/console
- Pay $25 one-time registration fee
- Complete your developer profile

### Step 2: Create App Listing

1. Click "Create app"
2. Fill in app details:
   - **App name:** Rental Manager Pro
   - **Default language:** English
   - **App category:** Business
   - **Content rating:** Appropriate for your app

### Step 3: Prepare Store Listing

1. **Screenshots:**
   - Minimum 2, maximum 8 per device type
   - Recommended: 1080x1920px for phones
   - Show key features of your app

2. **Description:**
   ```
   Rental Manager Pro - Smart. Simple. Secure.
   
   Manage your rental properties with ease. Track tenants, 
   record payments, monitor occupancy, and generate reports 
   all in one professional app.
   
   Features:
   - Property Management
   - Tenant Tracking
   - Payment Recording
   - Overdue Alerts
   - Analytics & Reports
   - Multi-channel Notifications
   ```

3. **Icon:**
   - 512x512px PNG
   - Use: `app-icon.png`

4. **Feature Graphic:**
   - 1024x500px
   - Banner image for store listing

### Step 4: Upload APK

1. Go to: Release → Production
2. Click "Create new release"
3. Upload your signed APK
4. Review and confirm

### Step 5: Submit for Review

1. Complete all required fields
2. Accept policies and agreements
3. Click "Submit for review"
4. Wait 24-48 hours for approval

## Alternative Distribution Methods

### Direct APK Distribution

1. Build and sign your APK
2. Host on a server (e.g., AWS S3, GitHub Releases)
3. Users download and install via:
   ```bash
   adb install rental-manager-pro.apk
   ```

### Alternative App Stores

- **Amazon Appstore:** https://developer.amazon.com/appstore
- **Samsung Galaxy Store:** https://seller.samsungapps.com
- **F-Droid:** https://f-droid.org/ (for open-source apps)

### Enterprise Distribution

For internal company use:
1. Sign APK with company certificate
2. Host on internal server
3. Distribute via MDM (Mobile Device Management)

## App Configuration

### Customize App Metadata

Edit `capacitor.config.ts`:

```typescript
const config: CapacitorConfig = {
  appId: 'com.rentalpro.app',              // Unique package ID
  appName: 'Rental Manager Pro',            // Display name
  webDir: 'dist/public',                    // Web assets
  server: {
    androidScheme: 'https',                 // Use HTTPS
    cleartext: false                        // Disable HTTP
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,             // Show splash for 3 seconds
      backgroundColor: '#001a4d',            // Dark navy background
      showSpinner: true,
      spinnerColor: '#ff9500'               // Gold spinner
    }
  }
};
```

### Add Android Permissions

Edit `android/app/src/main/AndroidManifest.xml`:

```xml
<!-- Internet access (required) -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Camera (if needed) -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Location (if needed) -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Notifications -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

<!-- Phone state (if needed) -->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```

### Customize App Icon

Replace icon files in:
- `android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png` (48x48)
- `android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png` (72x72)
- `android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png` (96x96)
- `android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png` (144x144)
- `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png` (192x192)

## Troubleshooting

### Build Fails with "Java Compiler Error"

**Solution:**
```bash
# Install JDK (not just JRE)
sudo apt-get install openjdk-17-jdk

# Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

### "Android SDK not found"

**Solution:**
```bash
# Set ANDROID_HOME
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### APK Installation Fails on Device

**Solutions:**
1. Uninstall previous version: `adb uninstall com.rentalpro.app`
2. Enable "Unknown Sources" in device settings
3. Check device storage space
4. Try debug APK first

### App Crashes on Startup

**Check logs:**
```bash
adb logcat | grep "com.rentalpro.app"
```

**Common issues:**
- Missing network permissions
- Incorrect web asset paths
- JavaScript errors in console

## Performance Optimization

### Reduce APK Size

```gradle
// In android/app/build.gradle
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

### Enable Minification

```gradle
buildTypes {
    release {
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

## Adding Native Features

Use Capacitor plugins to access native Android features:

```bash
# Camera
npm install @capacitor/camera
npx cap sync android

# Geolocation
npm install @capacitor/geolocation
npx cap sync android

# Notifications
npm install @capacitor/local-notifications
npx cap sync android
```

Usage in React:
```typescript
import { Camera } from '@capacitor/camera';

const photo = await Camera.getPhoto({
  quality: 90,
  allowEditing: true,
  resultType: CameraResultType.Uri
});
```

## Continuous Integration

### GitHub Actions Workflow

Create `.github/workflows/build-apk.yml`:

```yaml
name: Build APK

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build web assets
        run: pnpm build
      
      - name: Sync with Android
        run: npx cap sync android
      
      - name: Build APK
        run: cd android && ./gradlew assembleDebug
      
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-debug.apk
          path: android/app/build/outputs/apk/debug/app-debug.apk
```

## Support & Resources

- **Capacitor Documentation:** https://capacitorjs.com/docs
- **Android Developer Guide:** https://developer.android.com/guide
- **Google Play Console:** https://play.google.com/console
- **Gradle Documentation:** https://gradle.org/
- **Android Studio:** https://developer.android.com/studio

## Next Steps

1. ✅ Install prerequisites (JDK, Android SDK, Node.js)
2. ✅ Build debug APK using build script
3. ✅ Test on Android device/emulator
4. ✅ Fix any issues
5. ✅ Generate signing key
6. ✅ Build release APK
7. ✅ Create Google Play Developer account
8. ✅ Upload and publish on Google Play Store

## Success Checklist

- [ ] APK builds successfully
- [ ] APK installs on device
- [ ] App launches without errors
- [ ] All features work correctly
- [ ] Signing key generated
- [ ] Release APK signed
- [ ] Google Play account created
- [ ] App listing completed
- [ ] Screenshots uploaded
- [ ] APK uploaded to Play Store
- [ ] App submitted for review
- [ ] App approved and published

Congratulations! Your Rental Manager Pro Android app is ready for the world! 🚀
