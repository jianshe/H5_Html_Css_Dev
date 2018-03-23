var config = require("./webpack.config.babel.js");
config.entry.main.unshift("webpack-dev-server/client?http://localhost:3001/", "webpack/hot/dev-server");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    hot: true,
    inline: true,
    port: 3001
});
server.listen(3001);