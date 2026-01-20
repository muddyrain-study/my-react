export type Instance = HTMLElement;
/**
 * 创建文本节点
 * @param text 文本内容
 * @returns 文本节点
 */
export function createTextInstance(text: string) {
  return document.createTextNode(text);
}
/**
 * 创建真实DOM节点
 * @param type 节点类型
 * @returns 真实DOM节点
 */
export function createInstance(type: string) {
  return document.createElement(type);
}
/**
 * 关联DOM节点
 */
export function appendChild(parent: Instance, child: Instance) {
  parent.appendChild(child);
}
/**
 * 移除DOM节点
 */
export function removeChild(parent: Instance, child: Instance) {
  parent.removeChild(child);
}
/**
 * 设置属性
 */
export function setInitialProps(dom: Instance, props: any) {
  for (const prop in props) {
    if (!Object.hasOwn(props, prop)) {
      continue;
    }
    if (prop === 'children') {
      if (typeof props.children === 'string' || typeof props.children === 'number') {
        dom.textContent = props.children;
      }
      continue;
    }
    dom.setAttribute(prop, props[prop]);
  }
}
