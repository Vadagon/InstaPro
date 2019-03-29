<template>
  <v-container class="dashboard fill-height">
    <v-layout align-center>
      <v-card color="blue-grey darken-2" class="white--text" style="max-width: 360px;" v-for="x in data.tasks">
          <v-card-title primary-title>
            <div>
              <div class="headline">Liking posts of {{x.username}}'s followers</div>
              <!-- <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span> -->
            </div>
          </v-card-title>
          <v-card-actions>
            <v-switch label="enable" v-model="x.enabled" @change="save()"></v-switch>
          </v-card-actions>
        </v-card>
      </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'dashboard',
  data: () => ({

  }),
  computed: {
    data () {
      return this.$store.state
    }
  },
  methods: {
    save () {
      console.log(this.$store.state.tasks[0].enabled)
    }
  }
}
</script>
