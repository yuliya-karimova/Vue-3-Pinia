import { defineStore } from "pinia";
import data from "../data/data.json";
import { OptionType, StepType, VariantType } from "../globalTypes";

const stepList: StepType[] = JSON.parse(JSON.stringify(data));

export const useNewCustomerStore = defineStore("NewCustomerStore", {
  state: () => ({
    steps: stepList,
    currentStep: 0,
    standartVariantCheckedOptions: [] as OptionType[],
    luxVariantSelect: {} as VariantType,
    routerVariant: {} as VariantType
  }),

  getters: {
    totalPrice() {}
  },

  actions: {
    checkStandartOption(option: OptionType) {
      this.standartVariantCheckedOptions.push(option);
    },
    uncheckStandartOption(option: OptionType) {
      this.standartVariantCheckedOptions =
        this.standartVariantCheckedOptions.filter(
          ({ title }) => title !== option.title
        );
    }
  }
});
