import ScrollToTop from './hooks/scrollToTop';
import UserRoutes from './routes/userRoutes/UserRoutes';
import AdminRoutes from './routes/adminRoutes/AdminRoutes';
function App() {
  return (
    <>
      <ScrollToTop />
      <UserRoutes />
      <AdminRoutes />
    </>
  );
}

export default App;