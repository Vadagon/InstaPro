<template>

  <v-container class="home fill-height">
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
                    <v-btn icon><v-icon>account_circle</v-icon></v-btn>
                  </v-avatar>
                  <strong class="title">Target</strong>
                  <v-spacer></v-spacer>*
                </v-layout>
                <v-layout align-center mb-3>
                  <v-flex justify-center>
                    <h3 class="subheading mb-4">Enter the name of person to fetch his followers</h3>
                    <v-layout align-center justify-center class="mb-3">
                      <span>
                        <v-text-field label="username" placeholder="@the_rock" outline></v-text-field>
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
                    <v-btn icon><v-icon>account_circle</v-icon></v-btn>
                  </v-avatar>
                  <strong class="title">Target</strong>
                  <v-spacer></v-spacer>*
                </v-layout>
                <v-layout align-center mb-3>
                  <v-flex justify-center>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </v-flex>
                </v-layout>

              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
        <v-btn color="primary" class="next" @click="window--">continue</v-btn>
        <v-btn color="warning" class="next" @click="window++">re continue</v-btn>
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
  name: 'home',
  data: () => ({
    length: 2,
    window: 0
  }),
  computed: {
    data() {
      return this.$store
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
