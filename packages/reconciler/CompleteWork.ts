import type { Instance } from './FiberConfigDOM';
import { appendChild, createInstance, createTextInstance, setInitialProps } from './FiberConfigDOM';
import type { Fiber } from './ReactInternalTypes';
import { FunctionComponent, HostComponent, HostText } from './ReactInternalTypes';

/**
 * 遍历当前节点的子节点，将子节点关联DOM节点
 * @param parent 父节点
 * @param child 子节点
 */
function appendAllChild(parent: Instance, child: Fiber | null) {
  let node: Fiber | null = child;
  while (node) {
    const childStateNode = node.tag === FunctionComponent ? node.child?.stateNode : node.stateNode;
    appendChild(parent, childStateNode);
    node = node.sibling;
  }
}

/**
 * 构建 Fiber 回朔阶段 节点完成状态要干的事情
 * 1. 创建真实DOM节点
 * 2. 设置 StateNode 指向真实DOM节点
 */
export const completeWork = (fiber: Fiber) => {
  switch (fiber.tag) {
    case HostText:
      fiber.stateNode = createTextInstance(fiber.pendingProps);
      break;
    case FunctionComponent:
      break;
    case HostComponent: {
      // 1. 创建真实DOM节点
      const instance = createInstance(fiber.type);
      // 关联DOM节点
      appendAllChild(instance, fiber.child);
      // 设置属性
      setInitialProps(instance, fiber.pendingProps);
      // 2. 设置 StateNode 指向真实DOM节点
      fiber.stateNode = instance;
      break;
    }
  }
};
