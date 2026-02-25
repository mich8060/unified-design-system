const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const FIXTURE_TEMPLATE_DIR = path.join(ROOT, "tests/fixtures/vite-consumer");

function run(command, cwd) {
  execSync(command, {
    cwd,
    stdio: "inherit",
    env: { ...process.env, npm_config_loglevel: "error" },
  });
}

function copyDir(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  fs.readdirSync(sourceDir, { withFileTypes: true }).forEach((entry) => {
    const srcPath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, targetPath);
    } else {
      fs.copyFileSync(srcPath, targetPath);
    }
  });
}

function runFixture() {
  if (!fs.existsSync(FIXTURE_TEMPLATE_DIR)) {
    throw new Error("Missing fixture template: tests/fixtures/vite-consumer");
  }

  const packedName = execSync("npm pack --silent", { cwd: ROOT })
    .toString()
    .trim()
    .split("\n")
    .pop();

  const packedPath = path.join(ROOT, packedName);
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "uds-vite-consumer-"));
  const tempFixtureDir = path.join(tempRoot, "fixture");

  try {
    copyDir(FIXTURE_TEMPLATE_DIR, tempFixtureDir);
    run("npm install", tempFixtureDir);
    run(`npm install "${packedPath}" --no-save`, tempFixtureDir);
    run("npm run build", tempFixtureDir);
    console.log("Vite consumer fixture build passed.");
  } finally {
    if (fs.existsSync(packedPath)) fs.unlinkSync(packedPath);
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

runFixture();
