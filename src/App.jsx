import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './pages/Dashboard';
import CampaignList from './pages/CampaignList';
import CampaignDashboard from './pages/CampaignDashboard';
import CreatorDetail from './pages/CreatorDetail';
import Creators from './pages/Creators';
import CreatorProfilePage from './pages/CreatorProfilePage';
import Analytics from './pages/Analytics';
import SignIn from './pages/SignIn';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaigns" element={<CampaignList />} />
            <Route path="/campaigns/:campaignId" element={<CampaignDashboard />} />
            <Route path="/campaigns/:campaignId/creators/:creatorId" element={<CreatorDetail />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/creators/:creatorId" element={<CreatorProfilePage />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
