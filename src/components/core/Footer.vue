<template>
  <v-footer
    id="core-footer"
    absolute :class="{'leftDrawerMargin': $root.drawer&&$vuetify.breakpoint.name != 'sm'}"
    height="82"
  >
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.Link"
          class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }} 
      App Assistant
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', Link: '#/' },
      { name: 'About Us', Link: 'https://appassistant.io' },
      { name: 'Instagram', Link: 'https://instagram.com/appassistant' },
      { name: 'Privacy Policy', Link: 'https://appassistant.io/privacypolicy' },
      { name: 'Terms of service', Link: 'https://appassistant.io/termsofservice' }
    ]
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
