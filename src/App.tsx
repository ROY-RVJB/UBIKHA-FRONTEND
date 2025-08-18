import { AppRouter } from './router/AppRouter';
import { UserProvider } from './contexts/UserContext';
import { PropertyFormProvider } from './contexts/PropertyFormContext';

function App() {
  return (
    <UserProvider>
      <PropertyFormProvider>
        <AppRouter />
      </PropertyFormProvider>
    </UserProvider>
  );
}

export default App;