import { useState } from "react";
import { Button } from "../../components/UI/Button";
import CountCard from "../../components/UI/CountCard";
import { Header } from "../../components/UI/Header";
import Modal from "../../components/UI/Modal";
import { Table } from "../../components/UI/Table";
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";
import axiosInstance from "../../config/axios.config";
import MapContainer from "../../components/UI/MapContainer";
import { ICoordinates, Location } from "../../interfaces/mapInterfaces";

export const Reservations = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState<ICoordinates>({
    lat: 0.0,
    lng: 0.0
  });
  const [mapLocations, setMapLocations] = useState<Location[]>();

  const showMap = (data) => {
    setIsModalOpen(true)
    setMapCoordinates({
      lat: data.patientLocation.latitude,
      lng: data.patientLocation.longitude
    })
    setMapLocations([{
      location: {
        lat: data.hospitalLocation.latitude,
        lng: data.hospitalLocation.longitude
      }
    }])
  }

  const defaultReservation = {
    _id: 0,
    reservationID: "",
    hospitalName: "",
    hospitalLocation: {
      longitude: 0.0,
      latitude: 0.0,
    },
    patientName: "",
    patientLocation: {
      longitude: 0.0,
      latitude: 0.0,
    },
    ICUIdentifier: "",
    patientSickness: ""
  }
  const columns = ["reservation ID", "patient name", "sickness", "hospital", "ICU", "Actions"];
  const [queryVersion, setQueryVersion] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [reservation, setSeservation] = useState(defaultReservation)

    /* ____________ HANDLER ____________ */
    const onOpenDeleteModal = (data) => {
      setSeservation(data)
      setIsDeleteModalOpen(true)
    }
    const onCloseDeleteModal = () => {
      setSeservation(defaultReservation)
      setIsDeleteModalOpen(false)
    }

    const { isLoading, data } = useAuthenticatedQuery({
      queryKey: ["reservations", `${queryVersion}`],
      url: `hospitalAdmin/reservations`,
      config: {
        headers: {
          Authorization: `Bearer ${userData?.jwt}`,
        },
      },
      refetchInterval: 1000
    });

    console.log(data);

    const ICUsCount = data?.length || 0;

    const onRemove = async () => {
      
      try {
        const { status } = await axiosInstance.delete(`hospitalAdmin/reservations/${reservation._id}`, {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        });
        console.log(status);
        
        if (status === 200) {
          onCloseDeleteModal();
          setQueryVersion(queryVersion + 1);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
  
  /* ____________ RENDER ____________ */
  const render = data?.map((row) =>(
    <tr key={row.reservationID} className="even:dark:bg-gray-50 even:hover:bg-gray-200 bg-white border-b hover:bg-gray-100 duration-150 ease-in-out">
      <td className="px-6 py-4">{row.reservationID}</td>
      <td className="px-6 py-4">{row.patientName}</td>
      <td className="px-6 py-4">{row.patientSickness}</td>
      <td className="px-6 py-4">{row.hospitalName}</td>
      <td className="px-6 py-4">{row.ICUIdentifier}</td>
      <td className="px-6 py-4 flex space-x-2">
        <Button variant="danger" type="button" onClick={() => {onOpenDeleteModal(row)}}>
          Delete
        </Button>
        <Button variant="info" type="button" onClick={() => {showMap(row)}}>
          Coordinates
        </Button>
      </td>
    </tr>
  ));


  if (isLoading) return <h3>Loading...</h3>;

  return (
    <>
    <Header
        heading="Reservations"
        subtitle="Efficiently handle ICU bookings and track assignments in real time."
    />

    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="max-w-[900px]">
        <CountCard
            title="Reservations Count"
            description="The total number of ICU reservations currently made in the hospital."
            count={ICUsCount}
        />
      </div>
    </div>

    <Table columns={columns}>
        {render}
    </Table>

    <Modal 
        isOpen={isDeleteModalOpen} 
        closeModal={onCloseDeleteModal}
        title="Are you sure you want to delete this hospital admin?"
        description="Deleting this admin will permanently remove their access and role within the hospital management system. Any associated data, assignments, and actions related to this admin will be lost. Please ensure this is the intended action before proceeding."
      >
        <div className="flex items-center space-x-3 mt-4">
          <Button variant="danger" type="button" onClick={onRemove}>
            Yes, Remove
          </Button>
          <Button variant="cancel" type="button" onClick={onCloseDeleteModal}>
            Cancel
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isModalOpen} closeModal={() => {setIsModalOpen(false)}}
        title="Hospital Location"
        description="You can view and explore this location directly on the map to understand its exact position in the world."
      >
        <div className="flex flex-col items-center justify-center gap-5 mt-4">
          <MapContainer coordinates={mapCoordinates} mapContainerStyle={{ width: '100%', height: '30rem' }} mainLocation={mapCoordinates} locations={mapLocations} />
          <Button variant="cancel" type="button" onClick={() => {setIsModalOpen(false)}}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  )
}
