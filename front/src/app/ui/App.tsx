import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../shared/stores";
import "../styles/global.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>What</div>,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
