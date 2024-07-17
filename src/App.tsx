import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import MainRoutes from "./routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <MainRoutes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
