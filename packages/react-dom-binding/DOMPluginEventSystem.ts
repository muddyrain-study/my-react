/**
 * dom 插件之事件系统
 */

import { type Fiber, HostComponent } from 'packages/reconciler/ReactInternalTypes';

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
        listeners.push(onClick);
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
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i];
    listener(event);
  }
}
