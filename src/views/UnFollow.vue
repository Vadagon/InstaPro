<template>

  <v-container class="unfollow fill-height">
    <v-layout align-center>
      <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex">
        <v-item v-for="n in length" :key="n">
          <div slot-scope="{ active, toggle }">
            <v-btn :input-value="active" icon @click="toggle">
              <v-icon>fiber_manual_record</v-icon>
            </v-btn>
          </div>
        </v-item>
      </v-item-group>

      <v-flex class="text-xs-center">
        <v-window v-model="window" class="elevation-1" vertical>

          <v-window-item :key="0">
            <v-card flat>
              <v-card-text>
                <v-layout align-center mb-3>
                  <v-avatar color="purple lighten-5" class="mr-3">
                    <v-icon>supervisor_account</v-icon>
                  </v-avatar>
                  <strong class="title">Accounts</strong>
                  <v-spacer v-for="c in 14"></v-spacer>
                  <v-switch v-if="!created" :label="'Select All ('+task.accounts.length+')'" v-model="selectAllAccModel" @change="selectAllAcc()"></v-switch>
                </v-layout>
                <v-layout align-left row wrap justify-left mb-4 pt-3>
                    <!-- <v-flex shrink>
                      <v-switch label="Select All" v-model="selectAllAccModel" @change="selectAllAcc()"></v-switch>
                    </v-flex> -->
                    <v-flex xs4 md3 v-for="s in task.accounts" mb-2>
                      <v-layout align-left row wrap justify-left>
                        <v-list-tile-avatar v-bind:class="{'done-profile': s.done}">
                          <img @click="s.checked = created?created:!s.checked" alt="profile" v-bind:src="s.profile_pic_url" v-bind:class="{'active-profile': s.checked}">
                        </v-list-tile-avatar>
                        <a v-bind:href="'https://www.instagram.com/'+s.username" target="_blank" class="body-2 mt-2 overflow-hidden" style="position: absolute; left: 55px; top: -14px; font-size: 12px !important; color: grey;">{{s.username}}</a>
                        <span class="body-2 mt-2 overflow-hidden" style="font-size: 14px!important; width: calc(100% - 80px); text-align: left; margin-top: 12px !important;">{{s.full_name}}</span>
                      </v-layout>
                    </v-flex>
                </v-layout>

              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item :key="1" v-if="!created">
            <v-card flat>
              <v-card-text>
                <v-layout align-center mb-3>
                  <v-avatar color="purple lighten-5" class="mr-3">
                    <v-icon>group_work</v-icon>
                  </v-avatar>
                  <strong class="title">Actions</strong>
                  <v-spacer></v-spacer>
                </v-layout>
                <v-layout align-center justify-center mb-3 wrap>
                  <span> <v-checkbox v-model="task.settings.dFollowedByMe" label="Don't unfollow people that follow me"></v-checkbox> </span>
                  <v-flex xs12 />
                  <span> <v-checkbox v-model="task.settings.dVerified" label="Don't unfollow verified accounts"></v-checkbox> </span>
                </v-layout>
               <!--  <v-layout align-center justify-center mb-4 wrap style="text-align: center">
                   <v-flex sm8> <h2>No settings for the task</h2> </v-flex>
                   <v-flex sm8 mb-3> <h4>It will run automatically and only once</h4> </v-flex>
                </v-layout> -->

              </v-card-text>
            </v-card>
          </v-window-item>

        </v-window>

        <v-btn color="primary" class="next" @click="nextStep(window)" v-if="!created && task.steps[window]!=2" :disabled="task.steps[window]>0">
          <span v-if="task.steps[window]==0 && window<task.steps.length-1">continue</span>
          <v-progress-circular indeterminate color="primary" :size="20" :width="2" v-if="task.steps[window]>0"></v-progress-circular>
          <span v-if="window==task.steps.length-1">finish</span>
        </v-btn>
        <v-btn color="warning" class="next" @click="nextStep(window)" v-if="!created && task.steps[window]==2">re continue</v-btn>
        <v-btn @click="$set(task.steps, 0, 0)" v-if="!created && task.steps[window]==3" style="min-width: 30px; margin-left: 0;" color="white" class="next"><v-icon color="red">close</v-icon></v-btn>

      </v-flex>
    </v-layout>

    <br><br>
  </v-container>
