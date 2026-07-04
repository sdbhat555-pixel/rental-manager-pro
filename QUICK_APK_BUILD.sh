#!/bin/bash

# Rental Manager Pro - Quick APK Build Script
# This script automates the APK building process

echo "🚀 Rental Manager Pro - APK Builder"
echo "===================================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from https://nodejs.org/"
    exit 1
fi

if ! command -v java &> /dev/null; then
    echo "❌ Java not found. Install JDK from https://www.oracle.com/java/technologies/downloads/"
    exit 1
fi

if [ ! -d "$ANDROID_HOME" ]; then
    echo "⚠️  ANDROID_HOME not set. Please set it:"
    echo "   export ANDROID_HOME=~/Android/Sdk"
    exit 1
fi

echo "✅ Prerequisites OK"
echo ""

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
pnpm install
echo "✅ Dependencies installed"
echo ""

# Step 2: Build web assets
echo "🏗️  Building web assets..."
pnpm build
echo "✅ Web assets built"
echo ""

# Step 3: Sync to Android
echo "🔄 Syncing to Android..."
npx cap sync android
echo "✅ Synced to Android"
echo ""

# Step 4: Build APK
echo "📱 Building APK..."
cd android
export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))

echo "Choose build type:"
echo "1) Debug APK (for testing)"
echo "2) Release APK (for distribution)"
read -p "Enter choice (1 or 2): " choice

if [ "$choice" = "1" ]; then
    echo "Building Debug APK..."
    ./gradlew assembleDebug
    echo ""
    echo "✅ Debug APK built successfully!"
    echo "📍 Location: app/build/outputs/apk/debug/app-debug.apk"
elif [ "$choice" = "2" ]; then
    echo "Building Release APK..."
    ./gradlew assembleRelease
    echo ""
    echo "✅ Release APK built successfully!"
    echo "📍 Location: app/build/outputs/apk/release/app-release.apk"
else
    echo "❌ Invalid choice"
    exit 1
fi

echo ""
echo "🎉 Build complete!"
echo ""
echo "Next steps:"
echo "1. Connect your Android phone via USB"
echo "2. Enable Developer Mode and USB Debugging"
echo "3. Run: adb install app/build/outputs/apk/debug/app-debug.apk"
echo ""
