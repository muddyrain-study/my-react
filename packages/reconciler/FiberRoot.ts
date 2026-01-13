import type { FiberRoot } from './ReactInternalTypes';

export function createFiberRoot(containerInfo: HTMLElement) {
  const root: FiberRoot = {
    containerInfo,
  };
  return root;
}
