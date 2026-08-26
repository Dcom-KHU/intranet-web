import AppRouter from "./app/app-router";
import UnsavedChangesProvider from "./features/upload/context/UnsavedChangesProvider";

export default function App() {
  return (
    <UnsavedChangesProvider>
      <AppRouter />
    </UnsavedChangesProvider>
  );
}
