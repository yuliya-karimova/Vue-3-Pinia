import { defineStore } from "pinia";
import data from "../data/data.json";
import {
  OptionType,
  SelectItemType,
  StepType,
  VariantType
} from "../globalTypes";
import { ConnectionVariants } from "../globalTypes";

const stepList: StepType[] = JSON.parse(JSON.stringify(data));

export const useNewCustomerStore = defineStore("NewCustomerStore", {
  state: () => ({
    currentStep: 0,
    steps: stepList,
    connectionVariant: null as VariantType | null,
    routerVariant: null as VariantType | null,
    standartCheckedOptions: [] as OptionType[],
    luxSelectedItem: null as SelectItemType | null
  }),

  getters: {
    isConnectionStandart: (state) => {
      return state.connectionVariant?.title === ConnectionVariants.STANDART
    },
  
    isConnectionLux: (state) => {
      return state.connectionVariant?.title === ConnectionVariants.LUX
    },

    standartPrice: (state) => {
      return (
        state.steps[0].variants[0].price_default +
        state.standartCheckedOptions.reduce((acc, { price }) => acc + price, 0)
      );
    },

    luxPrice: (state) => {
      return (
        state.steps[0].variants[1].price_default +
        (state.luxSelectedItem?.price || 0)
      );
    },

    totalPrice(state) {
      let total = 0;

      if (this.isConnectionStandart) {
        total += this.standartPrice;
      }

      if (this.isConnectionLux) {
        total += this.luxPrice;
      }

      if (state.routerVariant) {
        total += state.routerVariant.price_default;
      }

      return total;
    }
  },

  actions: {
    checkOption(option: OptionType) {
      this.standartCheckedOptions.push(option);
    },

    uncheckOption(option: OptionType) {
      this.standartCheckedOptions = this.standartCheckedOptions.filter(
        ({ title }) => title !== option.title
      );
    },

    selectLuxOption(option: OptionType) {
      this.luxSelectedItem = option;
    },

    changeConnectionVariant(variant: VariantType) {
      this.connectionVariant = variant;
    },

    changeRouterVariant(variant: VariantType) {
      this.routerVariant = variant;
    },

    changeCurrentStep(stepNumber: number) {
      this.currentStep = stepNumber;
    }
  }
});
