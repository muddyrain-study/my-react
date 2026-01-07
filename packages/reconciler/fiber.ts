import type { ReactElementType } from 'shared/ReactElementType';
import type { FiberNode, WorkTag } from './ReactInternalTypes';
import { HostComponent } from './ReactInternalTypes';

export function createFiber(tag: WorkTag, key: string | null): FiberNode {
  const fiber: FiberNode = {
    tag,
    key,
    elementType: null,
    type: null,
    stateNode: null,
    return: null,
    child: null,
    sibling: null,
    ref: null,
  };
  return fiber;
}

export function createFiberFromTypeAndProps(type: any, key: string | null): FiberNode {
  const fiberTag: WorkTag = HostComponent;
  const fiber = createFiber(fiberTag, key);
  fiber.elementType = type;
  fiber.type = type;
  return fiber;
}

// 从ReactElement转成FiberNode
export function createFiberFromElement(element: ReactElementType): FiberNode {
  const { type, key } = element;
  const fiber = createFiberFromTypeAndProps(type, key);
  return fiber;
}
