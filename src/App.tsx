import { useState } from "react";

import { DateSelection } from "./components/date-selection";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto flex h-screen flex-col gap-4">
      <h1 className="mt-2">Stopwatch</h1>
      <DateSelection />
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </div>
  );
}

export default App;
