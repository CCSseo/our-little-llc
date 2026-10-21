// Keep the deployed Node 24 major and reject builders missing the security patch.
const [major, minor, patch] = process.versions.node.split(".").map(Number);
if (major !== 24 || minor < 22 || (minor === 22 && patch < 1)) {
  throw new Error(`Node 24.22.1 or later within Node 24 is required; found ${process.version}`);
}
console.log(`Build runtime accepted: ${process.version}. Vercel manages the function patch version separately.`);
