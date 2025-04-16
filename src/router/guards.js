import useAuth from "@/hooks/useAuth.js";

export const isAuthenticated = async (to, from, next) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated.value && to.name !== "Login") {
    next({ name: "Login" });
  } else {
    next();
  }
};
