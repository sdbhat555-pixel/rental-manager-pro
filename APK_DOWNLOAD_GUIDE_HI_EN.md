# 📱 Rental Manager Pro - APK Download & Build Guide
# 📱 Rental Manager Pro - APK डाउनलोड और बिल्ड गाइड

---

## 🚀 QUICK START (सबसे तेज़ तरीका)

### **English:**

Your Rental Manager Pro app is ready to be built into an APK. Follow these steps on your computer:

### **Hindi:**

आपका Rental Manager Pro app APK में बनाने के लिए तैयार है। अपने computer पर ये steps follow करें:

---

## 📋 STEP 1: Prerequisites Install करें

### **Windows पर:**

#### 1.1 Java JDK Install करें
```
1. https://www.oracle.com/java/technologies/downloads/ पर जाएं
2. "JDK 17" download करें (Windows x64)
3. Install करें और "Next" दबाते रहें
4. Installation path याद रखें (usually: C:\Program Files\Java\jdk-17)
```

#### 1.2 Android Studio Install करें
```
1. https://developer.android.com/studio पर जाएं
2. "Download Android Studio" दबाएं
3. Install करें
4. First launch में:
   - "Next" दबाएं
   - "Standard" setup चुनें
   - Android SDK install होगा
5. Installation complete होने का wait करें (10-15 minutes)
```

#### 1.3 Environment Variables Set करें
```
1. Windows Search में "Environment Variables" type करें
2. "Edit the system environment variables" खोलें
3. "Environment Variables..." button दबाएं
4. "New..." दबाएं और ये add करें:

   Variable Name: JAVA_HOME
   Variable Value: C:\Program Files\Java\jdk-17
   
   Variable Name: ANDROID_HOME
   Variable Value: C:\Users\YourUsername\AppData\Local\Android\Sdk

5. "OK" दबाएं
6. Computer restart करें
```

---

### **Mac पर:**

#### 1.1 Homebrew Install करें (अगर नहीं है)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### 1.2 Java और Android Studio Install करें
```bash
brew install openjdk@17
brew install android-studio
```

#### 1.3 Environment Variables Set करें
```bash
# Terminal खोलें और ये commands run करें:

echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
echo 'export ANDROID_HOME=$HOME/Library/Android/Sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools' >> ~/.zshrc

source ~/.zshrc
```

---

### **Linux (Ubuntu/Debian) पर:**

```bash
# Terminal खोलें और ये commands run करें:

# Java install करें
sudo apt-get update
sudo apt-get install -y openjdk-17-jdk

# Android Studio download करें
# https://developer.android.com/studio से download करें
# या terminal से:
wget https://redirector.gstatic.com/android/studio/install/2024.1.1.12/android-studio-2024.1.1.12-linux.tar.gz
tar -xzf android-studio-2024.1.1.12-linux.tar.gz
./android-studio/bin/studio.sh

# Environment variables set करें
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
echo 'export ANDROID_HOME=$HOME/Android/Sdk' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools' >> ~/.bashrc

source ~/.bashrc
```

---

## ✅ STEP 2: Prerequisites Verify करें

### **सभी platforms पर:**

```bash
# Terminal/Command Prompt खोलें और ये commands run करें:

# Java check करें
java -version
# Output: openjdk version "17..." या similar

# Javac check करें
javac -version
# Output: javac 17...

# Android SDK check करें
adb --version
# Output: Android Debug Bridge version...
```

अगर कोई भी command काम न करे तो environment variables फिर से set करें।

---

## 🔨 STEP 3: APK Build करें

### **सभी platforms पर:**

```bash
# 1. Project folder में जाएं
cd /path/to/rental-manager-pro

# 2. Web assets build करें
pnpm build

# 3. Android के साथ sync करें
npx cap sync android

# 4. Android folder में जाएं
cd android

# 5. APK build करें (Debug - for testing)
./gradlew assembleDebug

# या Release APK (for distribution)
./gradlew assembleRelease
```

**Build time:** 5-15 minutes (पहली बार ज़्यादा time लगता है)

---

## 📥 STEP 4: APK Download करें

### **Debug APK Location:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### **Release APK Location:**
```
android/app/build/outputs/apk/release/app-release.apk
```

APK file को किसी safe location पर copy करें।

---

## 📱 STEP 5: Android Phone पर Install करें

### **तरीका 1: USB Cable से (सबसे आसान)**

```
1. Android phone को USB cable से computer से connect करें
2. Phone पर "File Transfer" mode enable करें
3. APK file को phone में copy करें
4. Phone के Files app में जाएं
5. APK file पर tap करें
6. "Install" दबाएं
7. "Open" दबाएं
8. App launch होगा!
```

### **तरीका 2: ADB से (Advanced)**

