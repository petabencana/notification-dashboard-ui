import './App.css';
import NotificationsContainer from './containers/NotificationsDashboard'
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <NotificationsContainer />
    </ChakraProvider>
  );
}

export default App;
