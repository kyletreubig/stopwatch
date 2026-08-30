import { Daily } from "./components/daily";
import { DateSelection } from "./components/date-selection";
import { Projects } from "./components/projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Weekly } from "./components/weekly";

function App() {
  return (
    <Tabs
      className="container mx-auto flex min-h-screen flex-col gap-4 px-2 pb-[calc(6.5rem+env(safe-area-inset-bottom))] sm:h-screen sm:px-0 sm:pb-0"
      defaultValue="daily"
    >
      <div className="flex items-end justify-between">
        <h1 className="mt-2 flex items-center gap-2">
          <img className="h-12" src="/stopwatch/stopwatch.svg" />
          Stopwatch
        </h1>
        <TabsList className="hidden sm:inline-flex">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent className="flex flex-col gap-4" value="daily">
        <DateSelection />
        <Daily />
      </TabsContent>

      <TabsContent className="flex flex-col gap-4" value="weekly">
        <DateSelection />
        <Weekly />
      </TabsContent>

      <TabsContent value="projects">
        <Projects />
      </TabsContent>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:hidden">
        <div className="pointer-events-auto mx-auto w-full max-w-md rounded-2xl border bg-background/95 p-1 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <TabsList className="grid h-12 w-full grid-cols-3 rounded-xl">
            <TabsTrigger className="font-semibold" value="daily">
              Daily
            </TabsTrigger>
            <TabsTrigger className="font-semibold" value="weekly">
              Weekly
            </TabsTrigger>
            <TabsTrigger className="font-semibold" value="projects">
              Projects
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
    </Tabs>
  );
}

export default App;
