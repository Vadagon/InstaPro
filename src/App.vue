<!-- <template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template> -->

<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" fixed clipped app >
      <v-list dense>

        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/target">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Target</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/unfollow">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Unfollow</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/locations">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Locations</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/hashtags">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>HashTags</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/about">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="text-pink"></v-toolbar-side-icon>
      <v-toolbar-title>InstaPro</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="drawerRight = !drawerRight"><v-icon>notification_important</v-icon></v-btn>
      <!-- <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon> -->
    </v-toolbar>
    <v-navigation-drawer v-model="drawerRight" absolute overlap right temporary >
      <v-list dense>
        <!-- <v-list-tile>
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
        developing...
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer color="elevation-4" class="px-4" app>
      <span>MarQuis Trill</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>

  <!--   <v-snackbar v-model="noty.enabled" :bottom="true" :multi-line="true">
      {{ noty.text }}
      <v-btn color="pink"flat @click="noty.enabled">
        Close
      </v-btn>
    </v-snackbar>
 -->
  </v-app>


</template>
<script>
export default {
  data: () => ({
    drawer: null,
    drawerRight: false,
    test: 12312312
  }),
  props: {
    source: String
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
