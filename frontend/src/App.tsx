import './App.css';
import ProjectList from './ProjectList';
import CookieConsent from 'react-cookie-consent';

function App() {
  return (
    <>
      <ProjectList />
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
}

export default App;
