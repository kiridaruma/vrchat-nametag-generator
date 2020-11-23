const Path = require('path');

const config = {
    entry: "./src/index.ts",
    output: {
        path: Path.resolve(__dirname, 'public'),
        filename: 'app.js'
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, use: "ts-loader" },
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.(ttf)$/, use: { loader: "file-loader", options: { name: '[name].[ext]', outputPath: 'font/' } } },
        ]
    },
    resolve: { extensions: ['.ts', '.tsx', '.js', '.scss', '.css'] }
}

module.exports = config;
