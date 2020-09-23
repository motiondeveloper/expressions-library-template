import { Comp, Layer, linear, time } from 'expression-globals-typescript';
import { someValue, someFunction } from './externalFile';

const thisComp = new Comp();

function getLayerDuration(layerName: string) {
  const layer: Layer = thisComp.layer(layerName);
  return layer.outPoint - layer.inPoint + time;
}

function remap(value: number) {
  return linear(value, 0, 10, 0, 1);
}

function welcome(name: string): string {
  return `Welcome ${name}!`;
}

'hello';

const version: string = '_npmVersion';

export { someValue, someFunction, getLayerDuration, remap, welcome, version };
