import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import clear from 'rollup-plugin-clear'

export default {
  input: 'src/main.ts', // 入口文件
  output: [
    {
      dir: 'dist/dist.js', // 输出文件
      format: 'esm', // ES Module 格式
      sourcemap: true, // 启用 sourcemap
    },
  ],
  plugins: [
    resolve(), // 解析 node_modules 中的模块
    commonjs(), // 将 CommonJS 转为 ES Module
    typescript(), // 处理 TypeScript
    clear({
      targets: ['dist'],
    }),
  ],
}
