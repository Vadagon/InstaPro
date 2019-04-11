<template>
  <v-container class="dashboard fill-height">
    <v-layout row wrap align-content-start>
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
        <v-flex xs6 md4 pa-3 v-for="(x, index) in data.tasks">
          <v-layout column  elevation-2 white align-space-around justify-start fill-height>
            <!-- <v-card-title primary-title> -->
            <v-flex>
              <v-layout row pa-3 py-3>
                <v-flex shrink>
                  <v-avatar color="purple lighten-5">
                    <v-icon>{{data.icons[x.type]}}</v-icon>
                    <!-- person_add_disabled -->
                  </v-avatar>
                </v-flex>
                <v-flex headline text-truncate text-sm-left pt-3 mt-1 px-3 text-capitalize style="position: relative;">
                  <span class="caption" style="position: absolute; top: 0;">{{x.description}}</span>
                  {{x.section}}: {{x.username}}
                </v-flex>
                <v-flex shrink>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" icon class="vertIcon">
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <!-- array.splice(index, 1); -->
                      <v-list-tile @click="$router.push({ name: 'target', params: { taskNum: index } })">
                        <v-list-tile-title>{{x.draft?'Continue editing':'Edit'}}</v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile @click="data.tasks.splice(index, 1);">
                        <v-list-tile-title>Delete</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
                <!-- <div class="headline">Liking posts of {{x.username}}'s followers</div> -->
                <!-- <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span> -->
            <!-- </v-card-title> -->
            <v-flex px-3 xs12 text-sm-left limitTo4>
              <span v-for="span in x.accounts" v-if="span.checked">{{span.username}} </span>
              <!-- #f4f #s4s #l4l #c4c #likeforlike #likeall #like4like #likes4likes #liking #instagood #tagblender #follow #followme #followback #followforfollow #follow4follow #followers #followher #follower #followhim #followbackteam #followall #comment #comments #commentback #comment4comment #commentbelow #shoutout #shoutouts #shoutoutback -->
            </v-flex>
            <v-flex shrink pa-2 class="box-s" v-if="!x.draft">
              <canvas class="chart"></canvas>
            </v-flex>
            <v-card-actions grow>
              <v-switch label="enabled" v-model="x.enabled" v-if="!x.draft"></v-switch>
              <p class="grey--text text--darken-0 py-0 pt-1 font-weight-thin.font-italic headline" v-if="x.draft">Draft</p>
            </v-card-actions>
          </v-layout>
        </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
import Chart from 'chart.js';
export default {
  name: 'dashboard',
  // data: () => ({
  //   items: [{ title: 'Edit' }, { title: 'Delete' }, ]
  // }),
  computed: {
    data () {
      return {...this.$store.state, icons: {
        unfollow: 'person_add_disabled',
        like: 'favorite',
      }}
    }
  },
  mounted () {
      $('.chart').each(function(){
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
              displayColors:false,
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
                  zeroLineColor:"rgba(255,255,255,0.5)"
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
  // computed: {
  //   data () {
  //     return this.$store.state
  //   }
  // },
  methods: {
    save () {
      console.log(this.$store.state.tasks[0].enabled)
    }
  }
}
</script>
