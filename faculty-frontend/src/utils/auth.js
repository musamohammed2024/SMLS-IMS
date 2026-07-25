const AUTH_KEY = "faculty_mis_auth";

/**
 * LOGIN USER
 * Stores authenticated user and JWT token
 */
export const login = (user, token) => {
  const session = {
    isLoggedIn: true,
    user,
    token,
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
};

/**
 * LOGOUT USER
 */
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

/**
 * GET AUTH SESSION
 */
export const getAuth = () => {
  const auth = localStorage.getItem(AUTH_KEY);

  if (!auth) return null;

  try {
    return JSON.parse(auth);
  } catch (error) {
    return null;
  }
};

/**
 * CHECK IF USER IS LOGGED IN
 */
export const isAuthenticated = () => {
  const auth = getAuth();
  return auth?.isLoggedIn === true;
};

/**
 * GET CURRENT USER
 */
export const getUser = () => {
  const auth = getAuth();
  return auth?.user || null;
};

/**
 * GET JWT TOKEN
 */
export const getToken = () => {
  const auth = getAuth();
  return auth?.token || null;
};

/**
 * GET USER ROLE
 */
export const getUserRole = () => {
  const auth = getAuth();
  return auth?.user?.role || null;
};

/**
 * CHECK SINGLE ROLE
 */
export const hasRole = (role) => {
  return getUserRole() === role;
};

/**
 * CHECK MULTIPLE ROLES
 */
export const hasAnyRole = (roles = []) => {
  return roles.includes(getUserRole());
};