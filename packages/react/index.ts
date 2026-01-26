const ReactSharedInternals: any = {
  H: null,
};

// 1. 导出一个变量
// 2. 根据不同情况设置不同的值
function useState(initialState: any) {
  return ReactSharedInternals.H(initialState);
}

const version = '1.0.0';

export { version, ReactSharedInternals, useState };
