import type { ReactElement } from 'shared/ReactElementType';
import { appendChild } from '../react-dom-binding/FiberConfigDOM';
import { internalInstanceKey } from '../react-dom-binding/ReactDOMComponentTree';
import { createFiberFromElement, createHostRootFiber } from './Fiber';
import { createFiberRoot } from './FiberRoot';
import type { Fiber } from './ReactInternalTypes';
import { workLoop } from './WorkLoop';
/**
 * 创建 FiberRoot HostRootFiber 并建立关联
 * @param containerInfo
 */
export function createContainer(containerInfo: HTMLElement) {
  const root = createFiberRoot(containerInfo);
  const hostRootFiber = createHostRootFiber();
  hostRootFiber.stateNode = root;
  // 根元素添加事件监听，当捕获到事件触发时，找到event.target对应的fiber，并执行其onClick事件
  root.containerInfo.addEventListener('click', (e) => {
    (e.target as any)[internalInstanceKey].pendingProps.onClick(e);
  });
  return hostRootFiber;
}

/**
 * 更新容器
 * 1. 构建子fiber
 * 2. 关联hostRootFiber和子fiber
 * 3. 挂载子fiber到root dom上
 */
export function updateContainer(element: ReactElement, root: Fiber) {
  // 1. 构建子fiber
  const containerFiber = createFiberFromElement(element);
  // work loop
  workLoop(containerFiber);
  // 2. 关联hostRootFiber和子fiber
  root.child = containerFiber;
  containerFiber.return = root;
  // 3. 挂载子fiber到root dom上
  appendChild(root.stateNode.containerInfo, root.child?.stateNode);
}
