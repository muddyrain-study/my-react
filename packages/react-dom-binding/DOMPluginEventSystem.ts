/**
 * dom 插件之事件系统
 */

import { type Fiber, HostComponent } from 'packages/reconciler/ReactInternalTypes';

/**
 * 事件监听器
 * fiber (instance) 节点
 * listener 方法
 * currentTarget 当前事件目标
 */
type DispatchListener = {
  instance: Fiber | null;
  listener: Function;
  currentTarget: EventTarget | null;
};

/**
 * 创建事件监听器
 * @param instance fiber (instance)
 * @param listener 方法
 * @param currentTarget 当前事件目标
 */
export function createDispatchListener(
  instance: Fiber | null,
  listener: Function,
  currentTarget: EventTarget | null
): DispatchListener {
  return {
    instance,
    listener,
    currentTarget,
  };
}

/**
 * 收集事件
 * 累计单相监听器 - 收集单一阶段的方法
 * @param targetFiber fiber (instance)
 * @returns 方法的集合
 */
export function accumulateSinglePhaseListeners(targetFiber: Fiber): Array<any> {
  let fiber: Fiber | null = targetFiber;
  const listeners: Array<any> = [];
  while (fiber) {
    const { pendingProps, tag } = fiber;
    if (tag === HostComponent) {
      const { onClick } = pendingProps;
      if (typeof onClick === 'function') {
        listeners.push(createDispatchListener(fiber, onClick, fiber.stateNode));
      }
    }
    fiber = fiber.return;
  }
  return listeners;
}
/**
 * 执行事件
 * 按顺序处理事件队列中的事件
 * @param event 事件
 * @param listeners 事件队列
 */
export function processEventQueuInOrder(event: any, listeners: Array<any>) {
  // let previousFiber: Fiber | null = null;
  for (let i = 0; i < listeners.length; i++) {
    const { listener, currentTarget } = listeners[i];
    // const { listener, currentTarget, fiber } = listeners[i];
    // if (fiber !== previousFiber && event.isPropagationStopped()) {
    //   return;
    // }
    event.currentTarget = currentTarget;
    listener(event);
    event.currentTarget = null;
    // previousFiber = fiber;
    if (event.isPropagationStopped()) {
      return;
    }
  }
}
