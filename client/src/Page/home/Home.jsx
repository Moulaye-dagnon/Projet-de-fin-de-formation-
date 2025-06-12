import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-10">
      <button className="p-2 rounded w-30 me-4"><Link to={"/loguptest"}>S'inscrire</Link></button>
      <button className="p-2 rounded  me-4"><Link to={"/login"}>Se connecter</Link></button>
    </div>
  );
}
