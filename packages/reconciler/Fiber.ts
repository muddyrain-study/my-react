import type { ReactElement } from 'shared/ReactElementType';
import type { Fiber, WorkTag } from './ReactInternalTypes';
import { FunctionComponent, HostComponent, HostRoot, HostText } from './ReactInternalTypes';

export function createFiber(tag: WorkTag, key: string | null): Fiber {
  const fiber: Fiber = {
    tag,
    key,
    elementType: null,
    type: null,
    stateNode: null,
    return: null,
    child: null,
    sibling: null,
    ref: null,
    pendingProps: null,
  };
  return fiber;
}
/**
 * 创建Fiber节点
 * @param type 节点类型
 * @param pendingProps 节点属性
 * @param key 节点key
 * @returns Fiber节点
 */
export function createFiberFromTypeAndProps(
  type: any,
  pendingProps: any,
  key: string | null
): Fiber {
  const fiberTag: WorkTag = typeof type === 'function' ? FunctionComponent : HostComponent;
  const fiber = createFiber(fiberTag, key);
  fiber.elementType = type;
  fiber.type = type;
  fiber.pendingProps = pendingProps;
  return fiber;
}

/**
 * 创建元素Fiber节点
 * @param element React元素
 * @returns Fiber节点
 */
export function createFiberFromElement(element: ReactElement): Fiber {
  const { type, key, props } = element;
  const fiber = createFiberFromTypeAndProps(type, props, key);
  return fiber;
}

/**
 * 创建文本Fiber节点
 * @param text 文本内容
 * @returns Fiber节点
 */
export function createFiberFromText(text: string | number): Fiber {
  const fiber = createFiber(HostText, null);
  fiber.pendingProps = text;
  return fiber;
}

// 创建 HostRootFiber
export function createHostRootFiber(): Fiber {
  const fiber = createFiber(HostRoot, null);
  return fiber;
}
