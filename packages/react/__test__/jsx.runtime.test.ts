import { jsx } from '../jsx-runtime';

describe('jsx函数测试', () => {
  test('标准的元素', () => {
    const element = jsx('div', { className: 'container', id: 'div1' }, 'key1');
    expect(element).toEqual({
      $$typeof:
        typeof Symbol === 'function' && Symbol.for ? Symbol.for('react.element') : 'react.element',
      type: 'div',
      props: { className: 'container', id: 'div1' },
      key: 'key1',
      ref: null,
    });
  });

  test('没有key的情况', () => {
    const element = jsx('span', { children: 'Hello World' });
    expect(element.type).toBe('span');
    expect(element.props).toEqual({ children: 'Hello World' });
    expect(element.key).toBeNull();
  });

  test('props中包含key的情况', () => {
    const props = {
      id: 'div1',
      key: 'key1',
    };
    const element = jsx('p', { ...props });
    expect(element.type).toBe('p');
    expect(element.key).toBe('key1');
  });

  test('ref属性的处理', () => {
    const ref = {};
    const element = jsx('div', { ref });
    expect(element.ref).toBe(ref);
  });
});
