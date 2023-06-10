<template>
  <v-container class="form-container">
    <h1 class="form-header">Edit Itinerary</h1>
    <v-form @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="itinerary.name" label="Itinerary Name" required></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field v-model="itinerary.startDate" label="Start Date" type="date" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="itinerary.endDate" label="End Date" type="date" required></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div>
            <span>Days</span>
            <v-btn @click="addDay" color="primary" small class="ml-4">
              Add Day
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row v-for="(day, index) in itinerary.days" :key="index">
        <v-col cols="12">
          <h2>Day {{ index + 1 }}</h2>
          <v-text-field v-model="day.date" label="Date" type="date" required></v-text-field>
        </v-col>

        <v-col cols="12">
          <div>
            Destinations:
            <v-btn @click="addDestination(index)" color="primary" small class="ml-4">
              Add Destination
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" v-for="(destination, destIndex) in day.destinations" :key="destIndex">
          <h3>Destination {{ destIndex + 1 }}</h3>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="destination.location" label="Location" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select v-model="destination.hotel" :items="hotels" :item-title="'hotel_name'" :item-value="'id'"
                :hint="destination.hotel && `address: ${destination.hotel.address} | rating: ${destination.hotel.rating}`"
                label="Select Hotel" persistent-hint variant="underlined" return-object single-line></v-select>
            </v-col>
          </v-row>

          <div class="form-card">
            <div>
              <span>Activities</span>
              <v-btn @click="addActivity(index, destIndex)" color="primary" small class="ml-4">
                Add Activity
              </v-btn>
            </div>
            <div v-for="(activity, actIndex) in destination.activities" :key="actIndex">
              <h4>Activity {{ actIndex + 1 }}</h4>
              <v-text-field v-model="activity.name" label="Name" required></v-text-field>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="activity.startTime" label="Start Time" type="time" required></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="activity.endTime" label="End Time" type="time" required></v-text-field>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-btn type="submit" color="primary">
        Update
      </v-btn>
    </v-form>
  </v-container>
</template>


<script>
import { ref, onMounted } from 'vue';
import ItineraryServices from '../services/ItineraryServices';
export default {
  data() {
    return {
      id: this.$route.params.id,
      itinerary: {
        id: '',
        name: '',
        startDate: '',
        endDate: '',
      },
      hotels: []
    };
  },


  async mounted() {
    try {
      const hotelsResponse = await ItineraryServices.getHotels();
      this.hotels = await hotelsResponse.data;
      const response = await ItineraryServices.getItinerary(this.id);
      const itinerary = response.data
      itinerary.days = itinerary.days.map(day => {
        const mappedDay = day
        mappedDay.date = day.day_date
        mappedDay.destinations = day.destinations.map(destination => {
          const mappedDestination = destination
          mappedDestination.location = destination.destination_name
          mappedDestination.hotel = this.hotels.filter(x => x.id == destination.hotelId)[0]
          console.log(this.hotels, mappedDestination.hotelId)
          mappedDestination.activities = destination.activities.map(activity => {
            const mappedActivity = activity;
            mappedActivity.startTime = activity.start_time
            mappedActivity.endTime = activity.end_time
            mappedActivity.name = activity.activity_name
            return mappedActivity
          })
          return mappedDestination;
        });
        return mappedDay;
      });
      this.itinerary = itinerary;
    } catch (error) {
      console.error('Error:', error);
    }
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault();
      await ItineraryServices.updateItinerary({ ...this.itinerary, userId: JSON.parse(localStorage.getItem('user')).id }, this.itinerary.id)
      this.$router.push({ name: "itinerary" })
    },
    addDestination(dayIndex) {
      this.itinerary.days[dayIndex].destinations.push({
        location: '',
        activities: [
          {
            name: '',
            start_time: '',
            end_time: ''
          }
        ]
      });
    },
    addActivity(dayIndex, destIndex) {
      this.itinerary.days[dayIndex].destinations[destIndex].activities.push({
        name: '',
        start_time: '',
        end_time: ''
      });
    },
    addDay() {
      this.itinerary.days.push({
        date: '',
        destinations: [
          {
            location: '',
            activities: [
              {
                name: '',
                start_time: '',
                end_time: ''
              }
            ]
          }
        ]
      })
    },
  }
};
</script>


<style>
.form-container {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
}

.form-header {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-card {
  padding: 20px;
  margin-bottom: 20px;
}

.form-card-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.add-button {
  margin-top: 10px;
}
</style>

