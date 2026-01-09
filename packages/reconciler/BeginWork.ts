import { reconcileChildFibers } from './ChildFiber';
import type { Fiber } from './ReactInternalTypes';

/**
 * 开始工作，根据不同情况，调用不同的协调方法
 * @param fiber 当前节点
 * @returns 第一个子节点的Fiber
 */
export function beginWork(fiber: Fiber): Fiber | null {
  const children = fiber.pendingProps.children;
  // 纯文本节点
  if (typeof children === 'string' || typeof children === 'number') {
    return null;
  }
  // 1. 创建子节点
  fiber.child = reconcileChildFibers(fiber, children);
  return fiber.child;
}
