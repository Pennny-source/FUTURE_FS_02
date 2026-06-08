import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';


export default function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1e1e2e', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      }} />
    </>
  );
}