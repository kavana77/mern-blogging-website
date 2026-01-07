const useAuth = () => {
  const token = localStorage.getItem("token") || "";
  const isSignIn = localStorage.getItem("isSignIn") === "true";
  const signIn = () => {
    localStorage.setItem("isSignIn", "true");
  };
  const signOut = () => {
    localStorage.setItem("isSignIn", "false");
    window.location.reload();
  };
  return { isSignIn, signIn, signOut , token};
};

export default useAuth;
