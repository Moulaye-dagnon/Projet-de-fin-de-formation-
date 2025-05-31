import React, { useContext } from "react";
import { All_user_project } from "../../api/all_project_by_user";
import InfoProjectItem from "../../Components/InfoProjectItem/InfoProjectItem";

function InfoGeneral() {
  const { UserProject, loading, setNewProject } = All_user_project();

  if (loading) {
    return <div>...chargement</div>;
  }
  if (UserProject) {
    console.log(UserProject[0]);

    return (
      <div className=" flex-1 overflow-y-auto">
        {UserProject.map((item) => (
          <InfoProjectItem item={item} />
        ))}
      </div>
    );
  }
}

export default InfoGeneral;
