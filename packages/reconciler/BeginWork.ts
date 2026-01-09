import { reconcileChildFibers } from './ChildFiber';
import type { Fiber } from './ReactInternalTypes';

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
