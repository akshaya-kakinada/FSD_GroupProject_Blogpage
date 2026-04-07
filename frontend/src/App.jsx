import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import PostEditorPage from './pages/PostEditorPage';
import { useAuth } from './context/AuthContext';
import ScrollProgressBar from './components/common/ScrollProgressBar';

const Protected = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App = () => (
  <div className="min-h-screen flex flex-col">
    <ScrollProgressBar />
    <Navbar />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/post/:slug" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<Protected><AdminDashboard /></Protected>} />
        <Route path="/admin/post/new" element={<Protected><PostEditorPage /></Protected>} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
