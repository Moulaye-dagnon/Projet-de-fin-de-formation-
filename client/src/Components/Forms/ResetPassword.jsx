import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/set-new-password", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({password}),
    })
      .then((req) => req.json())
      .then((res) => console.log(res));
  }
  return (
    <div>
      <form
        className="flex flex-col gap-3"
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="nom">Nouveau Mot de passe</label>
        <input
          type="text"
          id="nom"
          className="border-2 border-black rounded py-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
