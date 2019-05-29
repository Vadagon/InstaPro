<template>
  <v-container class="dashboard" pa-0>
    <!-- {{$vuetify.breakpoint.name}} -->
    <v-layout align-start justify-left row fill-height wrap>
      <v-flex sm6 xs12 md6 lg3 v-for="x in statistic" px-2>
        <div class="v-card--material-stats v-card v-sheet theme--light" style="margin-bottom: 24px; margin-top: 48px;">
          <div class="v-offset" style="top: -24px; margin-bottom: -24px;">
            <div class="pa-4 v-card v-sheet theme--dark green elevation-10" v-bind:style="{ background: x.color+' !important' }">
              <v-icon color="white">{{x.icon}}</v-icon>
            </div>
          </div>
          <div class="v-card__text">
            <div class="text-xs-right">
              <p class="category grey--text font-weight-light">{{x.name}}</p>
              <h3 class="title display-1 font-weight-light">
                {{x.value}} <small></small></h3>
            </div>
          </div>
          <hr class="mx-3 v-divider theme--light">
          <div class="v-card__actions">
            <v-icon color="grey">update</v-icon> &nbsp;
            <span class="caption font-weight-light">Today</span>
          </div>
        </div>
      </v-flex>
      <v-flex mt-3 sm12 style="border-bottom: 1px solid #e7e7e7;" />
      <v-flex sm12 mt-4 mb-3 style="text-align: center; color: grey;">
        <h2 color="grey" class="display-1 font-weight-light">Tasks</h2>
      </v-flex>
      <!-- <v-card style="max-width: 360px;" v-for="x in data.tasks">
          <v-card-title primary-title>
            <div>
              <div class="headline">Liking posts of {{x.username}}'s followers</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-switch label="enable" v-model="x.enabled" @change="save()"></v-switch>
          </v-card-actions>
        </v-card> -->
      <v-flex xs12 pa-2 v-for="(x, index) in $root.tasksQUE">
        <v-layout row align-space-around justify-start fill-height>
          <!-- <v-card-title primary-title> -->
          <v-flex shrink px-2 pt-4 pr-3 font-weight-black headline v-if="!x.finished">
            {{index+1}}.
          </v-flex>
          <v-flex :class="{'elevation-2': !x.finished}" white>
            <v-layout row pa-3 py-3>
              <v-flex shrink>
                <v-avatar :class="{'purple lighten-5':!x.finished, 'green lighten-2':x.finished}">
                  <v-icon v-if="!x.finished && !x.running">{{data.icons[x.section]}}</v-icon>
                  <v-progress-circular v-if="!x.finished && x.running" indeterminate :size="25" :width="2" color="primary"></v-progress-circular>
                  <v-icon v-if="x.finished" color="white">done_outline</v-icon>
                  <!-- person_add_disabled -->
                </v-avatar>
              </v-flex>
              <v-flex @click="$router.push({ name: x.section, params: { taskNum: x.id } })" shrink headline text-truncate text-sm-left pt-3 mt-1 px-3 text-capitalize style="position: relative; cursor: pointer; min-width: 140px;">
                <span class="caption" style="position: absolute; top: 0;">{{x.descs[x.types[0]]}}</span>
                {{x.section}} {{x.username}}
              </v-flex>
              <v-flex px-2 text-sm-left limitTo4 pb-2 descriptionTask @click="$router.push({ name: x.section, params: { taskNum: x.id } })">
                <span v-for="span in x.accounts" v-if="span.checked">{{span.username}} </span>
                <span v-for="span in x.filters">{{span}} </span>
                <!-- #f4f #s4s #l4l #c4c #likeforlike #likeall #like4like #likes4likes #liking #instagood #tagblender #follow #followme #followback #followforfollow #follow4follow #followers #followher #follower #followhim #followbackteam #followall #comment #comments #commentback #comment4comment #commentbelow #shoutout #shoutouts #shoutoutback -->
              </v-flex>
              <v-flex shrink>
                <v-btn icon @click="data.tasks.splice(x.id, 1); $root.save();">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-card-actions grow v-if="x.settings.frequency" class="pt-0">
              <v-switch shrink label="enabled" v-if="data.tasks[x.id]" v-model="data.tasks[x.id].enabled" @change="$root.save()" style="max-width: 204px;"></v-switch>
              <span class="grey--text text--darken-2">{{x.status?x.status:'Bot will start working on this task soon'}}</span>
            </v-card-actions>
          </v-flex>
          <!-- <div class="headline">Liking posts of {{x.username}}'s followers</div> -->
          <!-- <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span> -->
          <!-- </v-card-title> -->
          <!-- <v-flex shrink pa-2 class="box-s" v-if="!x.draft">
            <canvas class="chart"></canvas>
          </v-flex> -->
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Chart from 'chart.js';
import StatsCard from '@/components/material/StatsCard.vue';
export default {
  name: 'dashboard',
  // data: () => ({
  //   items: [{ title: 'Edit' }, { title: 'Delete' }, ]
  // }),
  computed: {
    data() {
      return { ...this.$store.state,
        icons: {
          unfollow: 'person_add_disabled',
          target: 'person_pin',
          locations: 'location_on',
          hashtags: 'search',
          feed: 'rss_feed',
        }
      }
    },
    statistic(){
      return [
        {name: 'Followed', value: this.$root.rss.filter(e=>e.type == 'follow').length, icon: 'person_pin', color: '#4ea750'},
        {name: 'Unfollowed', value: this.$root.rss.filter(e=>e.type == 'unfollow').length, icon: 'person_add_disabled', color: '#508eff'},
        {name: 'Liked', value: this.$root.rss.filter(e=>e.type == 'like').length, icon: 'favorite', color: '#ff4e4e'},
        {name: 'Commented', value: this.$root.rss.filter(e=>e.type == 'comment').length, icon: 'comment', color: '#e05f99'}
      ]
    }
  },
  mounted() {
    $('.chart').each(function() {
      var gradient = this.getContext('2d').createLinearGradient(0, 0, 0, this.height);
      gradient.addColorStop(0, 'rgba(227,75,220,0.5)');
      gradient.addColorStop(1, 'rgba(227,75,220,0)');
      var data = {
        type: 'line',
        data: {
          labels: ['26 june ', '27 june', '28 june', '29 june', '30 june', '31 june'],
          datasets: [{
            label: 'likes made',
            data: [0, 0, 0, 8, 12, 10],
            backgroundColor: gradient,
            borderColor: '#b44be3',
            pointBackgroundColor: 'white',
            borderWidth: 1.3
          }]
        },
        options: {
          responsive: true,
          aspectRatio: 3,
          layout: {
            padding: {
              left: 5,
              right: 5,
              top: 5,
              bottom: 0
            }
          },
          tooltips: {
            displayColors: false,
            intersect: false
          },
          labels: {
            display: false
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                zeroLineColor: "rgba(255,255,255,0.5)"
              },
              ticks: {
                display: false
              }
            }],
            xAxes: [{
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },
              ticks: {
                display: false
              }
            }]
          }
        }
      }
      var myChart = new Chart(this, data);
    })
  },
  components: {
    'material-stats-card': StatsCard
  },
  // computed: {
  //   data () {
  //     return this.$store.state
  //   }
  // },
  methods: {
    save() {
      console.log(this.$store.state.tasks[0].enabled)
    },
    reStartTask(e){
      e.timeStamp=10;
      e.finished=false; 
    }
  }
}

</script>
