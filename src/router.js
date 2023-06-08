import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/itinerary",
      name: "itinerary",
      component: () => import("./views/ViewAllItineraries.vue"),
    },
    {
      path: "/create-itinerary",
      name: "create-itinerary",
      component: () => import("./views/CreateItinerary.vue"),
    },
    {
      path: "/edit-itinerary/:id",
      name: "edit-itinerary",
      component: () => import("./views/EditItinerary.vue"),
    },
  ],
});

export default router;