```bash
# Terminal/Command Prompt में:

# Phone को check करें
adb devices

# APK install करें
adb install android/app/build/outputs/apk/debug/app-debug.apk

# या
adb install android/app/build/outputs/apk/release/app-release.apk
```

### **तरीका 3: Google Drive से**

```
1. APK file को Google Drive पर upload करें
2. Phone में Google Drive app खोलें
3. APK file को download करें
4. Files app से install करें
```

---

## ⚙️ Phone Settings Configure करें

### **Step 1: Unknown Sources Enable करें**

```
Settings → Security → Unknown Sources → Enable
```

या

```
Settings → Apps & notifications → Special app access → 
Install unknown apps → Choose your file manager → Allow
```

### **Step 2: Developer Mode Enable करें (Optional)**

```
Settings → About Phone → Build Number (7 बार tap करें)
Settings → Developer Options → USB Debugging (Enable करें)
```

---

## 🎯 App Launch करें

```
1. Home screen पर "Rental Manager Pro" icon ढूंढें
2. Tap करें
3. 3 seconds splash screen दिखेगी
4. Login screen आएगी
5. App use करना शुरू करें!
```

---

## 🆘 Troubleshooting

### **Problem: "command not found" error**

**Solution:**
```bash
# Environment variables फिर से set करें
# Windows: System Properties में जाएं
# Mac/Linux: ~/.bashrc या ~/.zshrc में add करें

export JAVA_HOME=/path/to/java
export ANDROID_HOME=/path/to/android/sdk
```

### **Problem: "SDK location not found"**

**Solution:**
```bash
# Android Studio खोलें
# Tools → SDK Manager
# SDK Platforms tab में Android API 31+ install करें
```

### **Problem: Build fails with "Out of memory"**

**Solution:**
```bash
# android/gradle.properties में add करें:
org.gradle.jvmargs=-Xmx4096m
```

### **Problem: Phone doesn't recognize APK**

**Solution:**
```
1. Phone को restart करें
2. Unknown Sources फिर से enable करें
3. USB cable change करके try करें
4. Phone storage space check करें (कम से कम 100MB free)
```

### **Problem: App crashes on launch**

**Solution:**
```
1. Phone में Chrome खोलें
2. https://rentalpro-lpavews4.manus.space पर जाएं
3. Check करें कि web version काम कर रहा है या नहीं
4. अगर web version काम कर रहा है तो APK rebuild करें
```

---

## 📊 APK File Information

```
App Name: Rental Manager Pro
Package ID: com.rentalpro.app
Version: 1.0
Debug APK Size: ~50-80 MB
Release APK Size: ~40-60 MB (minified)
Minimum Android Version: API 21 (Android 5.0)
Target Android Version: API 31+ (Android 12+)
```

---

## 🎨 Customization (Optional)

### **App Icon Change करें:**

```
1. 512x512 PNG image बनाएं
2. ये files replace करें:
   - android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png (48x48)
   - android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png (72x72)
   - android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png (96x96)
   - android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png (144x144)
   - android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png (192x192)
3. APK rebuild करें
```

### **App Name Change करें:**

```
1. capacitor.config.ts खोलें
2. appName को change करें:
   appName: 'Your New Name'
3. APK rebuild करें
```

---

## 🏪 Google Play Store पर Publish करें

### **Step 1: Developer Account बनाएं**
```
1. https://play.google.com/console पर जाएं
2. $25 registration fee pay करें
3. Account setup complete करें
```

### **Step 2: Release APK Build करें**
```bash
cd android
./gradlew assembleRelease
```

### **Step 3: Signing Key Generate करें**
```bash
keytool -genkey -v -keystore rental-manager-pro.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias rental-manager-pro
```

### **Step 4: App Listing Create करें**
```
1. Play Console में "Create app" दबाएं
2. App details fill करें
3. Screenshots upload करें
4. Description लिखें
5. APK upload करें
6. Submit करें
```

---

## 📞 Support

अगर कोई problem आए तो:

1. **Check करें:** सभी prerequisites properly install हैं
2. **Restart करें:** Computer और phone दोनों restart करें
3. **Clean build करें:** `./gradlew clean` फिर rebuild करें
4. **Logs check करें:** `adb logcat` से errors देखें

---

## ✨ Success! 

अब आपके पास अपना Rental Manager Pro Android app है! 🎉

**Next steps:**
- ✅ Phone पर test करें
- ✅ सभी features काम कर रहे हैं check करें
- ✅ Google Play Store पर publish करें
- ✅ अपने users को share करें

**Happy coding! 🚀**

---

**Questions?** Check the detailed guides:
- `ANDROID_APK_SETUP.md` - Complete setup guide
- `APK_BUILD_GUIDE.md` - Detailed build instructions
- `build-apk.sh` - Automated build script
