import { DateSelection } from "./components/date-selection";

function App() {
  return (
    <div className="container mx-auto flex h-screen flex-col gap-4">
      <h1 className="mt-2">Stopwatch</h1>
      <DateSelection />
    </div>
  );
}

export default App;
