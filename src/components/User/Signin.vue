<template>
<v-container>
  <v-layout rpw v-if="error">
    <v-flex xs-12 sm6 offset-sm3>
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </v-flex>
  </v-layout>

<v-layout>
 <v-flex xs-12 sm6 offset-sm3>
    <v-layout class="mb-3">Login with:</v-layout>
    <v-btn
    fab
    flat
    @click="onSigninWithGoogle">
      <v-img height="52px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/></v-img>
    </v-btn>

    <v-layout class="mb-3 mt-3">Or:</v-layout>

  </v-flex>

</v-layout>

  <v-layout>
    <v-flex xs-12 sm6 offset-sm3>
      <v-card>
          <v-container>
            <form @submit.prevent="onSignin">

               <v-layout row>
                <v-flex xs12>
                  <v-text-field
                  name="email"
                  label="Mail"
                  id="email"
                  v-model="email"
                  type="email"
                  required></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  v-model="password"
                  type="password"
                  required></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-btn type="submit" :disabled="loading" :loading="loading">
                    Sign In
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </v-btn>

                  Don't have account?<router-link to="/signup" tag="span" style="cursor: pointer; color: blue" > Create new</router-link>
                </v-flex>
              </v-layout>


            </form>
          </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    onSigninWithGoogle () {
      this.$store.dispatch('signUserInWithGoogle', {email: this.email, password: this.password})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
