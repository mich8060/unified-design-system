#!/usr/bin/env node

/**
 * Publish Script for UDS Component Library
 * 
 * Usage:
 *   npm run publish:lib           # Build and prepare for publishing
 *   npm run publish:lib -- --npm  # Build and publish to npm
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");

// ANSI colors for terminal output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function run(command, options = {}) {
  log(`\n> ${command}`, "blue");
  try {
    execSync(command, { 
      stdio: "inherit", 
      cwd: ROOT_DIR,
      ...options 
    });
  } catch (error) {
    log(`Command failed: ${command}`, "red");
    process.exit(1);
  }
}

function copyFile(src, dest) {
  const srcPath = path.join(ROOT_DIR, src);
  const destPath = path.join(DIST_DIR, dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    log(`  ✓ Copied ${src} → dist/${dest}`, "green");
  } else {
    log(`  ⚠ Warning: ${src} not found`, "yellow");
  }
}

function cleanDist() {
  // Remove files that shouldn't be in the npm package
  const filesToRemove = [
    "index.html",
    "favicon.ico",
    "logo192.png",
    "logo512.png",
    "manifest.json",
    "robots.txt",
    "asset-manifest.json",
  ];

  const dirsToRemove = ["data", "static", "styles"];

  filesToRemove.forEach((file) => {
    const filePath = path.join(DIST_DIR, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      log(`  ✓ Removed ${file}`, "yellow");
    }
  });

  dirsToRemove.forEach((dir) => {
    const dirPath = path.join(DIST_DIR, dir);
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true });
      log(`  ✓ Removed ${dir}/`, "yellow");
    }
  });
}

async function main() {
  const args = process.argv.slice(2);
  const shouldPublish = args.includes("--npm");
  const dryRun = args.includes("--dry-run");

  log("\n🏗️  UDS Component Library - Build & Publish", "green");
  log("=" .repeat(50));

  // Step 1: Build the library
  log("\n📦 Step 1: Building library...", "blue");
  run("npm run build:lib");

  // Step 2: Clean dist folder
  log("\n🧹 Step 2: Cleaning dist folder...", "blue");
  cleanDist();

  // Step 3: Copy package files
  log("\n📋 Step 3: Copying package files...", "blue");
  copyFile("package.lib.json", "package.json");
  copyFile("README.lib.md", "README.md");
  copyFile("LICENSE", "LICENSE");

  // Step 4: Show what's in dist
  log("\n📁 Step 4: Package contents:", "blue");
  const distFiles = fs.readdirSync(DIST_DIR);
  distFiles.forEach((file) => {
    const filePath = path.join(DIST_DIR, file);
    const stats = fs.statSync(filePath);
    const size = stats.isDirectory() 
      ? "dir" 
      : `${(stats.size / 1024).toFixed(1)} KB`;
    log(`  - ${file} (${size})`);
  });

  // Step 5: Publish if requested
  if (shouldPublish) {
    log("\n🚀 Step 5: Publishing to npm...", "blue");
    
    if (dryRun) {
      run("npm publish --dry-run", { cwd: DIST_DIR });
    } else {
      log("\n⚠️  About to publish to npm!", "yellow");
      log("Press Ctrl+C to cancel or wait 5 seconds to continue...", "yellow");
      
      await new Promise((resolve) => setTimeout(resolve, 5000));
      run("npm publish --access public", { cwd: DIST_DIR });
    }
  } else {
    log("\n✅ Build complete!", "green");
    log("\nTo publish to npm, run one of:", "blue");
    log("  npm run publish:lib -- --npm          # Publish to npm");
    log("  npm run publish:lib -- --npm --dry-run # Test publish (no upload)");
    log("\nOr manually:");
    log("  cd dist && npm publish --access public");
  }

  log("\n");
}

main().catch((err) => {
  log(`\n❌ Error: ${err.message}`, "red");
  process.exit(1);
});
