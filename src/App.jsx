import { AuthProvider } from "./context"
import { AppRouter } from "./router/AppRouter"

function App() {
  return (
    <AuthProvider>
      <AppRouter className="ruotes"/>
    </AuthProvider>
  )
}

export default App