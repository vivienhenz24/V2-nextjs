/**
 * Generates public/favicon.ico from the /icon route.
 * Run WHILE the dev server is running: node scripts/generate-favicon.mjs
 */

import { writeFileSync } from 'fs'

const PORT = process.env.PORT ?? 3000
const res = await fetch(`http://localhost:${PORT}/icon`)
if (!res.ok) throw new Error(`Failed to fetch /icon: ${res.status}`)

const pngBuffer = Buffer.from(await res.arrayBuffer())

// ICO format: header + directory entry + PNG data
// Modern ICO supports embedded PNG directly (since Windows Vista / all browsers)
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: ICO
header.writeUInt16LE(1, 4) // image count: 1

const dir = Buffer.alloc(16)
dir.writeUInt8(32, 0)                    // width: 32
dir.writeUInt8(32, 1)                    // height: 32
dir.writeUInt8(0, 2)                     // color count: 0 (PNG)
dir.writeUInt8(0, 3)                     // reserved
dir.writeUInt16LE(1, 4)                  // color planes
dir.writeUInt16LE(32, 6)                 // bits per pixel
dir.writeUInt32LE(pngBuffer.length, 8)   // image size in bytes
dir.writeUInt32LE(22, 12)                // offset: 6 (header) + 16 (dir)

const ico = Buffer.concat([header, dir, pngBuffer])
writeFileSync('./public/favicon.ico', ico)
console.log('public/favicon.ico generated')
