<template>
  <v-app>
     <v-navigation-drawer v-model="sideNav" absolute temporary>
       <v-list>
         <v-list-tile
         v-for="item in menuItems"
         :key="item.title"
         :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{ item.title }}
            </v-list-tile-content>
         </v-list-tile>

        <v-list-tile
          v-if="userIsAuthanticated"
          @click="onLogout"
        >
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              Logout
            </v-list-tile-content>
         </v-list-tile>

       </v-list>
    </v-navigation-drawer>

    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
      @click="sideNav = !sideNav"
      class="hidden-sm-and-up"></v-toolbar-side-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Owl Meetups</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
         {{ item.title }}
        </v-btn>
        <v-btn
          flat
          v-if="userIsAuthanticated"
          @click="onLogout"
         >
          <v-icon left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <main>
      <router-view>

      </router-view>
    </main>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'face', title: 'Sign Up', link: '/signup'},
        {icon: 'lock_open', title: 'Sign In', link: '/signin'}
      ]
      if (this.userIsAuthanticated) {
        menuItems = [
        {icon: 'supervisor_account', title: 'View meetups', link: '/meetups'},
        {icon: 'add', title: 'Create meetup', link: '/meetup/new'},
        {icon: 'person', title: 'Profile', link: '/profile'}
        ]
      }
      return menuItems
    },
    userIsAuthanticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  },
  name: 'App'
}
</script>
