import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import About from "./components/About";
import EcoFeatures from "./components/EcoFeatures";
import EnquiryForm from "./components/EnquiryForm";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Properties from "./components/Properties";
import StatsBar from "./components/StatsBar";
import Testimonials from "./components/Testimonials";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <StatsBar />
          <Properties />
          <EcoFeatures />
          <About />
          <Testimonials />
          <EnquiryForm />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
