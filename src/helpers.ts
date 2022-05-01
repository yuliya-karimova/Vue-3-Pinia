import {
  OptionType,
  SelectResultType,
  StepResultType,
  StepType,
  VariantResultType
} from "./globalTypes";

export const getResultTemplate = (stepList: StepType[]): StepResultType[] => {
  return stepList.map((step) => {
    const variants: VariantResultType[] = step.variants.map((variant) => {
      const selects: SelectResultType[] = variant.select.map((select) => {
        return {
          title: select.title,
          selectedItem: null
        };
      });

      return {
        title: variant.title,
        price_default: variant.price_default,
        options: [],
        selects
      };
    });

    return {
      title: step.title,
      selectedVariant: null,
      variants
    };
  });
};

export const getOptionsSum = (optionList: OptionType[]) => {
  return optionList.reduce((acc, { price }) => acc + price, 0);
};

export const getSelectsSum = (selectList: SelectResultType[]) => {
  return selectList.reduce(
    (acc, select) => acc + (select.selectedItem?.price || 0),
    0
  );
};
