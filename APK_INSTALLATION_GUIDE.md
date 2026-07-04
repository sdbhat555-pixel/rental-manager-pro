# 📱 Rental Manager Pro - APK Installation & Deployment Guide

## Complete Guide to Building, Installing, and Distributing Your APK

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Building the APK](#building-the-apk)
3. [Installing on Android Device](#installing-on-android-device)
4. [Testing the App](#testing-the-app)
5. [Publishing to Google Play Store](#publishing-to-google-play-store)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

#### 1. **Java Development Kit (JDK)**
- **Download:** https://www.oracle.com/java/technologies/downloads/
- **Version:** JDK 11 or higher
- **Verify Installation:**
  ```bash
  java -version
  javac -version
  ```

#### 2. **Android Studio**
- **Download:** https://developer.android.com/studio
- **Installation:** Follow official guide
- **First Launch:** Complete SDK setup wizard
- **Verify Installation:**
  ```bash
  echo $ANDROID_HOME
  ```

#### 3. **Node.js & pnpm**
- **Download Node.js:** https://nodejs.org/ (v18+)
- **Install pnpm:**
  ```bash
  npm install -g pnpm
  ```

#### 4. **Git (Optional but Recommended)**
- **Download:** https://git-scm.com/

### System Requirements

- **Windows:** Windows 10 or later, 8GB RAM minimum
- **Mac:** macOS 10.14 or later, 8GB RAM minimum
- **Linux:** Ubuntu 18.04 or later, 8GB RAM minimum

---

## Building the APK

### Step 1: Set Up Environment Variables

#### Windows (Command Prompt):
```batch
set JAVA_HOME=C:\Program Files\Java\jdk-17
set ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools
```

#### Mac/Linux (Terminal):
```bash
export JAVA_HOME=$(/usr/libexec/java_home)
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
```

### Step 2: Create local.properties

Navigate to the `android` folder and create `local.properties`:

#### Windows:
```bash
cd android
echo sdk.dir=C:\Users\YourUsername\AppData\Local\Android\Sdk > local.properties
```

#### Mac/Linux:
```bash
cd android
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

### Step 3: Install Dependencies

```bash
# Go to project root
cd /path/to/rental-manager-pro

# Install Node dependencies
pnpm install

# Build web assets
pnpm build

# Sync to Android
npx cap sync android
```

### Step 4: Build Debug APK

```bash
cd android
./gradlew assembleDebug
```

**Output Location:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**Build Time:** First build takes 5-10 minutes, subsequent builds are faster.

### Step 5: Build Release APK (for Distribution)

#### Create Signing Key (One-time only):

```bash
cd android/app

# Generate keystore
keytool -genkey -v -keystore release.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 -alias release

# You'll be prompted for:
# - Keystore password (remember this!)
# - Key password (can be same as keystore)
# - Your name, organization, etc.
```

#### Configure Gradle for Signing:

Edit `android/app/build.gradle` and add:

```gradle
signingConfigs {
    release {
        storeFile file('release.keystore')
        storePassword 'YOUR_KEYSTORE_PASSWORD'
        keyAlias 'release'
        keyPassword 'YOUR_KEY_PASSWORD'
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

#### Build Release APK:

```bash
cd android
./gradlew assembleRelease
```

**Output Location:**
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## Installing on Android Device

### Method 1: Using ADB (Recommended)

#### Prerequisites:
- Android phone connected via USB
- USB Debugging enabled on phone
- ADB installed and in PATH

#### Enable USB Debugging on Phone:

1. Go to **Settings**
2. Tap **About Phone**
3. Tap **Build Number** 7 times
4. Go back to Settings
5. Find **Developer Options**
6. Enable **USB Debugging**

#### Install APK:

```bash
# List connected devices
adb devices

# Install debug APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Or install release APK
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Method 2: File Transfer

1. Copy APK file to your phone via USB cable
2. Open **Files** app on phone
3. Navigate to Downloads folder
4. Tap the APK file
5. Tap **Install**
6. Grant permissions if prompted

### Method 3: Email/Cloud

1. Email the APK to yourself
2. Open email on phone
3. Download the attachment
4. Tap to install

---

## Testing the App

### Pre-Launch Testing

- [ ] App launches without crashes
- [ ] Splash screen displays correctly
- [ ] Login/authentication works
- [ ] Dashboard loads properly
- [ ] All navigation works
- [ ] Data displays correctly
- [ ] Forms submit successfully
- [ ] Notifications appear
- [ ] Settings are saved
- [ ] Logout works

### Device Testing

Test on multiple devices:
- [ ] Phone (small screen)
- [ ] Tablet (large screen)
- [ ] Different Android versions (API 21+)
- [ ] Different screen densities (hdpi, xhdpi, xxhdpi)

### Performance Testing

- [ ] App starts quickly (< 3 seconds)
- [ ] No memory leaks
- [ ] Battery usage is reasonable
- [ ] Network requests are efficient

---

## Publishing to Google Play Store

### Step 1: Create Google Play Developer Account

1. Go to https://play.google.com/console
2. Sign in with Google account
3. Pay $25 registration fee
4. Complete account setup

### Step 2: Create App Listing

1. Click **Create app**
2. Enter app name: "Rental Manager Pro"
3. Select category: "Business" or "Productivity"
4. Fill in app description
5. Add screenshots (minimum 2)
6. Add app icon (512x512 PNG)
7. Add feature graphic (1024x500 PNG)

### Step 3: Upload APK

1. Go to **Release** → **Production**
2. Click **Create new release**
3. Upload signed release APK
4. Fill in release notes
5. Review and publish

### Step 4: Complete Store Listing

- [ ] App title (50 characters max)
- [ ] Short description (80 characters max)
- [ ] Full description (4000 characters max)
- [ ] Screenshots (2-8 images)
- [ ] Feature graphic
- [ ] Icon (512x512)
- [ ] Content rating questionnaire
- [ ] Privacy policy URL
- [ ] Contact email

### Step 5: Review & Publish

1. Review all information
2. Accept Google Play policies
3. Submit for review
4. Wait for approval (usually 1-3 hours)

---

## Troubleshooting

### Build Issues

#### "SDK location not found"
```bash
# Create local.properties in android folder
echo "sdk.dir=/path/to/Android/Sdk" > android/local.properties
```

#### "Java not found"
```bash
# Set JAVA_HOME
export JAVA_HOME=/path/to/jdk
```

#### "Gradle wrapper not found"
```bash
# Make script executable (Mac/Linux)
chmod +x android/gradlew
```

### Installation Issues

#### "App not installed"
- Ensure device has enough storage
- Try uninstalling old version first
- Check Android version compatibility

#### "USB Debugging not working"
- Reconnect USB cable
- Try different USB port
- Update phone drivers
- Restart phone and computer

### Runtime Issues

#### "App crashes on startup"
- Check logcat for errors: `adb logcat`
- Verify all permissions in AndroidManifest.xml
- Check network connectivity

#### "Login not working"
- Verify internet connection
- Check authentication server
- Clear app cache: `adb shell pm clear com.rentalpro.app`

---

## APK Optimization Tips

### Reduce APK Size

1. **Enable ProGuard/R8:**
   ```gradle
   minifyEnabled true
   ```

2. **Remove unused resources:**
   ```gradle
   shrinkResources true
   ```

3. **Use vector drawables instead of PNG**

4. **Split APK by density:**
   ```gradle
   enableSplit = true
   ```

### Improve Performance

1. **Lazy load modules**
2. **Optimize images**
3. **Use ProGuard for code obfuscation**
4. **Enable multidex if needed**

---

## Distribution Channels

### 1. Google Play Store
- Largest audience
- Built-in update system
- Monetization options
- Review process required

### 2. Samsung Galaxy Store
- For Samsung devices
- Similar to Google Play
- Separate submission

### 3. Amazon Appstore
- For Kindle devices
- Alternative to Google Play

### 4. Direct Distribution
- Host APK on website
- Send via email
- Share via cloud storage
- No review process

---

## Security Best Practices

- [ ] Use HTTPS for all API calls
- [ ] Never hardcode API keys
- [ ] Implement certificate pinning
- [ ] Use ProGuard for code obfuscation
- [ ] Enable app signing
- [ ] Keep dependencies updated
- [ ] Regular security audits

---

## Support & Resources

- **Android Documentation:** https://developer.android.com/
- **Google Play Console:** https://play.google.com/console
- **Capacitor Documentation:** https://capacitorjs.com/
- **Stack Overflow:** https://stackoverflow.com/questions/tagged/android

---

## Checklist Before Publishing

- [ ] App tested on multiple devices
- [ ] All features working correctly
- [ ] No crashes or errors
- [ ] Performance optimized
- [ ] Privacy policy created
- [ ] Terms of service created
- [ ] Screenshots prepared
- [ ] App icon finalized
- [ ] Release notes written
- [ ] Signing key created and backed up
- [ ] Version number incremented

---

## Quick Commands Reference

```bash
# Build commands
pnpm build                          # Build web assets
npx cap sync android               # Sync to Android
./gradlew assembleDebug            # Build debug APK
./gradlew assembleRelease          # Build release APK

# Installation commands
adb devices                         # List connected devices
adb install app-debug.apk          # Install APK
adb uninstall com.rentalpro.app   # Uninstall app
adb logcat                          # View logs

# Cleaning commands
./gradlew clean                     # Clean build
rm -rf android/app/build           # Remove build artifacts
```

---

**Happy Publishing! 🚀**

For more information, visit: https://developer.android.com/

Developed by Shahid Ibn Rashid
