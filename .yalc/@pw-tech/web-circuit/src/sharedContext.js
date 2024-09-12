import getHookAndProviderFromSlices from "react-context-slices";

export const { useSlice, Provider } = getHookAndProviderFromSlices({
  slices: {
    count1: { initialArg: 0 },
    count2: {
      initialState: 0,
      reducers: {
        increment: (state) => state + 1,
      },
    },
  },
});