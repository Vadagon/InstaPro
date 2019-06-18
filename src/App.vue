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
      <v-btn icon @click.stop="drawerRight = !drawerRight; $root.rssSeen = $root.rss.length">
        <v-badge>
          <template v-slot:badge v-if="$root.rss.length-$root.rssSeen > 0">
            <span>{{$root.rss.length-$root.rssSeen}}</span>
          </template>
          <v-icon>notification_important</v-icon>
        </v-badge>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawerRight" absolute overlap right temporary >
      <v-list dense>
        <v-list>
          <v-list-tile v-for="x in $root.rss" avatar @click="open('https://instagram.com/'+(x.type.includes('follow')?x.value.username:('p/'+x.value.shortcode)))">
            <v-list-tile-action>
              <i class="material-icons"> {{icons[x.type]}} </i>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-if="x.type=='like' && !!x.value.owner" v-text="`Liked post ${x.value.owner.full_name?' of '+x.value.owner.full_name:''}`"></v-list-tile-title>
              <v-list-tile-title v-if="x.type=='comment' && !!x.value.owner" v-text="`Commented post of ${x.value.owner.full_name?' of '+x.value.owner.full_name:''}`"></v-list-tile-title>
              <v-list-tile-title v-if="x.type=='follow'" v-text="`Followed @${x.value.username}`"></v-list-tile-title>
              <v-list-tile-title v-if="x.type=='unfollow'" v-text="`Unfollowed @${x.value.username}`"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar v-if="!!x.value" :class="{'notAvatarUser':x.type.includes('follow')}">
              <img v-if="x.value.display_resources" :src="x.value.display_resources[0].src">
              <img v-else-if="x.value.profile_pic_url" :src="x.value.profile_pic_url">
              <img v-else-if="x.value.display_url" :src="x.value.display_url">
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


    <!-- <v-dialog v-model="$root.purchaseModal" persistent width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Purchase App Assistant
        </v-card-title>
        <v-card-text>
          All features as low as $50/month
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" flat v-if="($root.user.daysLeft < 4 && $root.user.daysLeft > -1) || $root.user.purchased" @click="$root.purchaseModal = false">Later</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="$root.pay()">
            Pay Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->


  </v-app>
</template>
<script>
import Drawer from './components/core/Drawer.vue'
import Footer from './components/core/Footer.vue'

export default {
  data: () => ({
    drawer: null,
    drawerRight: false,
    test: 12312312,
    icons: {
      like: 'favorite',
      comment: 'comment',
      follow: 'person_pin',
      unfollow: 'person_add_disabled'
    }
  }),
  methods: {
    open (e) {
      window.open(e, '_blank')
    }
  },
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
