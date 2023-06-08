<template>
  <div class="form-container">
    <h1 class="form-header">Create Itinerary</h1>
    <form  @submit.prevent="handleSubmit" >
      <label for="name">Itinerary Name:</label>
      <input class="input" type="text" id="name" v-model="itinerary.name" required>

      <br>
      <label for="date">Start Date:</label>
      <input type="date" id="startDate" v-model="itinerary.startDate" required>

      <br>
      <label for="date">End Date:</label>
      <input type="date" id="endDate" v-model="itinerary.endDate" required>

      <br>
      <div>
        <span>Days</span>
        <button class="button" @click="addDay">Add Day</button>
      </div>
      <div v-for="(day, index) in itinerary.days" :key="index">
        <h2>Day {{ index + 1 }}</h2>
        <label for="date">Date:</label>
        <input type="date" v-model="day.date" required>

        <div>
          Destinations:
          <button class="button" @click="addDestination(index)">Add Destination</button>
        </div>

        <div v-for="(destination, destIndex) in day.destinations" :key="destIndex">
          <h3>Destination {{ destIndex + 1 }}</h3>
          <label for="location">Location:</label>
          <input type="text" v-model="destination.location" required>

          <br>
          <div class="form-card">
            <div>
              <span>Activities</span>
              <button class="button" @click="addActivity(index, destIndex)">Add Activity</button>
            </div>
            <div v-for="(activity, actIndex) in destination.activities" :key="actIndex">
              <h4>Activity {{ actIndex + 1 }}</h4>
              <label for="activityName">Name:</label>
              <input type="text" v-model="activity.name" required>
              <label for="startTime">Start Time:</label>
              <input type="time" v-model="activity.startTime" required>
              <label for="endTime">End Time:</label>
              <input type="time" v-model="activity.endTime" required>
            </div>
          </div>
        </div>
      </div>
      <button class="button" type="submit">Create</button>
    </form>
  </div>
</template>

<script>

import ItineraryServices from '../services/ItineraryServices';

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
                ]
              }
            ]
          }
        ]
      }
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

input {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input {
  width: 300px;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input:focus {
  outline: none;
  border-color: #007bff;
}

.button {
  display: inline-block;
  padding: 5px 10px;
  margin-bottom: 2px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

