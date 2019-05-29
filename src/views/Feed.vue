<template>

  <v-container class="feed fill-height">
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
                    <v-icon>group_work</v-icon>
                  </v-avatar>
                  <strong class="title">Actions</strong>
                  <v-spacer></v-spacer>
                </v-layout>
                <v-layout align-center justify-center mb-3>
                  <v-flex xs8>
                    <v-slider label="Limit" v-model="task.settings.amount" :max="1000" :min="1"></v-slider>
                  </v-flex>
                  <v-flex style="text-align: left;" px-3 xs2>{{task.settings.amount}} latest posts</v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-window-item>

        </v-window>

        <v-btn color="primary" class="next" @click="nextStep(window)" v-if="task.steps[window]!=2" :disabled="task.steps[window]==1">
          <span v-if="task.steps[window]==0 && window<task.steps.length-1">continue</span>
          <v-progress-circular indeterminate color="primary" :size="20" :width="2" v-if="task.steps[window]==1"></v-progress-circular>
          <span v-if="window==task.steps.length-1">finish</span>
        </v-btn>
        <v-btn color="warning" class="next" @click="nextStep(window)" v-if="task.steps[window]==2">re continue</v-btn>

      </v-flex>
    </v-layout>

    

    <v-layout align-start justify-start row fill-height wrap v-if="step > 0">
      <v-flex shrink pl-2 mt-2 v-if="step==1">
        <v-switch :label="'Select All ('+ task.posts.length+')'" v-model="selectAllAccModel" @change="selectAllAcc()"></v-switch>
      </v-flex>
      <v-flex grow></v-flex>
      <v-flex shrink pl-2 class="floatingButtons">
        <v-btn v-if="step==1" fab color="primary" @click="TaskModal = true;">
          <v-icon color="white">play_arrow</v-icon>
        </v-btn>
        <v-btn v-if="step==2" fab color="primary" @click="BgTaskModal = true;">
          <v-icon color="white">{{task.repeating?'settings':'repeat'}}</v-icon>
        </v-btn>
      </v-flex>
      <v-flex sm12></v-flex>
      <v-flex xs12 v-if="step==2 && !task.finished">
        <span>{{task.status?task.status:'Bot will start working on this task soon'}}</span>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-flex>

      <v-flex md4 lg2 xs6 v-for="x in task.posts" pa-2 class="postCard" :class="{'finishedPost':x.done}" v-if="!(x > 0)">
        <v-layout class="elevation-1 white" :class="{'selected': x.selected}" column >
          <v-flex class="postDetails">
            <vuetify-lazy-image :src="x.display_url" aspectRatio="1"></vuetify-lazy-image>
            <div class="hoverdetails" @click="step!=2?x.selected=!x.selected:0">
              <v-layout align-start justify-start row fill-height>
                <!-- <v-flex shrink class="overflow-hidden text-truncate text-no-wrap body-1 pl-1">jisoo_kim_250</v-flex> -->
                <v-flex></v-flex>
                <v-flex shrink>
                  <v-checkbox shrink type="checkbox" v-model="x.selected" v-if="step==1"></v-checkbox>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
          <v-flex pa-1>
            <v-layout row>
              <v-flex shrink>
                <v-icon color="pink lighten-2" style="font-size: 18px;" class="mx-1">favorite_border</v-icon>
                <span class="caption grey--text text--darken-2" v-if="x.edge_media_preview_like">{{x.edge_media_preview_like.count}}</span>
              </v-flex>
              <v-flex></v-flex>
              <a v-bind:href="'https://www.instagram.com/p/'+x.shortcode" target="_blank" flex shrink>
                <v-icon color="grey darken-4" @click="" style="font-size: 18px;" class="mx-1">open_in_new</v-icon>
              </a>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex v-else xs12 class="display-1 taskHead">{{$root.parsedDate(x)}}</v-flex>




    </v-layout>


    <v-dialog v-model="TaskModal" scrollable max-width="300px">
      <v-card>
        <v-card-title>Start a task</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-layout row wrap>
            <v-flex xs8>
              <v-checkbox :label="'Like all'" v-model="task.types" :value="'like'" my-0 py-0></v-checkbox>
            </v-flex>
            <v-flex xs8>
              <v-checkbox :label="'Comment all'" v-model="task.types" :value="'comment'"></v-checkbox>
            </v-flex>
          </v-layout>
          <!-- </v-radio-group> -->
          <l-comments :task="task" v-if="task.types.includes('comment')" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="TaskModal = false;">Close</v-btn>
          <v-flex> </v-flex>
          <v-btn color="blue darken-1" flat @click="step2()">Start</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="BgTaskModal" scrollable max-width="600px">
      <v-card>
        <v-card-title>Create a repeating task</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout align-center justify-left my-3 wrap>
            <v-flex xs10>
              <v-slider :label="task.types.toString()+' '+task.settings.amount+' latest posts every'" v-model="task.settings.frequency" :max="50" :min="0"></v-slider>
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

    <v-layout row wrap v-if="step==-1" justify-center>
      <v-progress-circular :size="120" :width="7" color="purple" indeterminate></v-progress-circular>
    </v-layout>


  </v-container>
