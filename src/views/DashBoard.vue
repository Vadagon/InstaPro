<template>
  <v-container class="dashboard fill-height">
    <div class="flex_statistic">
      <div class="canvas_wrapper">
        <div class="canvas">
        <canvas id="followings" width="100" height="50"></canvas>
        <div class="shadows"></div>
          </div>
          <h2>12739<img src="../assets/up-arrow.svg" class="arr"></h2>
          <h3>FOLLOWING</h3>
      </div>


      <div class="canvas_wrapper">
        <div class="canvas">
        <canvas id="liking" width="100" height="50"></canvas>
        <div class="shadows"></div>
          </div>
          <h2>123123 <img src="../assets/up-arrow.svg" class="arr"></h2>
          <h3>LIKING</h3>
      </div>
      <div class="canvas_wrapper">
        <div class="canvas">
        <canvas id="Unfollowing" width="100" height="50"></canvas>
        <div class="shadows"></div>
          </div>
          <h2>123<img src="../assets/down-arrow.svg" class="arr"></h2>
          <h3>UNFOLLOWING</h3>
      </div>
      <div class="canvas_wrapper">
        <div class="canvas">
        <canvas id="followers_per_day" width="100" height="50"></canvas>
        <div class="shadows"></div>
          </div>
          <h2>12<img src="../assets/up-arrow.svg" class="arr"></h2>
          <h3>FOLLOWING/DAY </h3>
      </div>
      <div class="canvas_wrapper">
        <div class="canvas">
          <canvas id="likes_per_day" width="100" height="50"></canvas>
          <div class="shadows"></div>
            </div>
            <h2>22222<img src="../assets/down-arrow.svg" class="arr"></h2>
            <h3>LIKING/DAY </h3>
          </div>
      <div class="canvas_wrapper">
        <div class="canvas">
          <canvas id="comments_per_day" width="100" height="50"></canvas>
          <div class="shadows"></div>
            </div>
            <h2>12332<img src="../assets/up-arrow.svg" class="arr"></h2>
            <h3>Comments/DAY</h3>
      </div>
    </div>

    <!-- <v-layout align-center>
      <v-card style="max-width: 360px;" v-for="x in data.tasks">
        <v-card-title primary-title>
          <div>
            <div class="headline">Liking posts of {{x.username}}'s followers</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-switch label="enable" v-model="x.enabled" @change="save()"></v-switch>
        </v-card-actions>
      </v-card>
    </v-layout> -->
  </v-container>
</template>
<script>
  export default {
    name: 'dashboard',
    data: () => ({

    }),
    mounted() {


      var comments_per_day = document.getElementById('comments_per_day').getContext('2d');
      var likes_per_day = document.getElementById('likes_per_day').getContext('2d');
      var followers_per_day = document.getElementById('followers_per_day').getContext('2d');
      var liking = document.getElementById('liking').getContext('2d');
      var unfollowing = document.getElementById('Unfollowing').getContext('2d');
      var followings = document.getElementById('followings').getContext('2d');
     var  statistic_arr = [comments_per_day,likes_per_day,followers_per_day,liking,unfollowing,followings]
    for (var i = 0; i < statistic_arr.length; i++) {
    console.log(  statistic_arr[i])

    var gradientFill = statistic_arr[i].createLinearGradient(0,0,0,130);
    console.log(gradientFill)
    gradientFill.addColorStop(1, "rgba(255,255,255,1)");
    gradientFill.addColorStop(0.2, "rgba(219,213,246,1)");
    statistic_arr[i].fillStyle=gradientFill;
    statistic_arr[i].fillRect(0,0,50,50);
    }


      var comments_per_day_arr = new Chart(comments_per_day, {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{

            data: [0, 10, 12, 14, 22, 20,14,28,30,25,12,14,33,34,27,25,0, 10, 12, 14, 22, 20,14,28,30,25,12,14,33,34,27,25],
            backgroundColor:gradientFill ,
            borderColor: [

              'rgba(102, 75, 228)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          layout: {
           padding: {
               left: -10,
               right: 0,
               top: 0,
               bottom: -10
           }
       },
          legend: {
            display: false
          },
          elements: {
            line: {
              tension: 0
            },
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }],
            yAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.yLabel;
              }
            }
          }
        }


      });
      var likes_per_day_arr = new Chart(likes_per_day, {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{

            data: [0, 10, 12, 14, 22, 20,14,28,30,25,12,14,33,34,27,25],
            backgroundColor:gradientFill,
            borderColor: [
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          layout: {
           padding: {
               left: -10,
               right: 0,
               top: 0,
               bottom: -10
           }
       },
          legend: {
            display: false
          },
          elements: {
            line: {
              tension: 0
            },
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }],
            yAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.yLabel;
              }
            }
          }
        }


      });
      var followers_per_day_arr = new Chart(followers_per_day, {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{

            data: [0, 10, 12, 14, 22, 20,14,28,30,25,12,14,33,34,27,25],
            backgroundColor:gradientFill,
            borderColor: [
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          layout: {
           padding: {
               left: -10,
               right: 0,
               top: 0,
               bottom: -10
           }
       },
          legend: {
            display: false
          },
          elements: {
            line: {
              tension: 0
            },
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }],
            yAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.yLabel;
              }
            }
          }
        }


      });
      var unfollowing_arr = new Chart(unfollowing, {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{

            data: [0, 10, 12, 14, 22, 20,14,28,30,25,12,14,33,34,27,25],
            backgroundColor:gradientFill,
            borderColor: [
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          layout: {
           padding: {
               left: -10,
               right: 0,
               top: 0,
               bottom: -10
           }
       },
          legend: {
            display: false
          },
          elements: {
            line: {
              tension: 0
            },
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }],
            yAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.yLabel;
              }
            }
          }
        }


      });
      var followings_arr = new Chart(followings, {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{

            data: [0, 10, 12, 14, 22, 20,14,28,30,25,12,14,33,34,27,25],
            backgroundColor:gradientFill,
            borderColor: [
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228, 1)',
              'rgba(102, 75, 228)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          layout: {
           padding: {
               left: -10,
               right: 0,
               top: 0,
               bottom: -10
           }
       },
          legend: {
            display: false
          },
          elements: {
            line: {
              tension: 0
            },
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }],
            yAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.yLabel;
              }
            }
          }
        }


      });
      var liking_arr = new Chart(liking, {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','1','2','3','4'],
          datasets: [{
            data: [0, 10, 17, 15, 12, 20,10,20,30,25,12,14,33,34,27,25],
            backgroundColor: gradientFill,
            borderColor: [

              'rgba(102, 75, 228)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          layout: {
           padding: {
               left: -10,
               right: 0,
               top: 0,
               bottom: -10
           }
       },
          legend: {
            display: false
          },
          elements: {
            line: {
              tension: 0
            },
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }],
            yAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.yLabel;
              }
            }
          }
        }


      }, );
    },

    computed: {
      data() {
        return this.$store.state
      }
    },
    methods: {
      save() {
        console.log(this.$store.state.tasks[0].enabled)
      }
    }
  }
</script>
