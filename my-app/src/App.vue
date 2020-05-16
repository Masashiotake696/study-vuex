<template>
  <div id="app">
    <p>Count: {{ count }}</p>
    <div>
      <button @click="increment">+</button>
      <button @click="incrementAsync">+ (Async)</button>
      <button @click="decrement">-</button>
    </div>
    <div>
      <input type="number" v-model="incrementNumber" min="1">
      <button @click="incrementN(incrementNumber)">+N</button>
      <button @click="incrementAsyncN(incrementNumber)">+N(Async)</button>
    </div>
    <hr>
    <p>StoreText: {{ text }}</p>
    <p>LocalText: {{ localText }}</p>
    <p>StoreText + LocalText: {{ textPlusLocalText }}</p>
    <p>StoreText2: {{ text2 }}</p>
    <hr>
    <p>ALL TODOS (DONE Count {{ doneCount }}) </p>
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
      >
        {{ todo.id }}: {{ todo.text }}
      </li>
    </ul>
    <p>DONE TODOS</p>
    <ul>
      <li
        v-for="todo in doneTodos"
        :key="todo.id"
      >
        {{ todo.id }}: {{ todo.text }}
      </li>
    </ul>
    <hr>
    <p>IDが1のレコード</p>
    <p>{{ getTodoById(1) }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      localText: 'Hello!',
      incrementNumber: 0
    }
  },
  mounted () {
    this.$store.commit('setText')
    console.log(this.$store.state)
    console.log(this.$store.getters)
    console.log(this.$store._mutations)
    console.log(this.$store._actions)
  },
  computed: {
    count () {
      return this.$store.state.count
    },
    ...mapState({
      text: state => state.text,
      textAlias: 'text',
      textPlusLocalText (state) {
        return state.text + ' ' + this.localText
      }
    }),
    ...mapState([
      'text2',
      'todos'
    ]),
    doneTodos () {
      return this.$store.getters.doneTodos
    },
    getTodoById () {
      return id => this.$store.getters.getTodoById(id)
    },
    ...mapGetters([
      'doneTodosCount'
    ]),
    ...mapGetters({
      doneCount: 'doneTodosCount'
    })
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    },
    decrement () {
      this.$store.commit('decrement')
    },
    incrementN (n) {
      this.$store.commit('incrementN', n)
    },
    incrementAsync () {
      this.$store.dispatch('incrementAsync')
    },
    incrementAsyncN (n) {
      this.$store.dispatch('incrementAsyncN', n)
    },
    setTextAny (payload) {
      this.$store.commit('setTextAny', payload)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
