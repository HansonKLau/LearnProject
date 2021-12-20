// Webpack
// takes all the dependencies of the file specified at entry and outputs a file to the path specified in output
// and names it whatever is specified in filename

const path = require('path')

module.exports = {
    mode: 'development',
    
    // input file:
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    // whenever the input file is changed, the output will be rebundled
    watch: true
}