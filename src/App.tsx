import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';
import { LoginPage } from '@/features/auth/LoginPage';
import { ForgotPasswordPage } from '@/features/auth/ForgotPasswordPage';
import { VerifyOtpPage } from '@/features/auth/VerifyOtpPage';
import { ResetPasswordPage } from '@/features/auth/ResetPasswordPage';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Loader2 } from 'lucide-react';

// Features imports
import { NewsList } from '@/features/news/NewsList';
import { NewsForm } from '@/features/news/NewsForm';
import { GalleryList } from '@/features/gallery/GalleryList';
import { GalleryForm } from '@/features/gallery/GalleryForm';
import { OpportunitiesList } from '@/features/opportunities/OpportunitiesList';
import { OpportunitiesForm } from '@/features/opportunities/OpportunitiesForm';
import { FaqList } from '@/features/faq/FaqList';
import { FaqForm } from '@/features/faq/FaqForm';
import { ContactList } from '@/features/contact/ContactList';
import { ContactForm } from '@/features/contact/ContactForm';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { CreateAdminPage } from '@/features/admin/CreateAdminPage';
import { Toaster } from '@/components/ui/toaster';


function App() {
  const { checkAuth, isChecking } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Himoyalangan yo'llar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard Route */}
          <Route index element={<DashboardPage />} />

          {/* Admin Routes */}
          <Route
            path="admins/create"
            element={
              <ProtectedRoute roles={['SuperAdmin']}>
                <CreateAdminPage />
              </ProtectedRoute>
            }
          />

          {/* News Routes */}
          <Route path="news" element={<NewsList />} />
          <Route path="news/new" element={<NewsForm />} />
          <Route path="news/:id" element={<NewsForm />} />

          {/* Gallery Routes */}
          <Route path="gallery" element={<GalleryList />} />
          <Route path="gallery/new" element={<GalleryForm />} />
          <Route path="gallery/:id" element={<GalleryForm />} />

          {/* Opportunities Routes */}
          <Route path="opportunities" element={<OpportunitiesList />} />
          <Route path="opportunities/new" element={<OpportunitiesForm />} />
          <Route path="opportunities/:id" element={<OpportunitiesForm />} />

          {/* FAQ Routes */}
          <Route path="faq" element={<FaqList />} />
          <Route path="faq/new" element={<FaqForm />} />
          <Route path="faq/:id" element={<FaqForm />} />

          {/* Contact Routes */}
          <Route path="contact" element={<ContactList />} />
          <Route path="contact/new" element={<ContactForm />} />
          <Route path="contact/:id" element={<ContactForm />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;