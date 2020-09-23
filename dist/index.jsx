{
    someValue: 2,
    someFunction() {
        return 'hi';
    }
    getLayerDuration(layerName) {
        const layer = thisComp.layer(layerName);
        return layer.outPoint - layer.inPoint + expressionGlobalsTypescript.time;
    },
    remap(value) {
        return expressionGlobalsTypescript.linear(value, 0, 10, 0, 1);
    },
    welcome(name) {
        return `Welcome ${name}!`;
    },
    version: '1.2.2',
}