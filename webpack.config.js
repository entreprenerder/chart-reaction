var path = require('path');
module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "build"),
        filename: "index.js",
        libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|build)/,
                loader: "ts-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /(node_modules|build)/,
                loader: "source-map-loader"
            },
            {
                test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|build)/,
                loader: 'url-loader'
            }
        ]
    },
    externals: {
      'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    }
};
