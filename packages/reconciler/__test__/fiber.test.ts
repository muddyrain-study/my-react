import type { ReactElement } from 'shared/ReactElementType';
import { createFiber, createFiberFromElement, createFiberFromTypeAndProps } from '../Fiber';
import type { Fiber } from '../ReactInternalTypes';
import { HostComponent } from '../ReactInternalTypes';

describe('Fiber 测试', () => {
  test('测试 createFiber 有key', () => {
    const tag = HostComponent;
    const key = 'test-key';
    const fiber: Fiber = createFiber(tag, key);
    expect(fiber.tag).toBe(tag);
    expect(fiber.key).toBe(key);
    expect(fiber.elementType).toBeNull();
    expect(fiber.type).toBeNull();
    expect(fiber.stateNode).toBeNull();
    expect(fiber.return).toBeNull();
    expect(fiber.child).toBeNull();
    expect(fiber.sibling).toBeNull();
    expect(fiber.ref).toBeNull();
    expect(fiber.memoizedState).toBeNull();
  });

  test('测试 createFiber 没有key', () => {
    const tag = HostComponent;
    const fiber: Fiber = createFiber(tag, null);
    expect(fiber.tag).toBe(tag);
    expect(fiber.key).toBeNull();
  });

  test('测试 createFiberFromTypeAndProps', () => {
    const type = 'div';
    const key = 'test-key';
    const props = { children: 'hello' };
    const fiber: Fiber = createFiberFromTypeAndProps(type, props, key);
    expect(fiber.tag).toBe(HostComponent);
    expect(fiber.key).toBe(key);
    expect(fiber.elementType).toBe(type);
    expect(fiber.type).toBe(type);
  });

  test('测试 createFiberFromElement', () => {
    const element: ReactElement = {
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      key: 'test-key',
      props: {},
      ref: null,
    };
    const fiber: Fiber = createFiberFromElement(element);
    expect(fiber.tag).toBe(HostComponent);
    expect(fiber.key).toBe(element.key);
    expect(fiber.elementType).toBe(element.type);
    expect(fiber.type).toBe(element.type);
  });
});
