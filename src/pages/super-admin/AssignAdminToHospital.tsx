import { ChangeEvent, useState } from "react";
import { Button } from "../../components/UI/Button";
import { Header } from "../../components/UI/Header";
import { Label } from "../../components/UI/Label";
import Modal from "../../components/UI/Modal";
import Select from "../../components/UI/Select";
import MapContainer from "../../components/UI/MapContainer";
import { ICoordinates } from "../../interfaces/mapInterfaces";
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";
import { IHospitalAdmin } from "../../interfaces/hospitalAdminInterface";
import { IHospital } from "../../interfaces/hospitalinterface";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../../interfaces";
import axiosInstance from "../../config/axios.config";

export const AssignAdminToHospital = () => {

  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  /* ____________ STATE ____________ */
  const [queryVersion, setQueryVersion] = useState(1);
  const [selectedHospitalAdmin, setSelectedHospitalAdmin] = useState<IHospitalAdmin>({
    id: 0,
    documentId: "",
    username: "",
    email: "",
    createdAt: "",
    hospital: {
      id: 0,
      documentId: "",
      name: "",
      phoneNumber: "",
      createdAt: "",
      updatedAt: "",
      latitude: 0.0,
      longitude: 0.0
    }
  });
  const [selectedHospital, setSelectedHospital] = useState<IHospital>({
    id: 0,
    documentId: "",
    name: "",
    phoneNumber: "",
    createdAt: "",
    updatedAt: "",
    latitude: 0.0,
    longitude: 0.0,
  });
  const [mapCoordinates, setMapCoordinates] = useState<ICoordinates>({
    lat: 0.0,
    lng: 0.0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isupdating, setIsupdating] = useState(false)

  /* ____________ HANDLER ____________ */
  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => setIsModalOpen(false);
  const selectHospitalAdmin = (hospitalAdmin: IHospitalAdmin) => {
    setSelectedHospitalAdmin(hospitalAdmin)
    if (hospitalAdmin.hospital != null) {
      setSelectedHospital(hospitalAdmin.hospital)
      
    }
    else {
      setSelectedHospital({
        id: 0,
        documentId: "",
        name: "",
        phoneNumber: "",
        createdAt: "",
        updatedAt: "",
        latitude: 0.0,
        longitude: 0.0
      })
    }
  }
  const changeHospitalAdmin = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value != "") {
      const selectedAdmin = hospitalAdmins.find(
        (admin: IHospitalAdmin) => admin.id.toString() === value
      );
      selectHospitalAdmin(selectedAdmin);
    }
  }
  const changeHospital = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value != "") {
      const selectedHospital = hospitals?.find(
        (hospital: IHospital) => `${hospital.id}` === value
      );
      
      setSelectedHospital(selectedHospital);
      setMapCoordinates({lat: selectedHospital.latitude, lng: selectedHospital.longitude})
    }
  }

  /* ____________ REQUEST ____________ */
  const { isLoading: isAdminLoading, data: hospitalAdmins } = useAuthenticatedQuery({
    queryKey: ["hospitalAdmins", `${queryVersion}`],
    url: `/superAdmin/users`,
    config: { headers: { Authorization: `Bearer ${userData?.jwt}` }},
  });
  const { isLoading: isHospitalLoading, data: hospitals } = useAuthenticatedQuery({
    queryKey: ["hospitals"],
    url: `/superAdmin/hospitals`,
    config: { headers: { Authorization: `Bearer ${userData?.jwt}` } },
  });
  console.log(selectedHospitalAdmin);
  console.log(selectedHospital);
  const onAssign = async () => {
    setIsupdating(true);
    let hospitalID: string | null = null;
    hospitalID = selectedHospital.id.toString(); // Assign or reassign
    try {
      const { status } = await axiosInstance.put(
        `/superAdmin/hospitals/assign/${selectedHospitalAdmin.id}`, 
        { hospitalID }, 
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`
          }
        }
      );
      
      if (status == 200) {
        toast.success("Hospital admin successfully assigned!",
          {
            position: "bottom-center",
            duration: 2000,
            style: {backgroundColor: "black", color: "white", width: "fit-content",},
          }
        );
        setQueryVersion(queryVersion + 1);
        setSelectedHospitalAdmin({
          id: 0,
          documentId: "",
          username: "",
          email: "",
          createdAt: "",
          hospital: {
            id: 0,
            documentId: "",
            name: "",
            phoneNumber: "",
            createdAt: "",
            updatedAt: "",
            latitude: 0.0,
            longitude: 0.0
          }
        })
        setSelectedHospital({
          id: 0,
          documentId: "",
          name: "",
          phoneNumber: "",
          createdAt: "",
          updatedAt: "",
          latitude: 0.0,
          longitude: 0.0,
        })
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      console.log(errorObj);
      toast.error("assign hospital admin failed",
        {
          position: "bottom-center",
          duration: 4000,
          style: {backgroundColor: "black", color: "white", width: "fit-content",},
        }
      );
    } finally {
      setIsupdating(false);
    }
  }

  /* ____________ RENDER ____________ */
  const renderHospitalAdminOptions = hospitalAdmins?.map((row: IHospitalAdmin) =>(
    <option key={row.id} value={row.id}>{row.email}</option>
  ));
  const renderHospitalOptions = hospitals?.map((row: IHospital) =>(
    <option key={row.id} value={row.id}>{row.name}</option>
  ));

  if (isAdminLoading || isHospitalLoading) return <h3>Loading...</h3>;

  return (
    
    <div className="flex flex-col gap-10 items-center">
      <Header 
        heading="Assign Hospital Admin" 
        subtitle="Manage the assignment of hospital administrators to hospitals. You can assign, update, or remove admins and view their current assignments."
      />

      <div className="space-y-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center justify-center">
          {/* Select Hospital Admin */}
          <div className="flex flex-col">
            <Label htmlFor="hospitalAdmin">Select Hospital Admin</Label>
            <Select
              id="hospitalAdmin"
              name="hospitalAdmin"
              onChange={(e) => {changeHospitalAdmin(e)}}
            >
              <option value="">Choose an Admin</option>
              {renderHospitalAdminOptions}
            </Select>
          </div>

          <p className="text-center font-medium text-lg">Assign to</p>

          {/* Select Hospital */}
          <div className="flex flex-col">
            <Label htmlFor="hospital">Select Hospital</Label>
            <Select
              id="hospital"
              name="hospital"
              onChange={(e) => {changeHospital(e)}}
            >
              <option value="">Choose a Hospital</option>
              {renderHospitalOptions}
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-gray-50 lg:w-[1000px]">
          {/* Hospital Admin Information */}
          <div className="space-y-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
              Hospital Admin Informations
            </h2>
            <div className="text-gray-700 space-y-3">
              <p><strong>ID:</strong> {selectedHospitalAdmin.id}</p>
              <p><strong>Username:</strong> {selectedHospitalAdmin.username}</p>
              <p><strong>Email:</strong> {selectedHospitalAdmin.email}</p>
              <p><strong>Created At:</strong> {selectedHospitalAdmin.createdAt}</p>
            </div>
          </div>

          {/* Vertical Divider for smaller screens */}
          <div className="lg:hidden border-t border-gray-300 my-4"></div>

          {/* Hospital Information */}
          <div className="space-y-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
              Hospital Informations
            </h2>
            <div className="text-gray-700 space-y-3">
              <p><strong>ID:</strong> {selectedHospital.id}</p>
              <p><strong>Name:</strong> {selectedHospital.name}</p>
              <p><strong>Phone Number:</strong> {selectedHospital.phoneNumber}</p>
              <p><strong>Created At:</strong> {selectedHospital.createdAt}</p>
              <p><strong>Updated At:</strong> {selectedHospital.updatedAt}</p>
              <p><strong>Latitude:</strong> {selectedHospital.latitude}</p>
              <p><strong>Longitude:</strong> {selectedHospital.longitude}</p>
            </div>

            <Button onClick={onOpenModal}>Show location</Button>
          </div>
        </div>
        {
          selectedHospitalAdmin.id != 0 && selectedHospital.id != 0 &&
          <Button
            variant={
              selectedHospitalAdmin.hospital
                ? (selectedHospitalAdmin.hospital.id == selectedHospital.id ? "danger" : "warning")
                : "success"
            }
            type="button"
            isLoading={isupdating}
            onClick={onAssign}
          >
            {
              selectedHospitalAdmin.hospital
                ? (selectedHospitalAdmin.hospital.id == selectedHospital.id ? "Remove Assign" : "Reassign")
                : "Assign"
            }
          </Button>
        }
      </div>

      <Modal isOpen={isModalOpen} closeModal={onCloseModal}
        title="Hospital Location"
        description="You can view and explore this location directly on the map to understand its exact position in the world."
      >
        <div className="flex flex-col items-center justify-center gap-5 mt-4">
          <MapContainer coordinates={mapCoordinates} mapContainerStyle={{ width: '100%', height: '30rem' }} mainLocation={mapCoordinates} />
          <Button variant="cancel" type="button" onClick={onCloseModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );

};



