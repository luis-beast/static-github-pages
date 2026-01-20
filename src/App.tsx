import { memo } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { KNOWN_ROUTES } from "@/lib/constants";
import { LayoutProvider } from "@/contexts/LayoutContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Content from "./pages/Content";
import Streams from "./pages/Streams";
import Music from "./pages/Music";
import Laypeople from "./pages/Laypeople";
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
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/content" element={
              <ProtectedRoute pageId="content">
                <PageWrapper><Content /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/streams" element={
              <ProtectedRoute pageId="streams">
                <PageWrapper><Streams /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/music" element={
              <ProtectedRoute pageId="music">
                <PageWrapper><Music /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/laypeople" element={
              <ProtectedRoute pageId="laypeople">
                <PageWrapper><Laypeople /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/merch" element={
              <ProtectedRoute pageId="merch">
                <PageWrapper><Merch /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/quotes" element={
              <ProtectedRoute pageId="quotes">
                <PageWrapper><Quotes /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/commands" element={
              <ProtectedRoute pageId="commands">
                <PageWrapper><Commands /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/privacy-policy" element={
              <ProtectedRoute pageId="privacy-policy">
                <PageWrapper><PrivacyPolicy /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/terms-of-use" element={
              <ProtectedRoute pageId="terms-of-use">
                <PageWrapper><TermsOfUse /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/sales-and-refunds" element={
              <ProtectedRoute pageId="sales-and-refunds">
                <PageWrapper><SalesAndRefunds /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      {!isNotFoundPage && <ScrollToTopButton />}
    </div>
  );
});

const AppContent = memo(function AppContent() {
  return (
    <AuthProvider>
      <LayoutProvider>
        <GlobalScrollbar />
        <AppRoutes />
      </LayoutProvider>
    </AuthProvider>
  );
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
