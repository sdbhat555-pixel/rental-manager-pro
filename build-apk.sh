#!/bin/bash

# Rental Manager Pro - Android APK Build Script
# This script automates the APK building process

set -e

echo "🚀 Rental Manager Pro - Android APK Builder"
echo "==========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi
echo "✓ Node.js $(node --version)"

if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed"
    exit 1
fi
echo "✓ Java $(java -version 2>&1 | head -1)"

if [ ! -f "android/gradlew" ]; then
    echo "❌ Android project not found"
    exit 1
fi
echo "✓ Android project found"

echo ""
echo -e "${BLUE}Building web assets...${NC}"
pnpm build

echo ""
echo -e "${BLUE}Syncing with Android project...${NC}"
npx cap sync android

echo ""
echo "Choose build type:"
echo "1) Debug APK (for testing)"
echo "2) Release APK (for distribution)"
read -p "Enter choice (1 or 2): " choice

cd android

case $choice in
    1)
        echo ""
        echo -e "${BLUE}Building Debug APK...${NC}"
        ./gradlew assembleDebug
        APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
        ;;
    2)
        echo ""
        echo -e "${BLUE}Building Release APK...${NC}"
        ./gradlew assembleRelease
        APK_PATH="app/build/outputs/apk/release/app-release.apk"
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

if [ -f "$APK_PATH" ]; then
    echo ""
    echo -e "${GREEN}✓ APK built successfully!${NC}"
    echo ""
    echo "APK Location: $APK_PATH"
    echo "APK Size: $(du -h $APK_PATH | cut -f1)"
    echo ""
    echo "Next steps:"
    echo "1. Install on device: adb install $APK_PATH"
    echo "2. Or upload to Google Play Store"
    echo ""
else
    echo -e "${YELLOW}⚠ APK not found at expected location${NC}"
    exit 1
fi

cd ..
echo -e "${GREEN}Done! 🎉${NC}"
