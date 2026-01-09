import type { ReactElement } from 'shared/ReactElementType';
import type { Fiber, WorkTag } from './ReactInternalTypes';
import { HostComponent, HostText } from './ReactInternalTypes';

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

export function createFiberFromTypeAndProps(
  type: any,
  pendingProps: any,
  key: string | null
): Fiber {
  const fiberTag: WorkTag = HostComponent;
  const fiber = createFiber(fiberTag, key);
  fiber.elementType = type;
  fiber.type = type;
  fiber.pendingProps = pendingProps;
  return fiber;
}

// 从ReactElement转成Fiber
export function createFiberFromElement(element: ReactElement): Fiber {
  const { type, key, props } = element;
  const fiber = createFiberFromTypeAndProps(type, props, key);
  return fiber;
}

// 创建文本Fiber节点
export function createFiberFromText(text: string | number): Fiber {
  const fiber = createFiber(HostText, null);
  fiber.pendingProps = text;
  return fiber;
}
