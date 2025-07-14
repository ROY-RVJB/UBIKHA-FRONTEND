
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginArrendadorPage, LoginArrendatarioPage, LoginAdministradorPage  } from '../pages';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-arrendador" element={<LoginArrendadorPage />} />
        <Route path="/login-arrendatario" element={<LoginArrendatarioPage />} />
        <Route path="/login-administrador" element={<LoginAdministradorPage />} />
      </Routes>
    </Router>
  );
};
