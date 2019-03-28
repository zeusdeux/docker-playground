const { readFileSync } = require('fs')
const { resolve } = require('path')
const filepath = resolve(__dirname, './output/file.txt')

console.log(readFileSync(filepath, { encoding: 'utf8' }))
console.log(`Done reading ${filepath}`)
