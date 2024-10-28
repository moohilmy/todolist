import { authLogout } from "@store/auth/authSlice";
import { useAppDispatch } from "@store/hooks";
import { clearTasks } from "@store/tasks/taskSlice";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const ListItems = () => {
  const dispatch = useAppDispatch();
  interface IListItems {
    id: number;
    name: string;
    icon: string;
    To: string;
  }
  const { id } = useParams();
  const listItems: IListItems[] = [
    {
      id: 1,
      name: "Tasks",
      icon: "bi bi-clipboard",
      To: `/profile/${id}`,
    },
    {
      id: 2,
      name: "Create a new task",
      icon: "bi bi-pen",
      To: `create-task`,
    },
    {
      id: 3,
      name: "Edit Profile",
      icon: "bi bi-person-fill",
      To: `edit-profile`,
    },
    {
      id: 4,
      name: "Log out",
      icon: "bi bi-door-open",
      To: "logout",
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      {listItems.map((item) =>
        item.id === 4 ? (
          <button
            key={item.id}
            className="active-out transition-all duration-300 w-full cursor-pointer text-darkBlue mb-4 hover:text-white hover:bg-red-800 hover:rounded"
            onClick={() => {
              dispatch(authLogout());
              dispatch(clearTasks())
              navigate("/");
            }}
          >
            <li className="flex items-center p-2">
              <i className={`${item.icon} text-xl mr-5`}></i>
              <span className="inline-block">{item.name}</span>
            </li>
          </button>
        ) : (
          <NavLink
            key={item.id}
            className="transition-all duration-300 w-full cursor-pointer text-darkBlue mb-4 hover:text-sky-500 hover:bg-darkblue hover:rounded"
            to={item.To}
            end
          >
            <li className="flex items-center p-2">
              <i className={`${item.icon} text-xl mr-5`}></i>
              <span className="inline-block">{item.name}</span>
            </li>
          </NavLink>
        )
      )}
    </>
  );
};

export default ListItems;
