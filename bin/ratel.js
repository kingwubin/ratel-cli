#!/usr/bin/env node

const program = require('commander')
const create = require('../lib/create')

program
    .command('create <app-name>')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(function(name, cmd){
        const options = cleanArgs(cmd)
        create(name, options)
    });

program.parse(process.argv);


// 将包名转化为驼峰命令方式  package-name => packageName
function camelize (str) {
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
// 将option做选中的项转换为对象
function cleanArgs (cmd) {
    const args = {}
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ''))
        // if an option is not present and Command has a method with the same name
        // it should not be copied
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key]
        }
    })
    return args
}