</template>

<!-- <HelloWorld title="Hey"/> -->

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Comments from '@/components/Comments.vue'

export default {
  name: 'target',
  data: () => ({
    length: 1,
    step: 0,
    window: 0,
    index: !1,
    selectAllAccModel: !0,
    TaskModal: !1,
    BgTaskModal: !1,
    task: {
      uni: new Date().getTime(),
      repeating: false,
      steps: [0],
      draft: !0,
      followType: 'getFollowers',
      section: 'feed',
      username: '',
      user: {},
      posts: [],
      accounts: [
        {
          username: 'test',
          checked: !1
        }
      ],
      comments: [],
      types: ['like'],
      type: 'like',
      descs: {
        like: 'Liking my feed',
        follow: 'Follow all',
        unfollow: 'Unollow all',
        comment: 'Comment latest posts'
      },
      settings: {
      	frequency: 0,
        amount: 50
      },
      enabled: !0
    }
  }),
  props: ['taskNum'],
  mounted () {
    if (this.taskNum != undefined) {
      api.runtime.sendMessage({ why: 'getData' }, (e) => {
        this.task = e.userData.tasks[this.taskNum]
      })
      this.step = 2;
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
        this.task.dateCreated = new Date().getTime();
        this.task.running = false;
        this.task.finished = false;
        this.task.timeStamp = undefined;
        this.task.posts = [];
        this.task.id = this.$store.state.tasks.length;
        this.$store.state.tasks.push(_.cloneDeep(this.task))
        this.taskNum = this.$store.state.tasks.length-1;
        this.task = _.cloneDeep(this.$store.state.tasks[this.taskNum])
        this.$router.push({ path: '/' })
      }
      this.$root.save();
    },
  	descriptionChange () {
      this.task.description = this.descs[this.task.types[0]]
    },
    selectAllAcc () {
      this.task.posts.map((e) => {
        e.selected = this.selectAllAccModel
        return e
      })
    },
    nextStep (e) {
      this.step = -1;
      this.step1();
    },
    step1(){
      var i = 0
      api.runtime.sendMessage({ why: 'tool', name: 'myFeed', value: { name: '', count: this.task.settings.amount } }, (response1) => {
        if (response1) {
          console.log(response1)
          response1.forEach((e) => {
            e.selected = true
          })
          this.task.posts.push(...response1)
        }
        this.step = 1;
      })
    },
    step2(){
      this.step = 2
      this.TaskModal = false
      this.task.posts = this.task.posts.filter(e => e.selected)
      this.task.posts.forEach((e) => {
        e.selected = false
        e.liked = false
      })
      this.task.dateCreated = new Date().getTime();
      this.task.settings.frequency = 0
      this.task.repeating = false;
      this.task.id = this.$store.state.tasks.length;
      this.$store.state.tasks.push(_.cloneDeep(this.task))
      this.$router.push({ path: '/' })
      this.$root.save()
    }
  },
  components: {
    'l-comments': Comments
  }
}
</script>
