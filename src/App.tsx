import { Login } from "./Login"
import bgStars from "./assets/bg-stars.svg"

function App() {
  return (
    <main className="flex overflow-hidden px-7 flex-col justify-center items-center bg-gradient-to-br h-svh md:h-full md:min-h-screen  from-secondary-100  to-secondary-200 relative">
      <title>Clario test showcase</title>
      <img src={bgStars} className="absolute md:top-auto top-16" />
      <Login />
    </main>
  )
}

export default App
