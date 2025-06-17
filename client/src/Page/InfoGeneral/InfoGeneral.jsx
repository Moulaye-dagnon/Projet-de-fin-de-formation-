import { All_user_project } from "../../api/all_project_by_user";
import InfoProjectItem from "../../Components/InfoProjectItem/InfoProjectItem";
import SpinnerComponent from "../../Components/Spinner/SpinnerComponent";

function InfoGeneral() {
  const { UserProject, loading } = All_user_project();

  if (loading) return <SpinnerComponent />;

  if (UserProject.length === 0) {
    return (
      <div className=" flex-1 flex justify-center items-center ">
        <p> Ouups! Vous n'avez pas encore de projet</p>
      </div>
    );
  }

  return (
    <div className=" flex-1 overflow-y-auto">
      {UserProject.map((item) => (
        <InfoProjectItem item={item} key={item._id} />
      ))}
    </div>
  );
}

export default InfoGeneral;
