import { Suspense } from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import routes from "./routing/Router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function renderRoutes(routes) {
  return routes.map(({ id, path, element, children, index }) => (
    <Route key={id} path={path} element={element} index={index}>
      {children && renderRoutes(children)}
    </Route>
  ));
}

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>{renderRoutes(routes)}</Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
