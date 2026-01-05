import type { ReactElementType } from 'shared/ReactElementType';

const symbolName = 'react.element';

export function ReactElement(type: any, props: any, key: any, ref: any): ReactElementType {
  return {
    $$typeof: typeof Symbol === 'function' && Symbol.for ? Symbol.for(symbolName) : symbolName,
    type,
    props,
    key,
    ref,
  };
}
