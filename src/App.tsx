import { memo } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { KNOWN_ROUTES } from "@/lib/constants";
import Home from "./pages/Home";
import Content from "./pages/Content";
import Merch from "./pages/Merch";
import Quotes from "./pages/Quotes";
import Commands from "./pages/Commands";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import SalesAndRefunds from "./pages/SalesAndRefunds";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import GlobalScrollbar from "./components/GlobalScrollbar";
import ScrollToTop from "./components/ScrollToTop";
import PageWrapper from "./components/PageWrapper";

const queryClient = new QueryClient();

const AppRoutes = memo(function AppRoutes() {
  const location = useLocation();
  const { pathname } = location;
  const isNotFoundPage = !KNOWN_ROUTES.includes(pathname as (typeof KNOWN_ROUTES)[number]);

  return (
    <div className={`min-h-screen flex flex-col ${isNotFoundPage ? "" : "pt-16"}`}>
      <Navigation />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/content" element={<PageWrapper><Content /></PageWrapper>} />
            <Route path="/merch" element={<PageWrapper><Merch /></PageWrapper>} />
            <Route path="/quotes" element={<PageWrapper><Quotes /></PageWrapper>} />
            <Route path="/commands" element={<PageWrapper><Commands /></PageWrapper>} />
            <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
            <Route path="/terms-of-use" element={<PageWrapper><TermsOfUse /></PageWrapper>} />
            <Route path="/sales-and-refunds" element={<PageWrapper><SalesAndRefunds /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      {!isNotFoundPage && <ScrollToTopButton />}
    </div>
  );
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GlobalScrollbar />
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
