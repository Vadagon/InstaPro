<template>
  <div class="comments">
    <v-layout align-left mb-3>
      <v-flex justify-left>
        <!-- <h3 class="display-0 mb-4 mt-0">Create a list of Comments</h3> -->
        <v-layout align-left justify-center row wrap class="mb-3">
          <v-flex sm12 v-for="(x, index) in task.comments" class="CommentsTable">
            <div>
              {{x}}
              <span @click="task.comments.splice(index, 1);"><v-icon color="accent">close</v-icon></span>
            </div>
          </v-flex>
          <v-flex sm12 class="addNewCommentField">
            <span> <v-text-field label="Comment example" solo v-model="nextComment"></v-text-field> </span>
            <v-btn color="primary" @click="task.comments.push(nextComment); nextComment=''"><v-icon color="white">plus_one</v-icon></v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Comments',
  props: ['task'],
  data() {
    return {
      nextComment: ''
    }
  },
  created(){
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
