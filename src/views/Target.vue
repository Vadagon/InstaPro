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
                  <v-avatar color="grey" class="mr-3">
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
                  <v-avatar color="grey" class="mr-3">
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
                          <img @click="s.checked = !s.checked" alt="profile" src="../assets/1.jpg" v-bind:class="{'active-profile': s.checked}">
                        </v-list-tile-avatar>
                        <span class="body-2 mt-2">{{s.username}}</span>
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
                  <v-avatar color="grey" class="mr-3">
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
                  <v-avatar color="grey" class="mr-3">
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

      <!-- <v-layout row nowrap>
        <v-flex class="step-block ma-2" v-for="x in 6">
          <v-card class="pa-3">
            <h3 class="title mb-3">Enter the name of person to fetch his followers</h3>
            <v-text-field label="username" placeholder="@the_rock" outline></v-text-field>
            <v-radio-group>
              <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
            </v-radio-group>
            <v-list-tile-avatar v-for="s in [!0, !1, !0, !1, !1]">
              <input type="checkbox" class="none" :checked="s">
              <img alt="profile" src="../assets/1.jpg" v-bind:class="{'active-profile': s}">
              <span class="caption">@username</span>
            </v-list-tile-avatar>
            <v-switch></v-switch>
            <v-slider></v-slider>
            <v-btn color="primary" class="next">next</v-btn>
          </v-card>
        </v-flex>
      </v-layout> -->
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
    selectAllAccModel: !1,
    price: 100,
    steps: [0, 0, 0, 0],
    task: {
      section: 'target',
      username: '',
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
      }
    }
  }),
  created() {
    for (var i = 0; i < 20; i++) {
      this.task.accounts.push(Object.assign({}, this.task.accounts[0]))
    }
  },
  computed: {
    data() {
      return this.$store
    }
  },
  methods: {
    selectAllAcc() {
      this.task.accounts.map((e)=>{
        e.checked = this.selectAllAccModel;
        return e;
      })
    },
    nextStep(e) {
      this.$set(this.steps, e, 1)
      setTimeout(()=>{
        this.$set(this.steps, e, 2)
        console.log(this.task);
        if(e!=3){
          this.window = e+1
          this.length = e+2
        }else{
          console.log('finish');
        }
      }, 1000);
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
