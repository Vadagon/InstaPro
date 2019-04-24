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

    <core-drawer />

    <v-toolbar flat prominent :class="{'leftDrawerMargin': $root.drawer&&$vuetify.breakpoint.name != 'sm'}">
      <v-toolbar-side-icon @click.stop="$root.drawer = !$root.drawer" class="text-pink"></v-toolbar-side-icon>
      <v-toolbar-title>{{$route.name?$route.name.charAt(0).toUpperCase() + $route.name.slice(1).toLowerCase():''}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="drawerRight = !drawerRight">
        <v-badge>
          <template v-slot:badge>
            <span>6</span>
          </template>
          <v-icon>notification_important</v-icon>
        </v-badge>
      </v-btn>
    </v-toolbar>


    <v-navigation-drawer v-model="drawerRight" absolute overlap right temporary >
      <v-list dense>
        <v-list>
          <v-list-tile v-for="item in 12" avatar @click="">
            <v-list-tile-action>
              <v-icon v-if="true">exit_to_app</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="'follow @the_rock'"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar>
              <img :src="''">
            </v-list-tile-avatar>
          </v-list-tile>
        </v-list>
        <!-- developing... -->
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <transition name="fade">
          <router-view/>
        </transition>
      </v-container>
    </v-content>
    <core-footer/>
  </v-app>


</template>
<script>
import Drawer from './components/core/Drawer.vue'
import Footer from './components/core/Footer.vue'

export default {
  data: () => ({
    drawer: null,
    drawerRight: false,
    test: 12312312
  }),
  props: {
    source: String
  },
  components: {
    'core-drawer': Drawer,
    'core-footer': Footer
  }
}
</script>
<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>

