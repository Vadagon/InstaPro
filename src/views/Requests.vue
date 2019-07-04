<template>

  <v-container class="requests fill-height">
    
    <v-layout row wrap v-if="step==-1" justify-center>
      <v-progress-circular :size="120" :width="7" color="purple" indeterminate></v-progress-circular>
    </v-layout>

    <v-layout align-center v-if="step==0">
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
























    <v-layout align-start justify-start row wrap v-if="step > 0">
      <v-flex shrink pl-2 mt-2 v-if="step==1">
        <v-switch :label="'Select All ('+ task.posts.length+')'" v-model="selectAllPostModel" @change="selectAllPost()"></v-switch>
      </v-flex>
      <v-flex grow></v-flex>
      <v-flex shrink pl-2 class="floatingButtons">
        <v-btn v-if="step==2" fab color="primary" @click="BgTaskModal = true;">
          <v-icon color="white">{{task.repeating?'settings':'repeat'}}</v-icon>
        </v-btn>
      </v-flex>
      <v-flex sm12></v-flex>
      <v-flex xs12 v-if="step==2 && !task.finished">
        <span>{{task.status?task.status:'Bot will start working on this task soon'}}</span>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-flex>
    <v-layout align-center justify-center content-created row wrap mx-5 pa-4 v-if="step > 0 && task.dateCreated">
      <v-flex xs4 md3 v-for="s in task.accounts" mb-2>
        <v-layout align-left row wrap justify-left style="position: relative;">
          <v-list-tile-avatar v-bind:class="{'done-profile': s.done}">
            <img alt="profile" v-bind:src="s.profile_pic_url" v-bind:class="{'active-profile': s.checked}">
          </v-list-tile-avatar>
          <a v-bind:href="'https://www.instagram.com/'+s.username" target="_blank" class="body-2 mt-2 overflow-hidden" style="position: absolute; left: 55px; top: -14px; font-size: 12px !important; color: grey;">{{s.username}}</a>
          <span class="body-2 mt-2 overflow-hidden" style="font-size: 14px!important; width: calc(100% - 80px); text-align: left; margin-top: 12px !important;">{{s.full_name}}</span>
        </v-layout>
      </v-flex>
    </v-layout>
    </v-layout>

    <v-dialog v-model="BgTaskModal" scrollable max-width="600px" v-if="step > 0">
      <v-card>
        <v-card-title>Create a repeating task</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout align-center justify-left my-3 wrap>
            <v-flex xs10>
              <v-slider :label="'Accept all requests every'" v-model="task.settings.frequency" :max="50" :min="0"></v-slider>
            </v-flex>
            <v-flex style="text-align: left;" px-3 xs2>{{task.settings.frequency+' hours'}}</v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="BgTaskModal = false;">Close</v-btn>
          <v-flex> </v-flex>
          <v-btn color="blue darken-1" flat @click="createTask()" :disabled="!task.settings.frequency">{{task.repeating?'Save':'Create'}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>











  </v-container>
</template>

<!-- <HelloWorld title="Hey"/> -->

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'requests',
  data: () => ({
    length: 1,
    step: -1,
    commentModal: !1,
    TaskModal: !1,
    BgTaskModal: !1,
    window: 0,
    index: !1,
    created: false,
    selectAllAccModel: !0,
    task: {
      steps: [0, 0],
      draft: !0,
      followType: 'getFollowers',
      section: 'requests',
      comments: [],
      username: '',
      user: {},
      accounts: [],
      types: ['request'],
      type: 'request',
      repeating: false,
      descs: {
        like: 'Liking latest posts',
        follow: 'Follow all',
        unfollow: 'Unollow all',
        comment: 'Comment latest posts',
        request: 'Accept follow requests'
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
        this.task = _.cloneDeep(e.userData.tasks[this.taskNum])
        console.log(this.task)
        var num = this.task.steps.findIndex((e) => { return !e })
        num = num == -1 ? this.task.steps.length - 1 : num
        this.index = this.taskNum
        this.step = 2;
      })
    }else{
      this.step = 0;
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
      api.runtime.sendMessage({ why: 'tool', name: 'getRequestsList' }, (res) => {
        console.log(res);
        if(res){
          this.task.accounts = res.map((e)=>{
            e.checked = true;
            return e;
          })
          this.$set(this.task.steps, 0, 0)
          // this.$set(this.task.steps, 0, 3)
        }else{
          alert('error')
        }
      })
      // api.runtime.sendMessage({ why: 'tool', name: 'getUser', value: this.$root.user.username }, (response1) => {
      //   if (response1) {
      //     this.task.user = response1
      //     var after = ''
      //     var loadQue = () => {
      //       api.runtime.sendMessage({ why: 'tool', name: 'getFollowings', value: { id: this.task.user.id, after: after }, index: this.task.accounts.length }, (response2) => {
      //         after = response2.page_info.end_cursor
      //         if (!started) {
      //           this.$set(this.task.steps, 0, 3)
      //           started = !0
      //         }
      //         response2.nodes && this.task.accounts.push(...response2.nodes)

      //         if (response2.page_info.has_next_page && this.task.steps[0] == 3) {
      //           this.$root.timeout(function () { loadQue() }, this.$root.randB(10, 100))
      //         } else {
      //           this.$set(this.task.steps, 0, 0)
      //         }
      //       })
      //     }
      //     loadQue()
      //   } else {
      //     this.$set(this.task.steps, e, 0)
      //     // this.$parent.noty.enabled = true;
      //   }
      // })
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
    createTask () {
      this.BgTaskModal = false;
      if(this.task.repeating){
        this.$store.state.tasks[this.taskNum] = _.cloneDeep(this.task)
      }else{
        this.task.repeating = true;
        this.task.running = false;
        this.task.finished = false;
        this.task.timeStamp = undefined;
        this.task.dateCreated = new Date().getTime();
        this.task.accounts = [];
        this.task.id = this.$store.state.tasks.length;
        this.$store.state.tasks.push(_.cloneDeep(this.task))
        this.taskNum = this.$store.state.tasks.length-1;
        this.task = _.cloneDeep(this.$store.state.tasks[this.taskNum])
        this.$router.push({ path: '/' })
      }
      this.$root.save()
      this.$router.push({ path: '/' })
    },
    selectAllAcc () {
      this.task.accounts.map((e) => {
        e.checked = this.selectAllAccModel
        return e
      })
    },
    nextStep (e) {
      this.$set(this.task.steps, e, 2)
      this.task.id = this.$store.state.tasks.length;
      this.$store.state.tasks.push(_.cloneDeep(this.task))
      // this.taskNum = this.$store.state.tasks.length - 1;
      this.index = this.$store.state.tasks.length - 1

      this.$store.state.tasks[this.index].accounts = this.$store.state.tasks[this.index].accounts.filter(e => e.checked)
      this.$store.state.tasks[this.index].uni = new Date().getTime()
      this.$store.state.tasks[this.index].dateCreated = new Date().getTime()
      this.$store.state.tasks[this.index].enabled = !0
      this.$root.save()
      // this.$store.state.tasks.push(this.task)
      this.$router.push({ path: '/' })
      console.log(this.task)
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
