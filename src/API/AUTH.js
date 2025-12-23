
const usersData = {
  bartekK2: {
    password: "12345678",
    /*...*/
  },
};


 export function login(username, password) {
  if(usersData[username] && usersData[username].password === password) {
    localStorage.setItem("user", JSON.stringify({ username }));
    return true;
  } else {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
}

export function isLoggedIn() {
  return !!getCurrentUser();
}

export function register(username, password) {
  if (usersData[username]) return false;
  usersData[username] = { password };
  return true;
}