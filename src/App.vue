<template>
  <v-app class="app">
    //хуй
    <Header />
    <router-view />
    <v-footer class="footer">
      <span>v. 1.0</span>
      <span class="px-1">—</span>
      <strong>github</strong>
    </v-footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'App',

  components: {
    Header,
  },
};
</script>

<style lang="scss">
  .page {
    margin-top: 58px;
    padding-right: 40px;
    padding-left: 40px;

    &__section {
      & + & {
        margin-top: 58px;
      }
    }
  }

  .footer {
    height: 48px;
    justify-content: center;
  }
</style>
