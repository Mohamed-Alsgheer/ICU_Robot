import toast from "react-hot-toast";
import { NavLink } from "react-router-dom"
import { Button } from "../UI/Button";

export const Navbar = () => {

  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  // const userData = userDataString ? JSON.parse(userDataString): null;

  const isLoggedIn = userDataString ? true: false;

  const onLogout = () => {
    localStorage.removeItem(storageKey);
    toast.success("You will navigate to the login page after 2 seconds.",
      {
        position: "bottom-center",
        duration: 2000,
        style: {backgroundColor: "black", color: "white", width: "fit-content",},
      }
    );
    setTimeout(() => {
      location.replace("/login");
    }, 2000);
  }

  return (
    <nav className="w-full h-24 flex items-center justify-around text-xl capitalize shadow-lg px-10 max-lg:px-5 static">
      <h1 className="text-3xl font-bold uppercase text-indigo-700">ICU Robot</h1>
      <ul className="h-full flex items-center justify-center gap-6 font-medium">
        <li className="hover:text-indigo-400 ease-in-out duration-150">
          <NavLink to="/">home</NavLink>
        </li>
        {isLoggedIn ? (
          <li className="hover:text-indigo-400 ease-in-out duration-150">
            <Button type="button" onClick={onLogout}>logout</Button>
          </li>
        ):(
          <li className="hover:text-indigo-400 ease-in-out duration-150">
            <NavLink to="/login">login</NavLink>
          </li>
        )
        }
      </ul>
    </nav>
  )
}
