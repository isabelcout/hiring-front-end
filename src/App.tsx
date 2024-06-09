import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Products from "./components/Products";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Products />
    </QueryClientProvider>
  );
};

export default App;