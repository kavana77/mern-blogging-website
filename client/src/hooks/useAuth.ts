const useAuth = () => {
  const token = localStorage.getItem("token") || "";
  const isSignIn = localStorage.getItem("isSignIn") === "true";
  console.log("isSignIn:", isSignIn);
console.log("token:", token);
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
