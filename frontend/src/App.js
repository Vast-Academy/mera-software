import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { DatabaseProvider } from './context/DatabaseContext';
import AppContent from './AppContent';

function App() {
  return (
    <DatabaseProvider>
    <AppContent />
  </DatabaseProvider>
  );
}

export default App;