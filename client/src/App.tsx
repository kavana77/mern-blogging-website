import { RouterProvider } from "react-router-dom";
import ReactQueryProvide from "./providers/reactQueryProvider";
import router from "./routes";

const App = () => {
  return ( 
    <ReactQueryProvide>
      <RouterProvider router={router}/>
    </ReactQueryProvide>
   );
}
 
export default App;