<template>
  <v-container class="plans" pa-0>
    <v-layout row wrap align-center justify-center>
      <v-flex xs12 sm8 md8 lg8 class="custom-box" v-for="(data, index) in datas" :key="index" v-bind:class="(index==2)?'third-box':''">
        <v-card v-bind:class="[checkIfCenter(index)?'center-box':'']" :dark="true">
          <v-card-title primary-title class="justify-center">
            <h1 class="text-xs-center">{{data.title}}</h1>
          </v-card-title>
          <v-card-text>
            <v-flex xs12>
              <h2 class="price text-xs-center mb-3">Organic/Real Services</h2>
            </v-flex>
            <v-layout row wrap>
              <v-flex xs9 sm9 mg9 lg9>
                <span class="feature-label">
                  <span class="font-weight-bold">Instagram</span> - Followers, Likes, Views, Comments, Engagement
                </span>
              </v-flex>
              <v-flex xs9 sm9 mg9 lg9>
                <span class="feature-label">
                  <span class="font-weight-bold">Youtube</span> - Views, likes, Comments, Subscribers
                </span>
              </v-flex>
              <v-flex xs9 sm9 mg9 lg9>
                <span class="feature-label">
                  <span class="font-weight-bold">Soundcloud</span> - Downloads, Plays, Followers
                </span>
              </v-flex>
              <v-flex xs9 sm9 mg9 lg9>
                <span class="feature-label">
                  <span class="font-weight-bold">Twitter</span> - Followers, Retweets, Likes, Impressions
                </span>
              </v-flex>
              <v-flex xs9 sm9 mg9 lg9>
                <span class="feature-label">
                  <span class="font-weight-bold">Facebook</span> - Views, Page Likes, Shares
                </span>
              </v-flex>
              <v-flex xs9 sm9 mg9 lg9>
                <span class="feature-label">
                  <span class="font-weight-bold">Spotify</span> - Streams, Playlist, Listeners 
                </span>
              </v-flex>
              <v-flex xs9 sm9 mg9 lg9>
                <span class="feature-label">
                  <span class="font-weight-bold">iOS</span> - Downloads, Top 20 Ranking, Ads, Install, Reviews
                </span>
              </v-flex>
            </v-layout>
          </v-card-text>
          <div style="text-align:center">
            <v-btn round :href="'https://entertainment258portal.com'" target="_blank" class="custom-btn">Buy Now</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'Social Media Store',
  data() {
   return {
      datas: [
      { title: 'Social Media Store', price: 250,
       items: [
          {label: 'Instagram - Followers, Likes, Views, Comments, Engagement', value:"YES", class: 'yes'},
          {label: 'Youtube - Views, likes, Comments, Subscribers', value:"Monthly", class: 'monthly'},
          {label: 'Feature Label 3', value:"No", class: 'no'},
          {label: 'Feature Label 4', value:"YES", class: 'yes'},
          {label: 'Feature Label 5', value:"Monthly", class: 'monthly'},
          {label: 'Feature Label 6', value:"No", class: 'no'},
          {label: 'Feature Label 7', value:"Monthly", class: 'monthly'},
          {label: 'Feature Label 8', value:"No", class: 'no'},
        ] 
      }
      ],
    }
  },
  methods: {
    checkIfCenter(index){
      return index==1;
    }
  }
}
</script>