<template>
  <div class="home">
    __1__
    <img alt="Vue logo" src="../assets/logo.png">
    __1.5__
    <HelloWorld title="Hey"/>
    __2__
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
