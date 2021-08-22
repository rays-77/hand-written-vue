// 1.hash #/about
// 2.history api /about

//根据url显示对应的内容
//监听一个变量current -> 利用数据响应式，当current变化的时候
//每一个组件都有一个render函数执行的结果-> 得到vdom虚拟dom ->得到真实dom


// 3.实现install方法:vue.use方法就是 调用了install方法
// $router 注册
// 两个全局组件

let Vue // 引用构造函数 VueRouter中要用


//1.实现一个插件
//2.实现VueRouter：处理路由选项；监控url变化,hashchange；响应这个变化，动态渲染
class VueRouter {

    constructor(options) {
        // 保存选项
        this.$options = options

        //监控url变化，需要响应式的curren
        const url = window.location.hash.slice(1) || '/'

        // 设置响应式属性
        Vue.util.defineReactive(this, 'current', url)
        this.current = '/'

        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }

    onHashChange() {
        this.current = window.location.hash.slice(1)
    }
}

// 插件要求实现install（vue调用use的时候）
VueRouter.install = function(_vue) {
    Vue = _vue;

    Vue.mixin({
        beforeCreate() {
            //挂载$router, 以后每一个组件都会调用这个方法。
            if (this.$options.router) {
                //只有根实例new Vue的时候才会进入该逻辑。
                //此时的上下文this.是当前组件实例
                Vue.prototype.$router = this.$options.router
            }
        }
    })



    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            //<router-link to="#/about">abc</router-link>
            return h('a', {
                    attrs: {
                        href: `#${this.to}`
                    }
                }, this.$slots.default) //插槽slots
        }
    })

    Vue.component('router-view', {
        render(h) {
            let component = null;
            //从this.$router.$options中获取routes对象
            const route = this.$router.$options.routes.find(
                route => route.path === this.$router.current
            )

            if (route) {
                component = route.component
            }
            return h(component)
        }
    })
}

export default VueRouter