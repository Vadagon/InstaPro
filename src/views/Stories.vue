<template>

  <v-container class="target fill-height">
    <v-layout align-center v-if="step==0 && !task.dateCreated">
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
                    <v-icon>query_builder</v-icon>
                  </v-avatar>
                  <strong class="title">Watch Stories</strong>
                  <v-spacer></v-spacer>
                </v-layout>
                <v-layout align-center mb-3>
                  <v-flex justify-center>
                    <h3 class="subheading mb-4">Enter the name of person to load followers stories</h3>
                    <v-layout align-center justify-center class="mb-3">
                      <span>
                        <v-text-field label="username" placeholder="@the_rock" v-model="task.username" outline></v-text-field>
                      </span>
                    </v-layout>
                  </v-flex>
                </v-layout>

              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item :key="2">
            <v-card flat>
              <v-card-text>
                <v-layout align-center mb-3>
                  <v-avatar color="purple lighten-5" class="mr-3">
                    <v-icon>supervisor_account</v-icon>
                  </v-avatar>
                  <strong class="title">Accounts</strong>
                  <v-spacer v-for="c in 14"></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-switch :label="'Select All ('+ task.accounts.length+')'" v-model="selectAllAccModel" @change="selectAllAcc()"></v-switch>
                </v-layout>
                <v-layout align-left row wrap justify-left mb-4 pt-3>
                    <!-- <v-flex shrink>
                      <v-switch label="Select All" v-model="selectAllAccModel" @change="selectAllAcc()"></v-switch>
                    </v-flex> -->
                    <v-flex xs4 md3 v-for="s in task.accounts" mb-2>
                      <v-layout align-left row wrap justify-left>
                        <v-list-tile-avatar>
                          <img @click="s.checked = !s.checked" alt="profile" style="border: 2px solid #d82c7c !important;" v-bind:src="s.profile_pic_url" v-bind:class="{'active-profile': s.checked}">
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

        <v-btn color="primary" class="next" @click="nextStep(window)" v-if="task.steps[window]!=2" :disabled="task.steps[window]>0">
          <span v-if="task.steps[window]==0 && window<task.steps.length-1">continue</span>
          <v-progress-circular indeterminate color="primary" :size="20" :width="2" v-if="task.steps[window]>0"></v-progress-circular>
          <span v-if="window==task.steps.length-1">finish</span>
        </v-btn>
        <v-btn color="warning" class="next" @click="nextStep(window)" v-if="task.steps[window]==2">re continue</v-btn>
        <v-btn @click="$set(task.steps, 1, 0)" v-if="task.steps[window]==3" style="min-width: 30px; margin-left: 0;" color="white" class="next"><v-icon color="red">close</v-icon></v-btn>

      </v-flex>
    </v-layout>


    
    <v-layout align-center justify-center content-created row wrap white elevation-2 mx-5 pa-4 v-if="step > 0 && task.dateCreated && task.types.includes('story') && task.types.length==1">
      <v-flex xs4 md3 v-for="s in task.accounts" mb-2>
        <v-layout align-left row wrap justify-left style="position: relative;">
          <v-list-tile-avatar v-bind:class="{'done-profile': s.done}">
            <img alt="profile" v-bind:src="s.profile_pic_url" style="border: 2px solid #d82c7c !important;" v-bind:class="{'active-profile': s.checked}">
          </v-list-tile-avatar>
          <a v-bind:href="'https://www.instagram.com/'+s.username" target="_blank" class="body-2 mt-2 overflow-hidden" style="position: absolute; left: 55px; top: -14px; font-size: 12px !important; color: grey;">{{s.username}}</a>
          <span class="body-2 mt-2 overflow-hidden" style="font-size: 14px!important; width: calc(100% - 80px); text-align: left; margin-top: 12px !important;">{{s.full_name}}</span>
        </v-layout>
      </v-flex>
    </v-layout>




    <v-layout align-start justify-start row fill-height wrap v-if="step > 0 && !(task.types.includes('follow') && task.types.length==1)">
      <v-flex shrink pl-2 mt-2 v-if="step==1">
        <v-switch :label="'Select All ('+ task.posts.length+')'" v-model="selectAllPostModel" @change="selectAllPost()"></v-switch>
      </v-flex>
      <v-flex grow></v-flex>
      <v-flex shrink pl-2 class="floatingButtons">
        <v-btn v-if="step==1" fab color="primary" @click="TaskModal = true;">
          <v-icon color="white">play_arrow</v-icon>
        </v-btn>
        <!-- <v-btn v-if="step==2" fab color="primary" @click="BgTaskModal = true;">
          <v-icon color="white">{{task.repeating?'settings':'repeat'}}</v-icon>
        </v-btn> -->
      </v-flex>
      <v-flex sm12></v-flex>
      <v-flex xs12 v-if="step==2 && !task.finished">
        <span>{{task.status?task.status:'Bot will start working on this task soon'}}</span>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-flex>

      <v-flex md4 lg2 xs6 v-for="x in task.posts" pa-2 class="postCard" :class="{'finishedPost':x.done}" v-if="!(x > 0)">
        <v-layout class="elevation-1 white" :class="{'selected': x.selected}" column >
          <v-flex class="postDetails">
            <vuetify-lazy-image :src="x.thumbnail_src" aspectRatio="1"></vuetify-lazy-image>
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
                <span class="caption grey--text text--darken-2" v-if="x.edge_liked_by">{{x.edge_liked_by.count}}</span>
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

    <v-dialog v-model="BgTaskModal" scrollable max-width="600px" v-if="step > 0 && !(task.types.includes('follow') && task.types.length==1)">
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
import Comments from '@/components/Comments.vue'
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'story',
  data: () => ({
    length: 1,
    window: 0,
    index: !1,
    selectAllAccModel: !0,
    selectAllPostModel: !0,
    step: 0,
    TaskModal: !1,
    BgTaskModal: !1,
    task: {
      uni: new Date().getTime(),
      repeating: false,
      steps: [0, 0],
      draft: !0,
      followType: 'getFollowersStories',
      comments: [],
      section: 'story',
      username: '',
      user: {},
      posts: [],
      accounts: [],
      settings: {
        amount: 100,
        frequency: 0,
        lastComments: 1,
        interval: 20
      },
      type: 'story',
      types: ['story'],
      descs: {
        like: 'Liking latest posts',
        story: 'Wathing stories',
        follow: 'Follow all',
        unfollow: 'Unollow all',
        comment: 'Comment latest posts',
        comments: 'Like latest comments'
      },
      enabled: !0
    }
  }),
  props: ['taskNum'],
  mounted () {
    if(this.$route.query.injectData != undefined){
      this.task.username = this.$route.query.injectData;
    }
    if (this.taskNum != undefined) {
      api.runtime.sendMessage({ why: 'getData' }, (e) => {
        this.task = e.userData.tasks[this.taskNum]
        this.step = 2;
      })
      this.step = 2;
    }
    this.$root.interval(()=>{
      console.log(this.step)
      if (this.taskNum != undefined) {
        api.runtime.sendMessage({ why: 'getData' }, (e) => {
          var task = e.userData.tasks[this.taskNum];
          var dump = this.task.settings;
          this.task = task
          this.task.settings = dump
          this.step = 2;
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
        this.task.running = false;
        this.task.finished = false;
        this.task.timeStamp = undefined;
        this.task.dateCreated = new Date().getTime();        
        this.task.posts = [];

        this.task.id = this.$store.state.tasks.length;
        this.$store.state.tasks.push(_.cloneDeep(this.task))
        this.taskNum = this.$store.state.tasks.length-1;
        this.task = _.cloneDeep(this.$store.state.tasks[this.taskNum])
        this.$router.push({ path: '/' })
      }
      this.$root.save()
      this.$router.push({ path: '/' })
    },
    descriptionChange () {
      this.task.description = this.descs[this.task.types[0]]
    },
    selectAllAcc () {
      this.task.accounts.map((e) => {
        e.checked = this.selectAllAccModel
        return e
      })
    },
    selectAllPost(){
      this.task.posts.map((e) => {
        e.selected = this.selectAllPostModel
        return e
      })
    },
    step1(){
      this.step2();
      // this.step = -1;
      // var pHash = Math.round(this.task.settings.amount / this.task.accounts.length)
      // var i = 0
      // var loadPosts = () => {
      //   api.runtime.sendMessage({ why: 'tool', name: 'getUserPosts', value: { name: this.task.accounts[i].username, count: pHash } }, (response1) => {
      //     if (response1) {
      //       console.log(response1)
      //       response1.forEach((e) => {
      //         e.selected = true
      //       })
      //       this.task.posts.push(...response1)
      //     }
      //     if (this.task.accounts.length > i + 1) {
      //       i++
      //       loadPosts()
      //     } else {
      //       this.step = 1
      //     }
      //   })
      // }
      // loadPosts()    
    },
    step2(){
      this.step = 2
      this.TaskModal = false;
      this.task.accounts = this.task.accounts.filter(e => e.checked)
      this.task.posts = this.task.posts.filter(e => e.selected)
      this.task.posts.forEach((e) => {
        e.selected = false
        e.liked = false
      })
      this.task.dateCreated = new Date().getTime();
      this.task.settings.frequency = 0
      if(this.task.settings.amount < 1 || (this.task.types.length == 1 && this.task.types.includes('follow')))
        this.task.settings.amount = this.task.accounts.length;
      this.task.repeating = false;
      this.task.id = this.$store.state.tasks.length;
      this.$store.state.tasks.push(_.cloneDeep(this.task))
      this.taskNum = this.$store.state.tasks.length-1;
      this.$root.save()
      this.$router.push({ path: '/' })
    },
    nextStep (e) {
      this.$set(this.task.steps, e, 1)
      var next = () => {
        this.$set(this.task.steps, e, 2)

        if (e < this.task.steps.length - 1) {
          this.window = e + 1
          this.length = e + 2
          this.task.accounts = this.task.accounts.filter(e => e.checked)
        }else{
          if(this.onlyFollow){
            this.task.accounts = this.task.accounts.filter(e => e.checked)
            this.task.dateCreated = new Date().getTime();
            this.task.settings.frequency = 0
            this.task.repeating = false;
            this.task.id = this.$store.state.tasks.length;
            this.$store.state.tasks.push(_.cloneDeep(this.task))
            this.$root.save()
            this.$router.push({ path: '/' })
          }else{
            this.step1();
          }
          // this.$store.state.tasks[this.index].accounts = this.$store.state.tasks[this.index].accounts.filter(e => e.checked)
          // this.$store.state.tasks[this.index].uni = Date.now()
          // this.$store.state.tasks[this.index].draft = !1
          // this.$store.state.tasks[this.index].enabled = !0
          // this.$root.save()
        }
        for (var i = this.window.length + 1; i < this.task.steps.length; i++) {
          this.$set(this.task.steps, i, 0)
        }
      }
      if (e == 0) {
        this.$set(this.task.steps, 1, 1)
        next()
        var started = !1
        console.log('start')
        api.runtime.sendMessage({ why: 'tool', name: 'getUser', value: this.task.username }, (response1) => {
          if (response1 && (this.task.followType!='getCommentators' || (response1.edge_owner_to_timeline_media && response1.edge_owner_to_timeline_media.edges && response1.edge_owner_to_timeline_media.edges.length))) {
            this.task.user = response1
            var after = ''
            var i = 0;
            var loadQue = () => {
              var dataToSend = { id: this.task.user.id, after: after };
              if(this.task.followType=='getCommentators' && this.task.user.edge_owner_to_timeline_media.edges.length){
                dataToSend.post = this.task.user.edge_owner_to_timeline_media.edges[i].node;
              }else if(this.task.followType=='getCommentators'){
                this.$set(this.task.steps, 1, 0)
                return;
              }
              api.runtime.sendMessage({ why: 'tool', name: this.task.followType, value: dataToSend, index: this.task.accounts.length }, (response2) => {
                console.log(response2)
                after = response2.page_info.end_cursor
                if (!started) {
                  this.$set(this.task.steps, 1, 3)
                  started = !0
                }
                if(response2.nodes && this.task.followType!='getCommentators'){
                  this.task.accounts.push(...response2.nodes)
                }else if(response2.nodes){
                  response2.nodes.forEach((e)=>{
                    !this.task.accounts.some(ee=>ee.id==e.owner.id) && this.task.accounts.push(e.owner)
                  })
                }
                if (this.task.followType!='getCommentators' && response2.page_info.has_next_page && this.task.steps[1] == 3) {
                  this.$root.timeout(function () { loadQue() }, this.$root.randB(10, 100))
                }else if(this.task.followType=='getCommentators' && this.task.steps[1] == 3){
                  if(!response2.page_info.has_next_page){
                    i++;
                    after = '';
                  }
                  if(this.task.user.edge_owner_to_timeline_media.edges.length>i){
                    this.$root.timeout(function () { loadQue() }, this.$root.randB(10, 100))
                  }else{
                    this.$set(this.task.steps, 1, 0);
                  }
                }else{
                  this.$set(this.task.steps, 1, 0)
                }
              })
            }
            loadQue()
          } else {
            this.$set(this.task.steps, e, 0)
            // this.$parent.noty.enabled = true;
          }
        })
      } else {
        next()
      }
      console.log(this.task)
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
