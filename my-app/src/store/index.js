import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
  namespaced: true,
  state: {
    textA: 'A'
  },
  getters: {
    getTextA: state => state.textA
  },
  mutations: {
    setTextA: (state, newText) => {
      state.textA = newText
    }
  },
  actions: {
    setTextA: ({ commit }, newText) => {
      commit('setTextA', newText)
    }
  }
}

const moduleB = {
  state: {
    textB: 'B',
    text: 'aiueo'
  },
  getters: {
    getTextB: state => state.textB
  },
  mutations: {
    setTextB: (state, newText) => {
      state.textB = newText
    }
  },
  actions: {
    setTextB: ({ commit }, newText) => {
      commit('setTextB', newText)
    }
  }
}

export default new Vuex.Store({
  state: {
    count: 0,
    text: '',
    text2: 'text2',
    todos: [
      { id: 1, text: 'Todo1', done: true },
      { id: 2, text: 'Todo2', done: false }
    ]
  },
  getters: {
    doneTodos: state => state.todos.filter(todo => todo.done),
    doneTodosCount: (state, getters) => getters.doneTodos.length,
    getTodoById: (state) => (id) => state.todos.find(todo => todo.id === id)
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    incrementN: (state, n = 1) => {
      state.count += Number(n)
    },
    setText: state => {
      state.text = 'textdayo'
    },
    setTextAny: (state, payload) => {
      state.text = payload.text
    }
  },
  actions: {
    incrementAsync: ({ commit }) => {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    incrementAsyncN: ({ commit }, n) => {
      setTimeout(() => {
        commit('incrementN', n)
      }, 1000)
    }
  },
  modules: {
    a: moduleA,
    b: moduleB
  }
})
