const { renderSvg } = require("nomnoml");

module.exports = function (source) {
    const svg = renderSvg(source);
    return `export default ${JSON.stringify(svg)};`;
};
