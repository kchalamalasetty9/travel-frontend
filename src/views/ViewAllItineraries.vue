<script>
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import ItineraryServices from '../services/ItineraryServices.js';

export default {
  setup() {
    const items = ref([]);
    const searchText = ref("");
    const router = useRouter();

    const fetchData = async () => {
      try {
        const response = await ItineraryServices.getItineraries(
          JSON.parse(localStorage.getItem('user')).id
        );
        items.value = response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    };

    onMounted(async () => {
      await fetchData();
    });

    function createItinerary () {
      router.push('/create-itinerary');
    }
    return {
      items, createItinerary, searchText
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
    },
  }
  
};
</script>

<template>
  <div class="form-container mt-5">
    <div class="flex-container mb-2">
    <div class="flex-item"><h2 class="form-header">My Itineraries</h2></div>
    <div class="flex-item">
      <button @click="createItinerary" style="float: right;" class="button ml-4" >Create New Itinerary</button>
      <v-text-field v-model="searchText" label="Search Itineraries" append-inner-icon="mdi-magnify" density="compact"
        variant="solo"
        single-line
        hide-details ></v-text-field>
        
      </div>
  </div>
    <div>
      <v-table class="rounded-lg elevation-5">
        <thead>
          <tr>
            <th>Itinerary Name</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.id">
            <td>
              <router-link :to="{ name: 'edit-itinerary', params: { id: item.id }}">{{ item.name }}</router-link>
            </td>
            <td>{{ item.startDate }}</td>
            <td>{{ item.endDate }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<style>

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-item {
  flex: 1;
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

.form-container {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
}

.form-header {
  font-size: 24px;
  margin-bottom: 10px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  border: 1px solid #ccc;
}

.table th {
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: left;
}

.table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table tbody tr:hover {
  background-color: #eaeaea;
}

</style>