import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Disclaimer from "@/pages/Disclaimer";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Tenants from "./pages/Tenants";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import DashboardLayout from "./components/DashboardLayout";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={SplashScreen} />
      <Route path={"/disclaimer"} component={Disclaimer} />
      <Route path={"/terms"} component={TermsOfService} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/login"} component={Login} />
      <Route path={"/dashboard"} component={() => (
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      )} />
      <Route path={"/properties"} component={() => (
        <DashboardLayout>
          <Properties />
        </DashboardLayout>
      )} />
      <Route path={"/tenants"} component={() => (
        <DashboardLayout>
          <Tenants />
        </DashboardLayout>
      )} />
      <Route path={"/payments"} component={() => (
        <DashboardLayout>
          <Payments />
        </DashboardLayout>
      )} />
      <Route path={"/reports"} component={() => (
        <DashboardLayout>
          <Reports />
        </DashboardLayout>
      )} />
      <Route path={"/settings"} component={() => (
        <DashboardLayout>
          <Settings />
        </DashboardLayout>
      )} />
      <Route path={"/notifications"} component={() => (
        <DashboardLayout>
          <Notifications />
        </DashboardLayout>
      )} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
