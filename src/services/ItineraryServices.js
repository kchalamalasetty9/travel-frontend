import apiClient from "./services";

export default {
  getItineraries(userId) {
    return apiClient.get(`/users/${userId}/itineraries`);
  },
  addItinerary(itinerary) {
    return apiClient.post("itineraries", itinerary);
  },
  updateItinerary(itinerary, itineraryId) {
    return apiClient.put(`itineraries/${itineraryId}`, itinerary);
  },
  deleteItinerary(itineraryId) {
    return apiClient.delete(`itineraries/${itineraryId}`);
  },
  getItinerary(itineraryId) {
    return apiClient.get(`itineraries/${itineraryId}`);
  },
  getHotels(){
    return apiClient.get('hotels')
  },
  
};



