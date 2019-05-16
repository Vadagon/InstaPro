<template>

  <v-container class="locations fill-height">

    <v-layout row wrap v-if="step==-1" justify-center>
      <v-progress-circular :size="120" :width="7" color="purple" indeterminate></v-progress-circular>
    </v-layout>

    <v-layout align-center justify-center row fill-height v-if="step==0">
      <v-flex md8 xs10 class="elevation-1 white" px-3 pt-3>
        <v-layout align-center column mb-3>
          <v-avatar :size="100" color="purple lighten-5" class="mr-3 mb-3">
            <v-icon style="font-size: 66px;">location_on</v-icon>
          </v-avatar>
          <strong class="title">Enter Locations to Load</strong>
        </v-layout>
        <v-layout align-left column wrap justify-left mb-4 pt-3>
          <v-combobox multiple v-model="task.filters" label="Locations" append-icon chips deletable-chips class="tag-input location" @keyup.tab="updateTags" @paste="updateTags">
          </v-combobox>
        </v-layout>
        <v-layout align-center justify-center wrap>
          <v-flex>
            <v-slider label="Limit" v-model="task.settings.amount" :max="task.filters.length*200" :min="1"></v-slider>
          </v-flex>
          <v-flex style="text-align: left;" pl-3 shrink>{{task.settings.amount}} latest posts ({{Math.round(task.settings.amount/task.filters.length)}} per location)</v-flex>
        </v-layout>
        <v-layout align-center justify-center wrap>
          <v-btn color="primary" class="next-v2" @click="step1()" :disabled="!task.filters.length">
            <span>continue</span>
          </v-btn>
        </v-layout>

      </v-flex>
    </v-layout>

      <!--      <v-btn-toggle v-model="task.actionTools">
              <v-btn :value="'like'" flat>
                <span>Like</span>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn :value="'comment'" flat @click.stop="task.actionTools.includes('comment')?0:commentModal = true">
                <span>Comment</span>
                <v-icon>add_comment</v-icon>
              </v-btn>
              <v-btn :value="'follow'" flat>
                <span>Follow</span>
                <v-icon>person_add</v-icon>
              </v-btn>
            </v-btn-toggle>
 -->

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

      <v-flex md4 lg2 xs6 v-for="x in task.posts" pa-2 class="postCard" :class="{'finishedPost':x.done}" v-if="!x.length">
        <v-layout class="elevation-1 white" :class="{'selected': x.selected}" column >
          <v-flex class="postDetails">
            <v-img :src="x.thumbnail_src"></v-img>
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
                <span class="caption grey--text text--darken-2">{{x.edge_liked_by.count}}</span>
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




    <v-dialog v-model="commentModal" scrollable max-width="300px">
      <v-card>
        <v-card-title>Create a list of Comments</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <l-comments :task="task" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="commentModal = false; task.comments.length?task.actionTools.splice(task.actionTools.indexOf('comment'), 1):0">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="commentModal = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="TaskModal" scrollable max-width="300px">
      <v-card>
        <v-card-title>Start a task</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group v-model="task.type">
            <v-radio :label="'Like all'" :value="'like'"></v-radio>
            <v-radio :label="'Follow all'" :value="'follow'"></v-radio>
            <v-radio :label="'Comment all'" :value="'comment'"></v-radio>
          </v-radio-group>
          <l-comments :task="task" v-if="task.type=='comment'"/>
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
          <l-comments :task="task" v-if="task.type=='comment'"/>
          <v-layout align-center justify-left my-3 wrap>
            <v-flex xs10>
              <v-slider :label="task.type+' '+task.settings.amount+' latest posts every'" v-model="task.settings.frequency" :max="50" :min="0"></v-slider>
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

<script>
import Comments from '@/components/Comments.vue'
export default {
  name: 'locations',
  data: () => ({
    length: 1,
    step: 0,
    commentModal: !1,
    TaskModal: !1,
    BgTaskModal: !1,
    window: 0,
    index: !1,
    selectAllAccModel: !0,
    task: {
      repeating: false,
      actionTools: ['like'],
  	  filters: [],
      draft: !1,
      followType: 'getFollowers',
      section: 'locations',
      username: '',
      comments: [],
      user: {},
      accounts: [],
      posts: [],
      settings: {
        amount: 40,
        frequency: 0,
        interval: 20
      },
      type: 'like',
      descs: {
        like: 'Liking latest posts',
        follow: 'Follow all',
        unfollow: 'Unollow all',
        comment: 'Comment latest posts'
      },
      enabled: !0
    }
  }),
  props: ['taskNum'],
  watch: {
    commentModal (newVal, oldVal) {
      if (!newVal) {
        if (!this.task.comments.length) { this.task.actionTools.splice(this.task.actionTools.indexOf('comment'), 1) }
      }
    }
  },
  mounted () {
    if (this.taskNum != undefined) {
      this.task = this.$store.state.tasks[this.taskNum]
      this.$root.interval(()=>{
        if(this.$store.state.tasks[this.taskNum].status != this.task.status)
          this.task = this.$store.state.tasks[this.taskNum]
      }, 2000);
      this.step = 2;
      // this.task.posts[0].done = !0;
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
        this.task.posts = [];
        this.$store.state.tasks.push(_.cloneDeep(this.task))
        this.taskNum = this.$store.state.tasks.length-1;
        this.task = _.cloneDeep(this.$store.state.tasks[this.taskNum])
      }
      this.$root.save()
    },
  	updateTags () {
      this.$nextTick(() => {
        this.task.filters.push(...this.search.split(','))
        this.$nextTick(() => {
          this.search = ''
        })
      })
    },
    selectAllAcc () {
      this.task.posts.map((e) => {
        e.selected = this.selectAllAccModel
        return e
      })
    },
    step1 () {
      this.step = -1
      var pHash = Math.round(this.task.settings.amount / this.task.filters.length)
      var i = 0
      var loadPosts = () => {
        api.runtime.sendMessage({ why: 'tool', name: 'getLocation', value: { name: this.task.filters[i], count: pHash } }, (response1) => {
          if (response1) {
            console.log(response1)
            response1.forEach((e) => {
              e.selected = true
            })
            this.task.posts.push(...response1)
          }
          if (this.task.filters.length > i + 1) {
            i++
            loadPosts()
          } else {
            this.step = 1
          }
        })
      }
      loadPosts()
    },
    step2 () {
      // this.$set(this.task.steps, e, 1)
      // this.index = this.$store.state.tasks.length-1;
      // this.$store.state.tasks[this.index].uni = Date.now();
      // this.$store.state.tasks[this.index].draft = !1;
      // this.$store.state.tasks[this.index].enabled = !0;
      // this.$root.save()
      // this.$router.push({ path: '/' })
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
      this.$store.state.tasks.push(_.cloneDeep(this.task))
      this.$root.save()
    }
  },
  components: {
    'l-comments': Comments
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
