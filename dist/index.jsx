

var expressionGlobalsTypescript = require('expression-globals-typescript');

const someValue = 2;
function someFunction() {
    return 'hi';
}

const thisComp = new expressionGlobalsTypescript.Comp();
function getLayerDuration(layerName) {
    const layer = thisComp.layer(layerName);
    return layer.outPoint - layer.inPoint;
}
function remap(value) {
    return expressionGlobalsTypescript.linear(value, 0, 10, 0, 1);
}
function welcome(name) {
    return `Welcome ${name}!`;
}
const version = '1.2.2';
