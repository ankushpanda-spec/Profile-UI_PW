import { LabelValue } from "../types/constants";

export const formatToLabelValue = (array: string[]): LabelValue[] =>
    array.map((item: string) => ({
      label: item,
      value: item,
    })) || [];