module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'handle-callback-err': 0, // nodejs 处理错误
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 禁止使用console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁止使用debugger
    'no-unused-vars': [0, {
      // 允许声明未使用变量
      vars: 'local',
      // 参数不检查
      args: 'none'
    }],
    'no-undef': 0, // 不能有未定义的变量
    'no-async-promise-executor': 0, // 将异步功能用作Promise执行器
    'vue/no-unused-vars': 0, // 未使用的变量
    'standard/no-callback-literal': 0,
    'node/handle-callback-err': 0,
    'node/no-callback-literal': 0,
    'array-callback-return': 0
  }
}
