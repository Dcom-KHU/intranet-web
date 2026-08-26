// AppLayout.tsx

import Navbar from "../components/nav-bar/Navbar";
import Footer from "../components/Footer";
import useAuth from "../features/auth/hooks/useAuth";
import PageTransition from "../components/PageTransition";

export default function AppLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <PageTransition animateOnMount />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <PageTransition />
      </main>

      <Footer />
    </div>
  );
}
