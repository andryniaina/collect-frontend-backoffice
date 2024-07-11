import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import MainRoutes from "./routes/Routes";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MainRoutes />
    </ThemeProvider>
  );
}

export default App;
