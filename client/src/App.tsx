import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PointsProvider } from "./contexts/PointsContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import Videos from "./pages/Videos";
import Games from "./pages/Games";
import GamePlay from "./pages/GamePlay";
import Puzzles from "./pages/Puzzles";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";

function Router() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <div className="min-h-screen flex flex-col" dir="rtl">
        <Navbar />
        <main className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/stories" component={Stories} />
            <Route path="/stories/:id" component={StoryDetail} />
            <Route path="/videos" component={Videos} />
            <Route path="/games" component={Games} />
            <Route path="/games/:id" component={GamePlay} />
            <Route path="/puzzles" component={Puzzles} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <PointsProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </PointsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
