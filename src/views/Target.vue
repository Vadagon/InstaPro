<template>

  <v-container class="target fill-height">
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
                    <v-icon>account_circle</v-icon>
                  </v-avatar>
                  <strong class="title">Target</strong>
                  <v-spacer></v-spacer>
                </v-layout>
                <v-layout align-center mb-3>
                  <v-flex justify-center>
                    <h3 class="subheading mb-4">Enter the name of person to load his followers</h3>
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

          <v-window-item :key="1">
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
                  <v-switch label="Select All" v-model="selectAllAccModel" @change="selectAllAcc()"></v-switch>
                </v-layout>
                <v-layout align-left row wrap justify-left mb-4 pt-3>
                    <!-- <v-flex shrink>
                      <v-switch label="Select All" v-model="selectAllAccModel" @change="selectAllAcc()"></v-switch>
                    </v-flex> -->
                    <v-flex xs4 md3 v-for="s in task.accounts" mb-2>
                      <v-layout align-left row wrap justify-left>
                        <v-list-tile-avatar>
                          <img @click="s.checked = !s.checked" alt="profile" v-bind:src="s.profile_pic_url" v-bind:class="{'active-profile': s.checked}">
                        </v-list-tile-avatar>
                        <a v-bind:href="'https://www.instagram.com/'+s.username" target="_blank" class="body-2 mt-2 overflow-hidden" style="position: absolute; left: 55px; top: -14px; font-size: 12px !important; color: grey;">{{s.username}}</a>
                        <span class="body-2 mt-2 overflow-hidden" style="font-size: 14px!important; width: calc(100% - 80px); text-align: left; margin-top: 12px !important;">{{s.full_name}}</span>
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
                    <v-icon>group_work</v-icon>
                  </v-avatar>
                  <strong class="title">Actions</strong>
                  <v-spacer></v-spacer>
                </v-layout>
                <v-layout align-center justify-center mb-3>
                  <span>
                    <v-radio-group v-model="task.type">
                      <v-radio :label="'Like recent posts'" :value="'initial'"></v-radio>
                      <v-radio :label="'Follow all'" :value="'a1'" disabled></v-radio>
                      <v-radio :label="'Unfollow all'" :value="'s1'" disabled></v-radio>
                    </v-radio-group>
                  </span>
                </v-layout>

              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item :key="3">
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
                      <v-slider label="Amount" v-model="task.settings.amount" :max="1000" :min="2" :step="10" ></v-slider>
                    </v-flex>
                    <v-flex shrink mx-3>{{task.settings.amount}}</v-flex>
                    <v-flex xs8>
                      <v-slider label="Actions interval" v-model="task.settings.interval" :max="300" :min="2" :step="10" ></v-slider>
                    </v-flex>
                    <v-flex shrink mx-3>{{task.settings.interval}}s</v-flex>
                </v-layout>

              </v-card-text>
            </v-card>
          </v-window-item>

        </v-window>

        <v-btn color="primary" class="next" @click="nextStep(window)" v-if="steps[window]!=2" :disabled="steps[window]==1 || task.username.length < 2">
          <span v-if="steps[window]==0 && window<steps.length-1">continue</span>
          <v-progress-circular indeterminate color="primary" :size="20" :width="2" v-if="steps[window]==1"></v-progress-circular>
          <span v-if="window==steps.length-1">finish</span>
        </v-btn>
        <v-btn color="warning" class="next" @click="nextStep(window)" v-if="steps[window]==2">re continue</v-btn>

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
    selectAllAccModel: !0,
    price: 100,
    steps: [0, 0, 0, 0],
    task: {
      section: 'target',
      username: '',
      user: {},
      accounts: [
        {
          username: 'test',
          checked: !1
        }
      ],
      type: 'initial',
      settings: {
        amount: 100,
        interval: 20
      },
      enabled: true
    }
  }),
  created () {
    for (var i = 0; i < 20; i++) {
      this.task.accounts.push(Object.assign({}, this.task.accounts[0]))
    }
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
      var that = this;
      that.$set(that.steps, e, 1)
      var next = function(){
        that.$set(that.steps, e, 2)
        if (e != 3) {
          that.window = e + 1
          that.length = e + 2
        } else {
          that.$store.state.tasks.push(that.task)
          that.$router.push({ path: '/' })
        }
        for (var i = that.window.length+1; i < that.steps.length; i++) {
          that.$set(that.steps, i, 0)
        }
      }
      if(e == 0){
        chrome.runtime.sendMessage({why: "tool", name: "getUser", value: that.task.username}, (response1) => {
          console.log(response1);
          if(response1){          
            that.task.user = response1;
            chrome.runtime.sendMessage({why: "tool", name: "getFollowers", value: that.task.user.id}, (response2) => {
              if(response2){
                that.task.accounts = response2;
                next();
              }else{
                that.$set(that.steps, e, 0)
              }
            });
          }else{
            that.$set(that.steps, e, 0)
            // that.$parent.noty.enabled = true;
          }
        });
      }else{
        next();
      }
      console.log(that.task)
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
