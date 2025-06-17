import { All_user_project } from "../../api/all_project_by_user";
import InfoProjectItem from "../../Components/InfoProjectItem/InfoProjectItem";
import SpinnerComponent from "../../Components/Spinner/SpinnerComponent";

function InfoGeneral() {
  const { UserProject, loading } = All_user_project();

  if (loading) return <SpinnerComponent />;
  if (UserProject)
    return (
      <div className=" flex-1 overflow-y-auto">
        {UserProject.map((item) => (
          <InfoProjectItem item={item} key={item._id} />
        ))}
      </div>
    );
  return (
    <div className="flex-1 flex justify-center items-center  ">
      <p className=" uppercase"> Vous n'avez pas de projet</p>
    </div>
  );
}

export default InfoGeneral;
