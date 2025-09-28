import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

// Auth Pages
import LandingPage from "./pages/LandingPage";
import BeneficiaryLogin from "./pages/beneficiary/BeneficiaryLogin";
import BankLogin from "./pages/bank/BankLogin";

// Beneficiary Pages
import BeneficiaryDashboard from "./pages/beneficiary/BeneficiaryDashboard";
import UploadProof from "./pages/beneficiary/UploadProof";
import VerificationTimeline from "./pages/beneficiary/VerificationTimeline";
import VerificationStatus from "./pages/beneficiary/VerificationStatus";
import MapView from "./pages/beneficiary/MapView";
import NotificationsCenter from "./pages/beneficiary/NotificationsCenter";
import Profile from "./pages/beneficiary/Profile";
import SupportChat from "./pages/beneficiary/SupportChat";

// Bank Pages
import BankDashboard from "./pages/bank/BankDashboard";
import AddCustomer from "./pages/bank/AddCustomer";
import UpdateLoanProgress from "./pages/bank/UpdateLoanProgress";
import ManageCustomers from "./pages/bank/ManageCustomers";
import NotificationsManager from "./pages/bank/NotificationsManager";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            {/* Auth Routes */}
            <Route path="/login/beneficiary" element={<BeneficiaryLogin />} />
            <Route path="/login/bank" element={<BankLogin />} />
            
            {/* Beneficiary Routes */}
            <Route path="/beneficiary/dashboard" element={<BeneficiaryDashboard />} />
            <Route path="/beneficiary/upload" element={<UploadProof />} />
            <Route path="/beneficiary/timeline" element={<VerificationTimeline />} />
            <Route path="/beneficiary/status" element={<VerificationStatus />} />
            <Route path="/beneficiary/map" element={<MapView />} />
            <Route path="/beneficiary/notifications" element={<NotificationsCenter />} />
            <Route path="/beneficiary/profile" element={<Profile />} />
            <Route path="/beneficiary/support" element={<SupportChat />} />
            
            {/* Bank Routes */}
            <Route path="/bank/dashboard" element={<BankDashboard />} />
            <Route path="/bank/add-customer" element={<AddCustomer />} />
            <Route path="/bank/update-progress" element={<UpdateLoanProgress />} />
            <Route path="/bank/manage-customers" element={<ManageCustomers />} />
            <Route path="/bank/notifications" element={<NotificationsManager />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;