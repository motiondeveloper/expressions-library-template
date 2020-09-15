// Importing object bases (CompBase, LayerBase, PropertyBase)
// TypeScript types (Layer, Comp, Value, Color etc)
// and global functions from 'expression-globals-typescript'
import { Comp, Layer, linear } from 'expression-globals-typescript';

// Creating a new composition object from CompBase
const thisComp = new Comp();

// Using the expression types in a function
function getLayerDuration(layerName: string) {
  const layer: Layer = thisComp.layer(layerName);
  return layer.outPoint - layer.inPoint;
}

// Using expressions global functions
function remap(value: number) {
  return linear(value, 0, 10, 0, 1);
}

function welcome(name: string): string {
  return `Welcome ${name}!`;
}

const someValue: number = 2;

// Export values to appear in jsx files
export { getLayerDuration, remap, welcome, someValue };
