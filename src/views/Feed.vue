<template>

  <v-container class="feed fill-height">
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

      <v-flex>
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
                  <span>
                    <v-radio-group v-model="task.type" v-on:change="descriptionChange()">
                      <v-radio :label="'Like latest posts'" :value="'like'"></v-radio>
                      <v-radio :label="'Comment latest posts'" :value="'comment'" disabled></v-radio>
                    </v-radio-group>
                  </span>
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
                  <strong class="title">Actions</strong>
                  <v-spacer></v-spacer>
                </v-layout>
                <v-layout align-center justify-center mb-3 wrap>
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
  name: 'target',
  data: () => ({
    length: 1,
    window: 0,
    index: !1,
    selectAllAccModel: !0,
    descs: {
      like: 'Liking my feed',
      follow: 'Follow all',
      unfollow: 'Unollow all',
      comment: 'Comment latest posts',
    },
    task: {
      steps: [0, 0],
      draft: !0,
      followType: 'getFollowers',
      section: 'feed',
      username: '',
      user: {},
      accounts: [
        {
          username: 'test',
          checked: !1
        }
      ],
      type: 'like',
      settings: {
      	frequency: 6,
        amount: 100,
        interval: 20
      },
      description: 'liking my feed',
      enabled: false
    }
  }),
  props: ['taskNum'],
  mounted() {
    if (this.taskNum != undefined) {
      this.task = _.cloneDeep(this.$store.state.tasks[this.taskNum]);
      var num = this.task.steps.findIndex((e)=>{return !e});
      num=num==-1?this.task.steps.length-1:num;
      this.length = num+1;
      this.window = num;  
      this.index = this.taskNum;
    }
  },
  created () {
    for (var i = 0; i < 10; i++) {
      this.task.accounts.push(_.cloneDeep(this.task.accounts[0]))
    }
  },
  computed: {
    data () {
      return this.$store.state
    }
  },
  methods: {
  	descriptionChange(){
      this.task.description = this.descs[this.task.type];
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
