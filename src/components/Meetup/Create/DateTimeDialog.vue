<template>
<div>

  <v-dialog width="350px" v-model="dateDialogIsOpened">
    <v-btn class="primary" accent slot="activator">
      <v-icon dark left>access_time</v-icon>
      <div v-if="editableDate == ''">
        Set Date and Time
      </div>
      <div v-else>
        {{ editableDateTime.toString().slice(0, 24) }}
      </div>
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
           <v-date-picker v-model="editableDate" style="width:100%" actions>
             <template slot-scope="{save, cancel}">
              <v-btn
                class="blue--text darken-1"
                flat
                @click.native="dateDialogIsOpened = false">Close</v-btn>
              <v-btn
                class="blue--text darken-1"
                flat
                @click.native="onDateSaveChanges">Next</v-btn>
             </template>
           </v-date-picker>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>

  </v-dialog>

  <v-dialog width="350px" v-model="timeDialogIsOpened">
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width:100%" actions format="24hr">
              <template slot-scope="{save, cancel}">
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="timeDialogIsOpened = false">Close</v-btn>
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="onTimeSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
            </v-flex>
          </v-layout>

        </v-container>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      dateDialogIsOpened: false,
      timeDialogIsOpened: false,
      editableDate: '',
      editableTime: new Date(),
      editableDateTime: new Date()
    }
  },
  methods: {
    onDateSaveChanges () {
      const newDay = new Date(this.editableDate).getUTCDate()
      const newMonth = new Date(this.editableDate).getUTCMonth()
      const newYear = new Date(this.editableDate).getUTCFullYear()

      this.editableDateTime.setUTCDate(newDay)
      this.editableDateTime.setUTCMonth(newMonth)
      this.editableDateTime.setUTCFullYear(newYear)

      this.dateDialogIsOpened = false
      this.timeDialogIsOpened = true
    },
    onTimeSaveChanges () {
      const hours = this.editableTime.match(/^(\d+)/)[1]
      const minutes = this.editableTime.match(/:(\d+)/)[1]
      this.editableDateTime.setHours(hours)
      this.editableDateTime.setMinutes(minutes)

      this.$emit('meetup-date-time', this.editableDateTime)
      this.timeDialogIsOpened = false
    }
  }
}
</script>
