import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "./layout/rootLayout";
import BlogListPage from "./pages/blogListPage";
import BlogDetail from "./pages/blogDetailsPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<BlogListPage/>} />
            <Route path="/:id" element={<BlogDetail/>}/> 
        </Route>
    )
) 
 
export default router;