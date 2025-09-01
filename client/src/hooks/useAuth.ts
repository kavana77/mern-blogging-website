const useAuth = () => {
  const isSignIn = localStorage.getItem("isSignIn") === "true";
  const signIn = () => {
    localStorage.setItem("isSignIn", "true");
  };
  const signOut = () => {
    localStorage.setItem("isSignIn", "false");
    window.location.reload();
  };
  return { isSignIn, signIn, signOut };
};

export default useAuth;
