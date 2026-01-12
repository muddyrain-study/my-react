import { beginWork } from './BeginWork';
import { completeWork } from './CompleteWork';
import type { Fiber } from './ReactInternalTypes';

// 当前正在处理的 Fiber 节点
let workInProgress: Fiber | null = null;

/**
 * 完成单元工作，当前节点进行回溯阶段，并触发完成工作
 * @param fiber 当前节点
 */
function completeUnitOfWork(fiber: Fiber) {
  let completedWork: Fiber | null = fiber;
  do {
    completeWork(completedWork);
    // 如果有兄弟节点，继续遍历兄弟节点
    if (fiber.sibling) {
      workInProgress = completedWork.sibling;
      return;
    }
    completedWork = completedWork.return;
    // 没有兄弟节点，向上遍历
    workInProgress = completedWork;
  } while (completedWork);
}

/**
 * 执行单元工作，对当前节点进行向下遍历，并触发开始工作
 * @param fiber 当前节点
 */
function performUnitOfWork(fiber: Fiber) {
  const next = beginWork(fiber);
  // 如果有子节点，继续向下遍历
  if (next) {
    workInProgress = next;
  } else {
    // 没有子节点，完成当前节点的工作，向上遍历
    completeUnitOfWork(fiber);
  }
}

/**
 * 遍历 Fiber 节点，完成对应的工作
 */
export function workLoop(fiber: Fiber) {
  workInProgress = fiber;
  while (workInProgress) {
    // 向下的工作
    performUnitOfWork(workInProgress);
  }
}
