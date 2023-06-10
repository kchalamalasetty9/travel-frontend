<template>
  <v-container class="form-container">
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="form-header">Create Itinerary</h1>
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
              <v-card>
                <v-card-title>
                  <div>
                    <span>Days</span>
                    <v-btn @click="addDay" color="primary" small class="ml-4">
                      Add Day
                    </v-btn>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-row v-for="(day, index) in itinerary.days" :key="index">
                    <v-col cols="12">
                      <h2 class="mb-4">Day {{ index + 1 }}</h2>
                      <v-text-field v-model="day.date" label="Date" type="date" required></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-card>
                        <v-card-title>
                          <div>
                            Destinations
                            <v-btn @click="addDestination(index)" color="primary" small class="ml-4">
                              Add Destination
                            </v-btn>
                          </div>
                        </v-card-title>
                        <v-card-text>
                          <v-row v-for="(destination, destIndex) in day.destinations" :key="destIndex">
                            <v-col cols="12">
                              <h3>Destination {{ destIndex + 1 }}</h3>
                              <v-row>
                                <v-col cols="6"><v-text-field v-model="destination.location" label="Location"
                                    required></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                  <v-select v-model="destination.hotel" :items="hotels"
                                   :item-title="'hotel_name'" :item-value="'id'" :hint="destination.hotel && `address: ${destination.hotel.address} | rating: ${ destination.hotel.rating }`"
                                    label="Select Hotel" 
                                    persistent-hint
                                    variant="underlined"
                                    return-object
                                    single-line
                                    ></v-select>

                                </v-col>
                              </v-row>
                            </v-col>

                            <v-col cols="12">
                              <v-card>
                                <v-card-title>
                                  <div>
                                    <span>Activities</span>
                                    <v-btn @click="addActivity(index, destIndex)" color="primary" small class="ml-4">
                                      Add Activity
                                    </v-btn>
                                  </div>
                                </v-card-title>
                                <v-card-text>
                                  <v-row v-for="(activity, actIndex) in destination.activities" :key="actIndex">
                                    <v-col cols="12">
                                      <h4>Activity {{ actIndex + 1 }}</h4>
                                      <v-text-field v-model="activity.name" label="Name" required></v-text-field>
                                      <v-row>
                                        <v-col cols="6"><v-text-field v-model="activity.startTime" label="Start Time"
                                            type="time" required></v-text-field></v-col>
                                        <v-col cols="6"><v-text-field v-model="activity.endTime" label="End Time"
                                            type="time" required></v-text-field></v-col>
                                      </v-row>
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-btn type="submit" color="primary" class="mt-4">
            Create
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>

import { ref, onMounted } from 'vue';
import ItineraryServices from '../services/ItineraryServices';
const hotels = ref([])

export default {
  data() {
    return {
      itinerary: {
        name: '',
        days: [
          {
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
                ],
              }
            ]
          }
        ]
      },
      hotels: []
    };
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault();
      await ItineraryServices.addItinerary({ ...this.itinerary, userId: JSON.parse(localStorage.getItem('user')).id })
      this.$router.push({ name: "itinerary" })
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
    }
  },
  setup() {
    const hotels = ref([]);
    const fetchHotels = async () => {
      try {
        const response = await ItineraryServices.getHotels();
        hotels.value = await response.data;
        console.log(hotels.value)
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(async () => {
      await fetchHotels();
    })
    return { hotels }
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