</template>

<!-- <HelloWorld title="Hey"/> -->

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'target',
  data: () => ({
    length: 1,
    window: 0,
    index: !1,
    created: false,
    selectAllAccModel: !0,
    task: {
      steps: [0, 0],
      draft: !0,
      followType: 'getFollowers',
      section: 'unfollow',
      comments: [],
      username: '',
      user: {},
      accounts: [],
      types: ['unfollow'],
      type: 'unfollow',
      repeating: false,
      descs: {
        like: 'Liking latest posts',
        follow: 'Follow all',
        unfollow: 'Unollow all',
        comment: 'Comment latest posts'
      },
      settings: {
        amount: 100,
        frequency: 0,
        dFollowedByMe: !1,
        dVerified: !1
      },
      enabled: !0
    }
  }),
  props: ['taskNum'],
  mounted () {
    if (this.taskNum != undefined) {
      this.created = true;
      api.runtime.sendMessage({ why: 'getData' }, (e) => {
        this.task = e.userData.tasks[this.taskNum]
        console.log(this.task)
        var num = this.task.steps.findIndex((e) => { return !e })
        num = num == -1 ? this.task.steps.length - 1 : num
        this.length = 1;
        this.window = num
        this.index = this.taskNum
      })
    }
    this.$root.interval(()=>{
      if (this.taskNum != undefined) {
        api.runtime.sendMessage({ why: 'getData' }, (e) => {
          var task = e.userData.tasks[this.taskNum];
          var dump = this.task.settings;
          this.task = task
          this.task.settings = dump
        })
      }
    }, 6000);
    if(!this.created){
      this.$set(this.task.steps, 0, 1)
      var started = !1
      api.runtime.sendMessage({ why: 'tool', name: 'getUser', value: this.$root.user.username }, (response1) => {
        if (response1) {
          this.task.user = response1
          var after = ''
          var loadQue = () => {
            api.runtime.sendMessage({ why: 'tool', name: 'getFollowings', value: { id: this.task.user.id, after: after }, index: this.task.accounts.length }, (response2) => {
              after = response2.page_info.end_cursor
              if (!started) {
                this.$set(this.task.steps, 0, 3)
                started = !0
              }
              response2.nodes && this.task.accounts.push(...response2.nodes)

              if (response2.page_info.has_next_page && this.task.steps[0] == 3) {
                this.$root.timeout(function () { loadQue() }, this.$root.randB(10, 100))
              } else {
                this.$set(this.task.steps, 0, 0)
              }
            })
          }
          loadQue()
        } else {
          this.$set(this.task.steps, e, 0)
          // this.$parent.noty.enabled = true;
        }
      })
    }
  },
  created () {

  },
  computed: {
    data () {
      return this.$store.state
    }
  },
  methods: {
    selectAllAcc () {
      this.task.accounts.map((e) => {
        e.checked = this.selectAllAccModel
        return e
      })
    },
    nextStep (e) {
      this.$set(this.task.steps, e, 1)
      var next = () => {
        this.$set(this.task.steps, e, 2)
        if (e == 0 && !this.index) {
          this.task.id = this.$store.state.tasks.length;
          this.$store.state.tasks.push(_.cloneDeep(this.task))
          // this.taskNum = this.$store.state.tasks.length - 1;
          this.index = this.$store.state.tasks.length - 1

        } else {
          this.$store.state.tasks[this.index] = _.cloneDeep(this.task)
        }
        if (e < this.task.steps.length - 1) {
          this.window = e + 1
          this.length = e + 2
        } else {
          this.$store.state.tasks[this.index].accounts = this.$store.state.tasks[this.index].accounts.filter(e => e.checked)
          this.$store.state.tasks[this.index].uni = new Date().getTime()
          this.$store.state.tasks[this.index].dateCreated = new Date().getTime()
          this.$store.state.tasks[this.index].enabled = !0
          this.$root.save()
          // this.$store.state.tasks.push(this.task)
          this.$router.push({ path: '/' })
        }
        for (var i = this.window.length + 1; i < this.task.steps.length; i++) {
          this.$set(this.task.steps, i, 0)
        }
      }
      if (e == 1) {
        next()
      } else {
        next()
      }
      console.log(this.task)
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
