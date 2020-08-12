// Import values from other files

import defaultFunction from './defaultFunction';
import anotherFunction from './anotherFunction';

// Or define values in index

function localFunction(): string {
  return 'Local Function';
}

const localValue: number = 2;

// Export values to appear in jsx files
export { localFunction, localValue, defaultFunction, anotherFunction };
