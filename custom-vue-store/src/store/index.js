import Vue from 'vue'
import Vuex from './custom-vue-store'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        counter: 1
    },
    mutations: {
        add(state) {
            state.counter++
        },
        jian(state) {
            state.counter--
        }
    },
    actions: {
        add({
            commit
        }) {
            setTimeout(() => {
                commit('add')
            }, 1000);
        }
    },
    getters: {
        doubleCounter(state) {
            return state.counter * 2
        },
        threeCounter(state) {
            return state.counter * 3
        }
    },
    modules: {}
})