import { Routes, Route } from "react-router";
import Home from "./pages/home.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { MainNav } from "./components/main-nav.tsx";
import { Toaster } from "sonner";
import NotFound from "./components/not-found.tsx";
import Blog from "./pages/blog.tsx";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainNav />
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<Blog />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}
