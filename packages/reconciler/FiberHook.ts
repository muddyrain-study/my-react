import { ReactSharedInternals } from '../react';
import type { Fiber } from './ReactInternalTypes';
import { updateOnFiber } from './WorkLoop';

export type Hook = {
  memoizedState: any;
  dispatch: any;
  next: Hook | null;
};

// 当前正在渲染的fiber
let currentlyRenderingFiber: Fiber | null = null;
// 当前工作的hook
let workInProgressHook: Hook | null = null;

/**
 * 分发更新对应状态值的方法
 * 1. 更改状态值
 * 2. 触发重新渲染
 * @param Fiber hook 所在的 fiber 节点
 * @param hook 当前的 hook
 * @param newState 新的状态值
 */
function dispatchSetState(fiber: Fiber, hook: Hook, newState: any) {
  hook.memoizedState = newState;
  updateOnFiber(fiber);
}

/**
 * mount 阶段创建 hook 对象
 * @param initialState 初始状态值
 * @returns 创建的 hook 对象
 */
function mountWorkInProgressHook(initialState: any): Hook {
  const hook: Hook = {
    memoizedState: initialState,
    next: null,
    dispatch: null,
  };
  if (currentlyRenderingFiber) {
    if (workInProgressHook === null) {
      currentlyRenderingFiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    workInProgressHook = hook;
  }
  return hook;
}

/**
 * 首次构建时状态管理的hook
 * 1. 创建一个hook
 * 2. 将hook挂载到fiber的memoizedState上
 * 3. 返回状态和更新状态的函数
 * @param initialState 初始状态
 * @returns [state, setState]
 */
export function mountState(initialState: any) {
  const hook = mountWorkInProgressHook(initialState);
  const dispatch = dispatchSetState.bind(null, currentlyRenderingFiber!, hook);
  hook.dispatch = dispatch;
  return [hook.memoizedState, dispatch];
}

/**
 * update 阶段获取当前的 hook 对象
 * @returns 当前的 hook 对象
 */
function updateWorkInProgressHook(): Hook {
  if (workInProgressHook === null) {
    workInProgressHook = currentlyRenderingFiber!.memoizedState;
  } else {
    workInProgressHook = workInProgressHook.next;
  }
  return workInProgressHook!;
}

/**
 * 更新时状态管理的hook
 * 1. 获取当前fiber的hook
 * 2. 返回状态和更新状态的函数
 * @returns [state, setState]
 */
export function updateState() {
  const hook = updateWorkInProgressHook();
  return [hook.memoizedState, hook.dispatch];
}

/**
 * 渲染函数组件，考虑hooks, 并返回组件的返回值
 * 1. 设置当前正在渲染的fiber
 * 2. 执行函数组件的函数
 * @param workInProgress 当前正在渲染的fiber
 * @param Component 函数组件
 * @returns 组件的返回值
 */
export function renderWithHooks(workInProgress: Fiber, Component: any) {
  currentlyRenderingFiber = workInProgress;
  // 根据不同情况设置不同的useState实现
  if (currentlyRenderingFiber.memoizedState === null) {
    ReactSharedInternals.H = mountState;
  } else {
    ReactSharedInternals.H = updateState;
  }
  const result = Component();
  workInProgressHook = null;
  console.log(ReactSharedInternals);
  return result;
}
