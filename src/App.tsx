import { memo, useLayoutEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { KNOWN_ROUTES } from "@/lib/constants";
import { LayoutProvider } from "@/contexts/LayoutContext";
import Home from "./pages/Home";
import Quotes from "./pages/Quotes";
import Commands from "./pages/Commands";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import GlobalScrollbar from "./components/GlobalScrollbar";
import PageWrapper from "./components/PageWrapper";

const queryClient = new QueryClient();

const AppRoutes = memo(function AppRoutes() {
  const location = useLocation();
  const { pathname } = location;
  const isNotFoundPage = !KNOWN_ROUTES.includes(pathname as (typeof KNOWN_ROUTES)[number]);

  return (
    <div className={`min-h-screen flex flex-col ${isNotFoundPage ? "" : "pt-16"}`}>
      <Navigation />
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/quotes"
              element={
                <PageWrapper>
                  <Quotes />
                </PageWrapper>
              }
            />
            <Route
              path="/commands"
              element={
                <PageWrapper>
                  <Commands />
                </PageWrapper>
              }
            />
            <Route
              path="*"
              element={
                <PageWrapper>
                  <NotFound />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer key={pathname} />
      {!isNotFoundPage && <ScrollToTopButton />}
    </div>
  );
});

const AppContent = memo(function AppContent() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);
  return (
    <LayoutProvider>
      <GlobalScrollbar />
      <AppRoutes />
    </LayoutProvider>
  );
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AppContent />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
