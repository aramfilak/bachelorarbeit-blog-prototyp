import { Routes, Route } from "react-router";
import Home from "./pages/home.tsx";
import Blog from "./pages/blog.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { MainNav } from "./components/main-nav.tsx";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blog" element={<Blog />} />
      </Routes>
    </ThemeProvider>
  );
}
