import type { ReactElementType } from 'shared/ReactElementType';

export const symbolName = 'react.element';

function ReactElement(type: any, props: any, key: any, ref: any): ReactElementType {
  return {
    $$typeof: typeof Symbol === 'function' && Symbol.for ? Symbol.for(symbolName) : symbolName,
    type,
    props,
    key,
    ref,
  };
}

export function jsx(type: any, config: any, maybeKey?: any) {
  let key = null;
  if (maybeKey !== undefined) {
    key = `${maybeKey}`;
  }
  if (config && config.key !== undefined) {
    key = `${config.key}`;
  }
  let props: any = null;
  const ref = config?.ref || null;
  if (config.key) {
    props = {};
    for (const propName in config) {
      if (propName !== 'key') {
        props[propName] = config[propName];
      }
    }
  } else {
    props = config;
  }
  return ReactElement(type, props, key, ref);
}

export const jsxDEV = jsx;
