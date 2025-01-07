import { useState } from "react"
import { IICU } from "../../interfaces/ICUInterface"
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";
import axiosInstance from "../../config/axios.config";
import { Link } from "react-router-dom";
import { Button } from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import { Table } from "../../components/UI/Table";
import { Label } from "../../components/UI/Label";
import Select from "../../components/UI/Select";
import InfoCard from "../../components/UI/InfoCard";
import { Activity, Bed, Tent } from "lucide-react";
import { Header } from "../../components/UI/Header";
import CountCard from "../../components/UI/CountCard";

export const ICUs = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const columns = ["#ID", "ICU Identifier", "availability", "created At", "updated At", "Actions"];
  
  const [queryVersion, setQueryVersion] = useState(1);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [ICU, setICU] = useState<IICU>({
    _id: 0,
    documentId: "",
    ICUIdentifier: "",
    specialization: "",
    availability: false,
    createdAt: "",
    updatedAt: ""
  })
  /* ____________ HANDLER ____________ */
  const onOpenDeleteModal = (data: IICU) => {
    setIsDeleteModalOpen(true)
    setICU(data)
  }
  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setICU({
      _id: 0,
      documentId: "",
      ICUIdentifier: "",
      specialization: "",
      availability: false,
      createdAt: "",
      updatedAt: ""
    })
  }

  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["hospitalAdmins", `${queryVersion}`],
    url: `hospitalAdmin/icus`,
    config: {
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
  });
  
  const onRemove = async () => {
    console.log(ICU);
    
    try {
      const { status } = await axiosInstance.delete(`hospitalAdmin/icus/${ICU._id}`, {
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

  if (isLoading) return <h3>Loading...</h3>;

  const filteredData = data?.filter((row: IICU) => {
    if (availabilityFilter === "available") return row.availability;
    if (availabilityFilter === "notAvailable") return !row.availability;
    return true;
  });

    const ICUsCount = data?.length || 0;

    const availableICUsCount = data?.filter((row: IICU) => row.availability)?.length || 0;

  /* ____________ RENDER ____________ */
  const renderICURows = filteredData.map((row: IICU) =>(
    <tr key={row._id} className="even:dark:bg-gray-50 even:hover:bg-gray-200 bg-white border-b hover:bg-gray-100 duration-150 ease-in-out">
      <td className="px-6 py-4">{row._id}</td>
      <td className="px-6 py-4">{row.ICUIdentifier}</td>
      <td className="px-6 py-4">
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
            row.availability ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {row.availability ? "Available" : "Not Available"}
        </span>
      </td>
      <td className="px-6 py-4">
          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A"}
      </td>
      <td className="px-6 py-4">
        {row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "N/A"}
      </td>
      <td className="px-6 py-4 flex space-x-2">
        <Link to={`/hospital-admin/edit-icu/${row._id}`}>
          <Button variant="info" type="button">
            Edit
          </Button>
        </Link>
        <Button variant="danger" type="button" onClick={() => {onOpenDeleteModal(row)}}>
          Delete
        </Button>
      </td>
    </tr>
  ));
  return (
    <>
      <Header
        heading="Hospital ICUs"
        subtitle="Manage and monitor the availability and assignments of ICUs within the hospital."
      />

      <div className="flex flex-col items-center justify-center space-y-10">
        <div className="max-w-[900px]">
          <CountCard
            title="Total ICUs"
            description="The total number of Intensive Care Units available in the hospital."
            count={ICUsCount}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          <InfoCard
            backgroundColor="#f9f8e8" // Soft yellow
            iconBackgroundColor="#4CAF50" // Green for assigned
            icon={<Bed />}
            amount={`${ICUsCount - availableICUsCount}`}
            description="Available ICUs"
            note="ICUs are ready for use."
          />

          <InfoCard
            backgroundColor="#e0f7fa" // Light cyan
            iconBackgroundColor="#9b59b6" // Purple
            icon={<Tent />}
            amount={availableICUsCount}
            description="Occupied ICUs"
            note="These ICUs are currently occupied and being used by patients."
          />

          <Link to={"/hospital-admin/add-icu"} className="w-fit">
            <InfoCard
              backgroundColor="#ffebee" // Light red
              iconBackgroundColor="#d32f2f" // Dark red
              icon={<Activity />}
              description="Add New ICU"
              note="Add a new ICU to enhance the hospital's capacity and patient care capabilities."
            />
          </Link>
        </div>
      </div>

      <div className="max-w-full space-y-5">
        <div className="flex flex-row flex-wrap items-center gap-3">
          <Label>Status</Label>
          <Select
            name="status"
            isError={false}
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="available">available</option>
            <option value="notAvailable">Not available</option>
          </Select>
        </div>

        <Table columns={columns}>
          {renderICURows}
        </Table>
      </div>

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
    </>
  )
}
