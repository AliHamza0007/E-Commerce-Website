import { useState, useEffect, useContext, createContext } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      let ParseData = JSON.parse(data);
      setAuth({ ...auth, user: ParseData.user, token: ParseData.token });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//cutom hook for global use of auth
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
