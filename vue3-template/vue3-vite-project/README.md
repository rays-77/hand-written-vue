# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## 代码规范

随着团队的不断扩大，每个人都有自己的coding风格，但是如果一个项目中的代码存在多种风格，那对于代码的可维护性和可读性都大大减少，所以说一个项目规范对于前端团队来说的重要性。

ESlint+Prettier
这两个工具一个是进行代码风格检查，另一个是格式化工具，现在我们开始配置。

第一步，安装相关依赖：

``` 
yarn add eslint eslint-plugin-vue eslint-define-config --dev # eslint
或
npm install eslint eslint-plugin-vue eslint-define-config --dev

yarn add prettier eslint-plugin-prettier @vue/eslint-config-prettier --dev  # prettier
npm install prettier eslint-plugin-prettier @vue/eslint-config-prettier --dev
或

yarn add @vue/eslint-config-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser --dev # 对ts的支持
或
npm install @vue/eslint-config-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser --dev 

```


第二步，编写对应配置文件

```.eslintrc.js```

```.eslintignore```

```.prettierrc```


第三步，配置 husky git commit前，push前进行验证
husky是一个Git Hook，可以帮助我们对commit前，push前以及commit提交的信息进行验证，现在我们就来安装并配置一下这个工具，首先通过自动配置命令安装，命令如下：

npx husky-init && npm install  # npm