//申明一个插件
//声明一个类Store

let Vue;

class Store {

    constructor(options) {
        //1.选项处理
        this.$options = options

        this._mutations = options.mutations;
        this._actions = options.actions
        this._getters = options.getters

        let that = this;

        //2.响应式state,使用vue实例，使state响应式
        this._vm = new Vue({
            data: {
                $$state: options.state
            },
            computed: {
                cacheGetters: function() {
                    return function(key) {
                        return that._getters[key](that.state)
                    }
                }
            }
        })

        //绑定this.
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);

        //暴露api
        this.getters = {}

        //使用Vue实例让getters响应式
        Object.keys(this._getters).forEach(key => {
            // Object.defineProperty(obj, prop, descriptor)
            // obj，表示要定义属性的对象,
            // prop，是要定义或者更改的属性名字，
            // descriptor,描述符，来定义属性的具体描述
            Object.defineProperty(this.getters, key, { //实现双向数据绑定
                get: () => {
                    return that._vm.cacheGetters(key)
                },
            })
        })
    }

    //暴露给外界调用ge方法
    get state() {
        console.log(`this._vm._data->${JSON.stringify(this._vm._data)}`);
        console.log(`this._vm.$data->${JSON.stringify(this._vm.$data)}`);
        return this._vm._data.$$state
    }

    set state(val) {
        console.warn("please use replaceState to reset state!!!")
    }

    commit(type, payload) {
        const entry = this._mutations[type]
        if (!entry) {
            console.error('unknow mutation type!!!')
            return
        }
        entry(this.state, payload);
    }

    dispatch(type, payload) {
        const entry = this._actions[type]
        if (!entry) {
            console.error('unknow actions type!!!')
            return
        }
        entry(this, payload);
    }

    getters() {}

}

function install(_vue) {
    Vue = _vue


    Vue.mixin({
        beforeCreate() {
            if (this.$options.store)
                Vue.prototype.$store = this.$options.store
        }
    })
}


//导出对象：vuex
export default { Store, install }