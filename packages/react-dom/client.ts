import type { ReactElement } from 'shared/ReactElementType';
import { createContainer, updateContainer } from '../reconciler/FiberReconciler';
import type { Fiber } from '../reconciler/ReactInternalTypes';

type ReactDomRootType = {
  _internalRoot: Fiber;
  render: (element: ReactElement) => void;
};
function ReactDomRoot(hostRootFiber: Fiber): ReactDomRootType {
  return {
    _internalRoot: hostRootFiber,
    render(element) {
      updateContainer(element, this._internalRoot);
    },
  };
}

/**
 * 初始化 react 创建根节点
 * @param container
 */
function createRoot(container: HTMLElement) {
  const hostRootFiber = createContainer(container);

  return ReactDomRoot(hostRootFiber);
}

export { createRoot };
