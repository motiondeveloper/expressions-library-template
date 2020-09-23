{
    someValue: 2,
    someFunction() {
        return 'hi';
    }
    getLayerDuration(layerName) {
        const layer = thisComp.layer(layerName);
        return layer.outPoint - layer.inPoint + time;
    },
    // comment here
    remap(value) {
        return linear(value, 0, 10, 0, 1);
    },
    welcome(name) {
        return `Welcome ${name}!`;
    },
    // amd jere
    version: '1.2.2',
}