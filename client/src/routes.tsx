import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./layout/rootLayout";
import BlogListPage from "./pages/blogListPage";
import BlogDetail from "./pages/blogDetailsPage";
import UserAuthForm from "./pages/userAuthForm";
import PostForm from "./pages/postPage";
// import EditPage from "./pages/editPage";

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
      <Route path="/editor" element={<PostForm />} />
      <Route path="/editor/:id" element={<PostForm/>}/>
    </>
  )
);

export default router;
