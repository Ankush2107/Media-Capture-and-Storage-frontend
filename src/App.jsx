import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { NotificationProvider } from './context/NotificationContext';

// Components
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <Router>
          {/* Apply global styles */}
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)]"> {/* Adjust based on navbar height */}
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </NotificationProvider>
    </Provider>
  );
}

export default App;