import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        {/*className="text-3xl font-bold underline text-green-500"*/}
        {/*/QuickeyIt*/}
        <Outlet />
      </main>
      <Footer />
      <Toaster/>
    </>
  );
}

export default App;
