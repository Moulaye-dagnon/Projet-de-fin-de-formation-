export const fetchAuth = (token,logout,navigate) => {
  try {
        fetch("http://localhost:4000/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }).then((req) => {
          if (req.status === 401) {
            logout();
            navigate("/login");
            return;
          } else {
            return req.json();
          }
        });
      } catch (error) {
        console.log(error);
      }
}