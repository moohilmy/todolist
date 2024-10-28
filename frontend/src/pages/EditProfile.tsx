import { Outlet } from "react-router";

const EditProfile = () => {

  return (
    <>
      <div className="grid content-center sm:my-10 my-6 grid-cols-4">
        <h1 className="col-span-full col-start-2 text-2xl ">
          Profile Page
        </h1>
      </div>
      <Outlet/>

    </>
  );
};

export default EditProfile;
