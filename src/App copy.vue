<!-- <template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template> -->
<template>
  <div id="app">
    <h1>首页</h1>
    <li>
      <router-link to="/list">list</router-link>
    </li>
    <li>
      <router-link to="/button">button</router-link>
    </li>
    <li>
      <router-link to="/users">users</router-link>
    </li>

    <router-view></router-view>
  </div>
</template>

<!-- <script>
  import Menu from './views/TestElementUI.vue'
  export default {
    components: { Menu },
    name: 'App'
  }
</script> -->



<!-- <script>
// import HelloWorld from './components/HelloWorld.vue'

// export default {
//   name: 'App',
//   components: {
//     HelloWorld
//   }
// }
</script> -->

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
