const fs = require('node:fs');

const msgFile = process.argv[2];
const msg = fs.readFileSync(msgFile, 'utf8').trim();

const pattern = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?:\s.+/;

if (!pattern.test(msg)) {
  console.log('❌ 提交信息格式不正确!');
  console.log('');
  console.log('格式应为: type(scope?): description');
  console.log('');
  console.log('type 可选值:');
  console.log('  feat     - 新功能');
  console.log('  fix      - 修复 bug');
  console.log('  docs     - 文档变更');
  console.log('  style    - 代码格式');
  console.log('  refactor - 重构');
  console.log('  perf     - 性能优化');
  console.log('  test     - 测试相关');
  console.log('  build    - 构建相关');
  console.log('  ci       - CI 配置');
  console.log('  chore    - 其他杂项');
  console.log('');
  console.log('示例:');
  console.log('  feat: add new feature');
  console.log('  fix(auth): resolve login issue');
  process.exit(1);
}
