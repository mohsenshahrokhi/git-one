/** @type {import('next').NextConfig} */
var path = require("path");
const nextConfig = {
    // resolve: {
    //     alias: {
    //         'express-handlebars': 'handlebars/dist/handlebars.js'
    //     }
    // }
    // resolve: {
    //     alias: {
    //         handlebars: 'handlebars/dist/handlebars.min.js'
    //     }
    // }
    webpack: (config) => {
        config.resolve.alias["handlebars"] = path.resolve("./node_modules/handlebars/dist/handlebars.min.js")
        return config
    },

}

module.exports = nextConfig
