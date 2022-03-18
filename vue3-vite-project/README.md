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

``` npx husky-init  ```
``` npm install   ```



执行完毕之后会在项目的根目录出现一个.husky的目录，目录下有一个pre-commit文件，我们将npm test修改为我们需要执行的命令，示例代码如下：

#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint



```
"scripts": {
   "lint": "eslint src --fix --ext .js,.ts,.jsx,.tsx,.vue && prettier --write --ignore-unknown"
},
```

src：要验证的目标文件夹；
--fix：自动修复命令；
--ext：指定检测文件的后缀。


## lint-staged

我们配置好了husky后，会出现一个问题，就是我们不管是改动一行还是两行都会对整个项目进行代码检查和格式化，我们可以通过lint-staged这个工具来实现只对git暂存区中的内容进行检查和格式化，配置步骤如下：

第一步，安装lint-staged

yarn add lint-staged --dev
第二步，配置package.json

{
  "scripts": {},
  // 新增
  "lint-staged": {
    "*.{vue,js,ts,tsx,jsx}": [
      "eslint --fix",
      "prettier --write --ignore-unknown"
    ]
  },
}
第三步，修改.husky/pre-commit，修改内容如下：

#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
到这就配置完成了


## commit message 规范

优秀项目中commit message都是统一风格的，这样做的好处就是可以快速定位每次提交的内容，方便之后对版本进行控制。现在我们就来配置一下commit message 规范。

提交规范
安装commitizen

yarn add commitizen --dev
or 
npm install commitizen --dev 

配置项目提交说明，这里我们使用cz-conventional-changelog，或者选择cz-customizable，我们先进行安装

yarn add cz-conventional-changelog --dev
or
npm install cz-conventional-changelog --dev

修改package.json，代码如下：

"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
进行commit，通过cz这个cli工具

yarn cz # 或者 npx cz
第一步选择本次更新的类型，每个类型的作用如下表所示：

Type	作用
feat	新增特性
fix	修复 Bug
docs	修改文档
style	代码格式修改
refactor	代码重构
perf	改善性能
test	测试
build	变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm等）
ci	更改持续集成软件的配置文件和package.json中的scripts命令
chore	变更构建流程或辅助工具(比如更改测试环境)
revert	代码回退


第二步填写改变的作用域，可以写组件名或者文件名 第三步填写提交的信息 第四步填写提交的详细描述 第五步选择是否是一次重大的更改 第六步是否影响某个open issue 整个过程如下图 

我们也可以配置一个script，示例代码如下： package.json

"scripts": {
  "commit": "cz"
},

配置完成后我们可以通过yarn commit的方式提交代码了。