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
  price_default: number;
  options: OptionType[];
  select: SelectType[];
};

export type StepType = {
  title: string;
  variants: VariantType[];
};

export enum ConnectionVariants {
  STANDART = "Стандартное подключение",
  LUX = "LUX подключение"
}
