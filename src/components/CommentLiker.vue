<template>
  <div class="commentLiker">
    <v-layout align-left mb-3 row>
        <v-slider :label="task.settings.lastComments+' latest comment'+(task.settings.lastComments>1?'s':'')" v-model="task.settings.lastComments" :max="5" :min="1"></v-slider>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Comments',
  props: ['task'],
  data () {
    return {
      nextComment: ''
    }
  },
  created () {
    // console.log(this.$parent.$parent)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
