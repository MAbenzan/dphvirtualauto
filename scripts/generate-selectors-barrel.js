const fs = require('fs')
const path = require('path')

const dir = path.resolve(__dirname, '..', 'src', 'selectors')
const indexPath = path.join(dir, 'index.ts')

if (!fs.existsSync(dir)) process.exit(0)

const files = fs
  .readdirSync(dir)
  .filter(f => f.endsWith('.ts') && f !== 'index.ts' && !f.endsWith('.d.ts'))
  .sort()

const content = files.map(f => `export * from './${f.replace(/\.ts$/, '')}'`).join('\n') + '\n'

try {
  const prev = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : ''
  if (prev !== content) fs.writeFileSync(indexPath, content)
  process.exit(0)
} catch (e) {
  process.exit(1)
}