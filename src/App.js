import "./App.css";
import Footer from "./components/Footer";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Main } from "./components/Main";

function App() {
  return (
    <div className="App">
      <div className="todoapp">
        <Header />
        <Input />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
