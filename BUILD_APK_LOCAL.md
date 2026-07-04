# 📱 Rental Manager Pro - APK Build Guide (Local)

Since the sandbox environment doesn't have Android SDK, follow this guide to build the APK on your own computer.

---

## 🔧 Prerequisites

### Windows, Mac, or Linux

1. **Java JDK 11 or higher**
   - Download: https://www.oracle.com/java/technologies/downloads/
   - Or use OpenJDK: https://adoptopenjdk.net/

2. **Android Studio**
   - Download: https://developer.android.com/studio
   - Install and open it once to complete setup

3. **Node.js & pnpm**
   - Download Node.js: https://nodejs.org/ (v18+)
   - Install pnpm: `npm install -g pnpm`

---

## 📥 Step 1: Download Project Files

Download the entire project from the Manus dashboard or clone from your repository.

```bash
# Navigate to project directory
cd /path/to/rental-manager-pro
```

---

## 🔨 Step 2: Install Dependencies

```bash
# Install Node dependencies
pnpm install

# Build web assets
pnpm build

# Sync to Android
npx cap sync android
```

---

## ⚙️ Step 3: Set Up Android SDK Path

### Windows:
```bash
# Create local.properties in android folder
cd android
echo sdk.dir=C:\Users\YourUsername\AppData\Local\Android\Sdk > local.properties
```

### Mac/Linux:
```bash
cd android
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

**Or manually:**
1. Open `android/local.properties`
2. Add: `sdk.dir=/path/to/Android/Sdk`

---

## 🏗️ Step 4: Build APK

### Option A: Build Debug APK (for testing)

```bash
cd android
./gradlew assembleDebug
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Option B: Build Release APK (for distribution)

```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

---

## 📱 Step 5: Install on Phone

### Using ADB (Android Debug Bridge):

```bash
# Connect phone via USB
# Enable Developer Mode on phone (tap Build Number 7 times in Settings)
# Enable USB Debugging

# Install APK
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Using File Transfer:

1. Copy APK file to your phone
2. Open Files app on phone
3. Tap APK file
4. Tap "Install"

---

## 🐛 Troubleshooting

### "SDK location not found"
- Create `android/local.properties` with correct path
- Verify Android SDK is installed in Android Studio

### "Java not found"
- Install Java JDK
- Set JAVA_HOME environment variable

### "Gradle wrapper not found"
- Run: `cd android && chmod +x gradlew` (Mac/Linux)

### Build takes too long
- First build is slow (downloads dependencies)
- Subsequent builds are faster

---

## 📦 Release Build (for Google Play Store)

### Step 1: Create Signing Key

```bash
cd android/app

# Generate key (one time only)
keytool -genkey -v -keystore release.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias release

# Remember the password!
```

### Step 2: Configure Gradle

Edit `android/app/build.gradle`:

```gradle
signingConfigs {
    release {
        storeFile file('release.keystore')
        storePassword 'YOUR_PASSWORD'
        keyAlias 'release'
        keyPassword 'YOUR_PASSWORD'
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

### Step 3: Build Release APK

```bash
./gradlew assembleRelease
```

---

## 📤 Publish to Google Play Store

1. Create Google Play Developer account ($25 one-time fee)
2. Create new app listing
3. Upload signed APK
4. Fill in app details
5. Submit for review

---

## 📋 App Details

- **App Name:** Rental Manager Pro
- **Package ID:** com.rentalpro.app
- **Version:** 1.0.0
- **Min SDK:** 21 (Android 5.0)
- **Target SDK:** 34 (Android 14)

---

## 🎯 Next Steps

1. ✅ Download and extract project
2. ✅ Install prerequisites
3. ✅ Build APK locally
4. ✅ Test on device
5. ✅ Publish to Play Store (optional)

---

## 📞 Support

For issues:
1. Check Android Studio console for error messages
2. Verify all paths are correct
3. Ensure Java and Android SDK are installed
4. Try: `./gradlew clean` then rebuild

---

**Happy building! 🚀**

Developed by Shahid Ibn Rashid
