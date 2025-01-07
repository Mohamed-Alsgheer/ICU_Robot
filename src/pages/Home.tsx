import { useState } from "react";
import { Button } from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import { NavLink } from "react-router-dom";

export const HomePage = () => {

  const storageKey:string = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString): null;

  const isLoggedIn = userDataString ? true: false;

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onOpenModal = () => {
    setIsModalOpen(true)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <div className="relative bg-cover bg-center bg-no-repeat h-screen object-cover flex items-center justify-center text-white" style={{ backgroundImage: "url('/src/assets/empty-intensive-recovery-room-as-hospital-ward.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay for better text visibility */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4">
            Welcome to Our Healthcare Portal
          </h1>
          <p className="text-lg md:text-2xl mb-6">
            Your health, our priority. Explore, learn, and get in touch with healthcare professionals.
          </p>
          <Button variant="info" type="button" width="fit" onClick={onOpenModal}>Get Started</Button>
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        closeModal={onCloseModal}
        title={isLoggedIn ? "Welcome Back!" : "You need to log in first"}
        description={
          isLoggedIn
            ? "Proceed to the appropriate dashboard based on your role."
            : "Please log in to proceed with ICU management in your hospital."
        }
      >
        <div className="flex items-center space-x-3 mt-4">
          <Button variant="cancel" type="button" onClick={onCloseModal}>
            Close
          </Button>
          {
            isLoggedIn ? (
              userData.role == "superAdmin" ? (
                <NavLink to="/super-admin" className={"w-full"}>
                  <Button variant="normal">
                    dashboard
                  </Button>
                </NavLink>
              ): (
                <NavLink to="/hospital-admin" className={"w-full"}>
                  <Button variant="normal">
                    dashboard
                  </Button>
                </NavLink>
              )
            ): (
              <NavLink to="/login" className={"w-full"}>
                <Button variant="normal">
                  login
                </Button>
              </NavLink>
            )}
        </div>
      </Modal>
    </>
  );
}
