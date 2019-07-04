<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="$root.drawer"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            <v-img
              :src="logo"
              height="34"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            App Assistant
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          avatar
          class="v-list-item"
          :active-class="'purple'"

        >
          <v-list-tile-action>
            <v-icon color="white">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>
        <v-list-tile active-class="primary" class="v-list-item v-list__tile--buy" target="_blank" href="https://instagram.com/appassistant">
          <!-- <span>Free Trial expires in {{$root.user.daysLeft}} days</span> -->
          <v-list-tile-action>
            <v-icon color="white">alternate_email</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="font-weight-light">
            Follow App Assistant
          </v-list-tile-title>
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>

import img23832d31 from "@/assets/imgs/sidebar-1.23832d31.jpg"
import img32103624 from "@/assets/imgs/sidebar-2.32103624.jpg"
import img3a54f533 from "@/assets/imgs/sidebar-3.3a54f533.jpg"
import img3b7e38ed from "@/assets/imgs/sidebar-4.3b7e38ed.jpg"
import logo from '@/assets/logo.png'

export default {
  data: () => ({
    logo: logo,
    links: [
      {
        to: '/',
        icon: 'dashboard',
        text: 'Dashboard'
      },
      {
        to: '/feed',
        icon: 'rss_feed',
        text: 'Feed'
      },
      {
        to: '/target',
        icon: 'person_pin',
        text: 'Target'
      },
      {
        to: '/unfollow',
        icon: 'person_add_disabled',
        text: 'Unfollow'
      },
      {
        to: '/locations',
        icon: 'location_on',
        text: 'Locations'
      },
      {
        to: '/hashtags',
        icon: 'search',
        text: 'HashTags'
      },
      // {
      //   to: '/Social Media Store',
      //   icon: 'store',
      //   text: 'Social Media Store'
      // },
      {
        to: '/about',
        icon: 'info',
        text: 'About'
      }
    ],
    responsive: false
  }),
  computed: {
    image () {
      var images = [
        img23832d31,
        img32103624,
        img3a54f533,
        img3b7e38ed
      ]
      return images[this.$root.randB(0, images.length - 1)]
    },
    inputValue: {
      get () {
        console.log(this.$parent.drawer)
        return this.$parent.drawer
      },
      set (val) {
        // this.setDrawer(val)
      }
    },
    items () {
      // return this.$t('Layout.View.items')
    }
  },
  mounted () {
    console.log(this.$root.user)
    setTimeout(()=>{
      console.log(this.$root.user)
      if(this.$root.user.isPrivate) this.links.splice(6,0, {
          to: '/requests',
          icon: 'person_add',
          text: 'Follow requests'
        });
    }, 1400);

    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    // ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = false
      } else {
        this.responsive = true
      }
    }
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
