<template>
  <v-container class="dashboard fill-height">
    <v-layout row align-center wrap>
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
        <v-flex xs4 pa-3 v-for="x in 5" >
          <v-card>
            <!-- <v-card-title primary-title> -->
              <v-layout row pa-3 py-3>
                <v-flex shrink>
                  <v-avatar color="purple lighten-5">
                    <v-icon>account_circle</v-icon>
                  </v-avatar>
                </v-flex>
                <v-flex headline text-truncate text-sm-left pt-2 px-3>
                  Location
                </v-flex>
                <v-flex>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" icon class="vertIcon">
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-tile v-for="(item, index) in items" :key="index" @click="">
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-flex>
              </v-layout>

                <!-- <div class="headline">Liking posts of {{x.username}}'s followers</div> -->
                <!-- <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span> -->
            <!-- </v-card-title> -->
            <v-flex px-3 text-sm-left limitTo4>
              #f4f #s4s #l4l #c4c #likeforlike #likeall #like4like #likes4likes #liking #instagood #tagblender #follow #followme #followback #followforfollow #follow4follow #followers #followher #follower #followhim #followbackteam #followall #comment #comments #commentback #comment4comment #commentbelow #shoutout #shoutouts #shoutoutback
            </v-flex>
            <v-flex pa-2 class="box-s">
              <canvas class="chart" style="width: 100%;"></canvas>
            </v-flex>
            <v-card-actions>
              <v-switch label="paused"></v-switch>
              <v-spacer></v-spacer>

            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>
<script>

export default {
  name: 'dashboard',
  data: () => ({
    items: [
      { title: 'Edit' },
      { title: 'Delete' },
    ]
  }),
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
  computed: {
    data () {
      return this.$store.state
    }
  },
  methods: {
    save () {
      console.log(this.$store.state.tasks[0].enabled)
    }
  }
}
</script>
