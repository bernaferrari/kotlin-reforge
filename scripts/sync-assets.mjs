import { createHash } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const android = resolve(process.env.ANDROID_PROJECTS_DIR || join(homedir(), "Documents/android"))
const sources = JSON.parse(await readFile(join(site, "scripts/asset-sources.json"), "utf8"))
const manifestPath = join(site, "scripts/asset-hashes.json")
const manifest = JSON.parse(
  await readFile(manifestPath, "utf8").catch((error) => {
    if (error.code === "ENOENT") return "{}"
    throw error
  }),
)
const [command = "check", filter] = process.argv.slice(2)
if (!["check", "sync", "baseline"].includes(command) || (filter && !sources[filter])) {
  console.error("Usage: node scripts/sync-assets.mjs check|sync|baseline [app-slug]")
  process.exit(2)
}
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex")
let issues = 0
for (const [slug, app] of Object.entries(sources)) {
  if (filter && filter !== slug) continue
  const root = join(android, app.project)
  const entries = [
    ["icon.png", app.icon],
    ...Object.entries(app.images).map(([name, source]) => [
      `${name}.webp`,
      `store-listing/en-US/readme/${source}.jpg`,
    ]),
  ]
  for (const [output, source] of entries) {
    const key = `${slug}/${output}`
    try {
      const input = await readFile(join(root, source))
      const destination = join(site, "public", key)
      if (command === "sync") {
        const result = output.endsWith(".png")
          ? input
          : await sharp(input).webp({ quality: 88 }).toBuffer()
        await writeFile(destination, result)
      }
      const outputBytes = await readFile(destination)
      const current = { source, sourceHash: sha256(input), outputHash: sha256(outputBytes) }
      const previous = manifest[key]
      if (command === "check") {
        if (!previous) {
          console.log(`${key}: no baseline`)
          issues++
        } else if (
          previous.source !== current.source ||
          previous.sourceHash !== current.sourceHash
        ) {
          console.log(`${key}: source changed (${app.project}/${source})`)
          issues++
        } else if (previous.outputHash !== current.outputHash) {
          console.log(`${key}: site image changed`)
          issues++
        } else
          console.log(
            `${key}: unchanged${previous.provenance === "baseline" ? " (existing image, not yet regenerated)" : ""}`,
          )
      } else {
        manifest[key] = { ...current, provenance: command === "sync" ? "generated" : "baseline" }
        console.log(`${key}: ${command === "sync" ? "updated" : "baseline recorded"}`)
      }
    } catch (error) {
      console.error(`${key}: ${error.message}`)
      issues++
    }
  }
}
if (command !== "check") {
  await writeFile(
    manifestPath,
    JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 2) + "\n",
  )
}
if (issues) process.exitCode = 1
