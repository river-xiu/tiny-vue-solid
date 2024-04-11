## 这是一个 Tiny-Vue 适配 Solid-JS 的组件工程

-- 通过 `slid-common` 和自研的 `vue-vite-template2jsx` 插件完全复用 `renderless` 逻辑和 `vue` 模板文件

### solid-common实现api清单

1、实现响应式数据state（使用solid-js/store包的createMutable，可以完全模拟vue的reactive）
2、实现vue的计算属性（难点：因为renderless的特殊嵌套写法，所以要求computed的实现必须要是异步的，所以无法复用solid的框架的createMemo特性，需要自己实现一套异步的计算属性API）
3、实现vue的watch
4、实现vue的watchEffect
5、实现vue的事件监听API可以绑定点击事件
6、实现vue的emit可以向外触发绑定事件的方法
7、实现vue的nextTick，可以在下个微服务异步队列执行某段逻辑
8、实现vue的生命周期函数：onMounted、onBeforeUnmount

### vue-vite-template2jsx实现功能清单

1、class 支持数组、对象
2、支持 transition、transition-group
3、支持不带参数插槽展示
4、支持组件默认值提取、设置
5、支持 Icon 图标组件以及嵌套使用
6、支持 Button 组件全部功能
7、支持 Alert 组件全部功能
8、支持 Switch 组件全部功能
9、支持动态组件功能

### 本地solid开发环境

-- 在根目录执行：`pnpm dev:solid` 即可查看效果.

### 构建solid组件库

构建所有solid组件：pnpm build:solid -t 3.15.0

构建一个solid组件：pnpm build:solid button -t 3.15.0

### 发布solid组件库

pnpm pub:solid
