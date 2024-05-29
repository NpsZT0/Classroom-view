import { router } from "./routes/root";
import { RouterProvider } from "react-router-dom";
import Navbar from "./components/SidebarComponent";
import ContextProvider from "./context/UseContext";

function App() {
  return (
    <main className="flex h-auto m-0 dark:bg-slate-700 dark:text-white">
      <Navbar />
      <div className="container h-auto">
        <ContextProvider>
          <RouterProvider router={router} />
        </ContextProvider>
      </div>
    </main>
  );
}

export default App;
