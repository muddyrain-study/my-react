/**
 * dom 插件之事件系统
 */

import { createSyntheticEvent } from 'packages/react-dom-binding/SyntheticEvent';
import { type Fiber, HostComponent } from 'packages/reconciler/ReactInternalTypes';
import { internalInstanceKey } from '../react-dom-binding/ReactDOMComponentTree';

// 顶层事件之原生dom事件到React事件的映射
const topLevelEventsToReactNames: Map<string, string> = new Map([
  ['click', 'onClick'],
  ['mousedown', 'onMouseDown'],
  ['mouseup', 'onMouseUp'],
  ['keydown', 'onKeyDown'],
  ['keyup', 'onKeyUp'],
  ['input', 'onInput'],
  ['change', 'onChange'],
  ['submit', 'onSubmit'],
  ['focus', 'onFocus'],
  ['blur', 'onBlur'],
  ['scroll', 'onScroll'],
  ['resize', 'onResize'],
]);
/*
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
export function accumulateSinglePhaseListeners(targetFiber: Fiber, reactName: string): Array<any> {
  let fiber: Fiber | null = targetFiber;
  const listeners: Array<any> = [];
  while (fiber) {
    const { pendingProps, tag } = fiber;
    if (tag === HostComponent) {
      const listener = pendingProps[reactName];
      if (typeof listener === 'function') {
        listeners.push(createDispatchListener(fiber, listener, fiber.stateNode));
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

/**
 * 监听所有支持的事件
 * @params rootContainerElement 根元素
 */
export function listenToAllSupportedEvents(rootContainerElement: EventTarget) {
  topLevelEventsToReactNames.forEach((reactName, nativeEvent) => {
    rootContainerElement.addEventListener(nativeEvent, (e) => {
      // (e.target as any)[internalInstanceKey].pendingProps.onClick(e);
      const listeners = accumulateSinglePhaseListeners(
        (e.target as any)[internalInstanceKey],
        reactName
      );
      const SyntheticEvent = createSyntheticEvent(e);
      processEventQueuInOrder(SyntheticEvent, listeners);
    });
  });
}
