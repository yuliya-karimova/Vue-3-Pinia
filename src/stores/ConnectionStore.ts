import { defineStore } from "pinia";
import data from "../data/data.json";

export const useConnectionStore = defineStore("ConnectionStore", {
  state: () => ({
    steps: data,
    currentStep: 0
  }),
  getters: {
    steps: (state) => state.steps,
    currentStep: (state) => state.currentStep
  },
  actions: {
    
  }
});
