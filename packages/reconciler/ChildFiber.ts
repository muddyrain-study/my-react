import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { createFiberFromElement, createFiberFromText } from './Fiber';
import type { Fiber } from './ReactInternalTypes';

/**
 * 创建数组中所有的子节点，并关联所有子节点的关系
 * @param returnFiber 父节点
 * @param children 子节点数组
 * @returns 第一个子节点的Fiber
 */
function reconcileChildrenArray(returnFiber: Fiber, children: any[]): Fiber | null {
  // 第一个子节点
  let resultingFirstChild: Fiber | null = null;
  // 上一个新节点
  let previousNewFiber: Fiber | null = null;
  for (let i = 0; i < children.length; i++) {
    const newFiber =
      typeof children[i] === 'string' || typeof children[i] === 'number'
        ? createFiberFromText(children[i])
        : createFiberFromElement(children[i]);
    newFiber.return = returnFiber;
    if (previousNewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }

  return resultingFirstChild;
}

/**
 * 协调单一子节点，返回子节点的Fiber
 * @param returnFiber 父节点
 * @param children 子节点
 * @returns 子节点的Fiber
 */
function reconcileSingleElement(returnFiber: Fiber, children: any): Fiber {
  const created = createFiberFromElement(children);
  created.return = returnFiber;
  return created;
}

/**
 * 协调子节点 根据不同情况，调用不同的协调方法
 * @param fiber 父节点
 * @param children 子节点
 * @returns 第一个子节点的Fiber
 */
export function reconcileChildFibers(fiber: Fiber, children: any): Fiber | null {
  // 单一子节点
  if (children.$$typeof === REACT_ELEMENT_TYPE) {
    return reconcileSingleElement(fiber, children);
  }
  // 多个子节点
  if (Array.isArray(children)) {
    return reconcileChildrenArray(fiber, children);
  }

  return null;
}
