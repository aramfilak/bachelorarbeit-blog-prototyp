import { Routes, Route } from "react-router";
import Home from "./pages/home.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { MainNav } from "./components/main-nav.tsx";
import { Toaster } from "sonner";
import NotFound from "./components/not-found.tsx";
import Blog from "./pages/blog.tsx";
import NewBlog from "./pages/new-blog.tsx";
import BlogEdit from "./pages/blog-edit.tsx";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainNav />
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Blog routes */}
        <Route path="/blog">
          <Route path="new" element={<NewBlog />} />
          <Route path=":blogId" element={<Blog />} />
          <Route path=":blogId/edit" element={<BlogEdit />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}
