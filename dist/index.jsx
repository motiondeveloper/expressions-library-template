import { Comp, time, linear } from 'expression-globals-typescript';

const someValue = 2;
function someFunction() {
    return 'hi';
}

const thisComp = new Comp();
function getLayerDuration(layerName) {
    const layer = thisComp.layer(layerName);
    return layer.outPoint - layer.inPoint + time;
}
function remap(value) {
    return linear(value, 0, 10, 0, 1);
}
function welcome(name) {
    return `Welcome ${name}!`;
}
const version = '1.2.2';

export { getLayerDuration, remap, someFunction, someValue, version, welcome };
