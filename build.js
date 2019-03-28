const repeat = require('lodash.repeat')
const { writeFileSync, mkdirSync } = require('fs')
const { resolve } = require('path')
const outputFolderPath = resolve(__dirname, './output')
const filepath = resolve(__dirname, './output/file.txt')

mkdirSync(outputFolderPath)
writeFileSync(filepath, repeat('omg', 10))
console.log(`wrote ${filepath}`)
