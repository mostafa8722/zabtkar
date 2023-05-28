<template>
  <v-app>
    <v-main class="pa-0 ma-0" style="background-color: var(--accent-color);">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'
import BottomNavigation from './components/BottomNavigation'

export default {
  name: 'App',
  components: {
    AppBar,
    BottomNavigation
  }
};
</script>
