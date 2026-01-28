/**
 * DOM和Fiber之间关联的工具类
 */

import type { Fiber } from '../reconciler/ReactInternalTypes';
import type { Instance } from './FiberConfigDOM';

// 属性的唯一性 - 随机字符串
const randomKey = Math.random().toString(36).slice(2);
export const internalInstanceKey = `__reactFiber$${randomKey}`;

/**
 * 给dom元素添加属性并设置值
 * @param fiber
 * @param instance
 */
export function precacheFiberNode(fiber: Fiber, instance: Instance) {
  (instance as any)[internalInstanceKey] = fiber;
}
