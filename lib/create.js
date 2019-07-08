const fs = require('fs')
const path = require('path')
const dir = require('./generator')

async function create(projectName, options) {
    const cwd = process.cwd() // 当前目录
    const targetDir = path.resolve(cwd, projectName || '.')
    if (fs.existsSync(targetDir)) {
        await fs.rmdir(targetDir,err => {})
    }
    fs.mkdirSync(projectName); // 在当前目录下创建文件夹
    const source = path.resolve(__dirname, '../src')
    const dist = path.resolve(cwd,projectName)
    dir(source, dist);
}

module.exports = create