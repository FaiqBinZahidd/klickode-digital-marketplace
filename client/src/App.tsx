import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import Browse from "@/pages/browse";
import AssetDetail from "@/pages/asset-detail";
import AITools from "@/pages/ai-tools";
import Learn from "@/pages/learn";
import Playground from "@/pages/playground";
import Forum from "@/pages/forum";
import SellerDashboard from "@/pages/seller-dashboard";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Reviews from "@/pages/reviews";
import Business from "@/pages/business";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";
import AuthCallback from "@/pages/auth-callback";
import SystemPrompt from "@/pages/system-prompt";
import DemoCheckeredPage from "@/components/demo-checkered-page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/browse" component={Browse} />
              <Route path="/asset/:id" component={AssetDetail} />
              <Route path="/ai-tools" component={AITools} />
              <Route path="/learn" component={Learn} />
              <Route path="/playground" component={Playground} />
              <Route path="/forum" component={Forum} />
              <Route path="/seller-dashboard" component={SellerDashboard} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/reviews" component={Reviews} />
              <Route path="/business" component={Business} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/terms" component={Terms} />
              <Route path="/auth/callback" component={AuthCallback} />
              <Route path="/system-prompt" component={SystemPrompt} />
              <Route path="/demo" component={DemoCheckeredPage} />
              <Route component={NotFound} />
            </Switch>
            <Toaster />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}