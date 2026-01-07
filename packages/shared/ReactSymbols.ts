export const symbolName = 'react.element';
export const REACT_ELEMENT_TYPE =
  typeof Symbol === 'function' && Symbol.for ? Symbol.for(symbolName) : symbolName;
