<template>

  <v-container class="hashtags fill-height">
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
                    <v-icon>search</v-icon>
                  </v-avatar>
                  <strong class="title">Hashtags</strong>
                </v-layout>
                <v-layout align-left row wrap justify-left mb-4 pt-3>
                  <v-combobox multiple
                    v-model="task.filters" 
                    label="Tags" 
                    append-icon
                    chips
                    deletable-chips
                    class="tag-input"
                    @keyup.tab="updateTags"
                    @paste="updateTags">
		          </v-combobox>
                </v-layout>

              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item :key="1">
            <v-card flat>
              <v-card-text>
                <v-layout align-center mb-3>
                  <v-avatar color="purple lighten-5" class="mr-3">
                    <v-icon>group_work</v-icon>
                  </v-avatar>
                  <strong class="title">Settings</strong>
                  <v-spacer></v-spacer>
                </v-layout>
                <v-layout align-center justify-center mb-3 wrap>
                	<v-flex xs8>
                      <v-slider label="Amount" v-model="task.settings.amount" :max="1000" :min="2"></v-slider>
                    </v-flex>
                    <v-flex shrink mx-3>{{task.settings.amount}}</v-flex>
                    <v-flex xs8>
                      <v-slider label="Actions interval" v-model="task.settings.interval" :max="300" :min="2" ></v-slider>
                    </v-flex>
                    <v-flex shrink mx-3>{{task.settings.interval}} seconds</v-flex>
                    <v-flex xs8>
                      <v-slider label="Activation frequency" v-model="task.settings.frequency" :max="300" :min="1"></v-slider>
                    </v-flex>
                    <v-flex shrink mx-3>{{task.settings.frequency}} hours</v-flex>
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

    <br><br>
  </v-container>
</template>

<!-- <HelloWorld title="Hey"/> -->

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'hashtags',
  data: () => ({
    length: 1,
    window: 0,
    index: !1,
    selectAllAccModel: !0,
    descs: {
      like: 'Liking latest posts',
      follow: 'Follow all',
      unfollow: 'Unollow all',
      comment: 'Comment latest posts',
    },
    task: {
  	  filters: [],
      steps: [0, 0],
      draft: !0,
      followType: 'getFollowers',
      section: 'hashtags',
      username: '',
      user: {},
      accounts: [],
      type: 'like',
      settings: {
        amount: 100,
        frequency: 2,
        interval: 20
      },
      description: 'Liking by hashtags',
      enabled: false
    }
  }),
  props: ['taskNum'],
  mounted() {
    if (this.taskNum != undefined) {
      this.task = this.$store.state.tasks[this.taskNum];
      var num = this.task.steps.findIndex((e)=>{return !e});
      num=num==-1?this.task.steps.length-1:num;
      this.length = num+1;
      this.window = num;  
      this.index = this.taskNum;
    }
  },
  created () {
    for (var i = 0; i < 10; i++) {
      	this.task.accounts.push({
			username: 'test',
			checked: !1
        })
    }
  },
  computed: {
    data () {
      return this.$store.state
    }
  },
  methods: {
  	updateTags() {
      this.$nextTick(() => {
        this.task.filters.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    },
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
        if(e==0 && !this.index){
          this.$store.state.tasks.push(_.cloneDeep(this.task));
          this.index = this.$store.state.tasks.length-1;
        }else{
          this.$store.state.tasks[this.index] = _.cloneDeep(this.task);
        }
        if (e < this.task.steps.length-1) {
          this.window = e + 1
          this.length = e + 2
        } else {
          this.$store.state.tasks[this.index].draft = !1;
          this.$store.state.tasks[this.index].enabled = !0;
          this.$root.save()
          // this.$store.state.tasks.push(this.task)
          this.$router.push({ path: '/' })
        }
        for (var i = this.window.length+1; i < this.task.steps.length; i++) {
          this.$set(this.task.steps, i, 0)
        }
      }
      if(e == 1){
        // api.runtime.sendMessage({why: "tool", name: "getUser", value: this.task.username}, (response1) => {
        //   console.log(response1);
        //   if(response1){          
        //     this.task.user = response1;
        //     api.runtime.sendMessage({why: "tool", name: this.task.followType, value: this.task.user.id}, (response2) => {
        //       if(response2){
        //         this.task.accounts = response2;
                next();
        //       }else{
        //         this.$set(this.task.steps, e, 0)
        //       }
        //     });
        //   }else{
        //     this.$set(this.task.steps, e, 0)
        //     // this.$parent.noty.enabled = true;
        //   }
        // });
      }else{
        next();
      }
      console.log(this.task)
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
