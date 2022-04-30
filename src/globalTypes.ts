export type OptionType = {
  title: string;
  price: number;
};

export type SelectItemType = {
  title: string;
  price: number;
};

export type SelectType = {
  title: string;
  items: SelectItemType[];
};

export type VariantType = {
  title: string;
  description: string;
  color: string;
  price_default: string;
  options: OptionType[];
  select: SelectType[];
};

export type StepType = {
  title: string;
  variants: VariantType[];
};
