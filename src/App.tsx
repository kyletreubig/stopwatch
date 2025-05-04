import { Daily } from "./components/daily";
import { DateSelection } from "./components/date-selection";
import { Projects } from "./components/projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  return (
    <Tabs
      className="container mx-auto flex h-screen flex-col gap-4"
      defaultValue="daily"
    >
      <div className="flex justify-between items-end">
        <h1 className="mt-2">Stopwatch</h1>
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent className="flex flex-col gap-4" value="daily">
        <DateSelection />
        <Daily />
      </TabsContent>

      <TabsContent value="projects">
        <Projects />
      </TabsContent>
    </Tabs>
  );
}

export default App;
