import { ChakraMultiPartComponentType } from '@/types/module/chakra/chakra-multi-part-component-type';

const parts = [
  'root',
  'tab',
  'tablist',
  'tabpanel',
  'tabpanels',
  'indicator',
] as const;

export const Tabs: ChakraMultiPartComponentType<typeof parts> = {
  parts,
  baseStyle: {},
  defaultProps: {},
  sizes: {},
  variants: {},
};
