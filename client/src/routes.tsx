import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./layout/rootLayout";
import BlogListPage from "./pages/blogListPage";
import BlogDetail from "./pages/blogDetailsPage";
import UserAuthForm from "./pages/userAuthForm";
import Editor from "./pages/editorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<BlogListPage />} />
        <Route path="/:id" element={<BlogDetail />} />
        <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="signup" element={<UserAuthForm type="sign-up" />} />
      </Route>
      ,
      <Route path="/editor" element={<Editor />} />
    </>
  )
);

export default router;
