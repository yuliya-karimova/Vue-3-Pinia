import { defineStore } from "pinia";
import data from "../data/data.json";
import { OptionType, SelectItemType, StepType, VariantType } from "../globalTypes";
import { getOptionsSum, getResultTemplate, getSelectsSum } from "../helpers";

const stepList: StepType[] = JSON.parse(JSON.stringify(data));

export const useNewCustomerStore = defineStore("NewCustomerStore", {
  state: () => ({
    currentStep: 0,
    stepList: stepList,
    stepsResults: getResultTemplate(stepList)
  }),

  getters: {
    totalPrice(state) {
      const total = state.stepsResults.reduce((acc, step) => {
        const selectedVariantResults = step.variants.find(
          ({ title }) => title === step.selectedVariant?.title
        );

        if (selectedVariantResults) {
          let optionsSum = getOptionsSum(selectedVariantResults.options);
          let selectsSum = getSelectsSum(selectedVariantResults.selects);

          const variantPrice =
            selectedVariantResults.price_default + selectsSum + optionsSum;

          return (acc += variantPrice);
        }

        return acc;
      }, 0);

      return total;
    }
  },

  actions: {
    checkOption(option: OptionType, stepIndex: number, variantIndex: number) {
      this.stepsResults[stepIndex].variants[variantIndex].options.push(option);
    },

    uncheckOption(option: OptionType, stepIndex: number, variantIndex: number) {
      this.stepsResults[stepIndex].variants[variantIndex].options =
        this.stepsResults[stepIndex].variants[variantIndex].options.filter(
          ({ title }) => title !== option.title
        );
    },

    changeSelectedItem(
      selectItemData: SelectItemType,
      stepIndex: number,
      variantIndex: number,
      selectIndex: number
    ) {
      this.stepsResults[stepIndex].variants[variantIndex].selects[
        selectIndex
      ].selectedItem = selectItemData;
    },

    changeSelectedVariant(stepIndex: number, variantData: VariantType) {
      this.stepsResults[stepIndex].selectedVariant = variantData;
    },

    changeCurrentStep(stepIndex: number) {
      this.currentStep = stepIndex;
    },
  }
});
