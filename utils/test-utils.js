import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { store as setupStore } from "../src/app/store";

const renderWithProviders = (
  ui,
  {
    customRoutes,
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </Provider>
    );
  };
  
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export * from "@testing-library/react";
export default renderWithProviders;