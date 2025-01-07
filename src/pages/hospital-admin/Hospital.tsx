import { useEffect, useState } from "react"
import { IHospital } from "../../interfaces/hospitalinterface"
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";
import { Header } from "../../components/UI/Header";
import MapContainer from "../../components/UI/MapContainer";

export const Hospital = () => {

  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [hospital, setHospital] = useState<IHospital | null>({
    id: 0,
    documentId: "",
    name: "",
    phoneNumber: "",
    createdAt: "",
    updatedAt: "",
    latitude: 0.0,
    longitude: 0.0,
  })

  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["hospital"],
    url: `hospitalAdmin/myHospital`,
    config: {
      headers: {
        Authorization: `Bearer ${userData?.jwt}`,
      },
    },
  });

  console.log(data);
  

  useEffect(() => {
    if (data) {
      setHospital(data);
    } else {
      setHospital(null)
    }
  }, [data]);
  
  if (isLoading) return <h3>Loading...</h3>;
  
  return (
    <>
      <Header 
        heading="Hospital Details" 
        subtitle="Information about the assigned hospital" 
      />
      {hospital ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-gray-50 lg:w-[1000px]">
          <div className="space-y-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
              Hospital Information
            </h2>
            <div className="text-gray-700 space-y-3">
              <p><strong>ID:</strong> {hospital.id}</p>
              <p><strong>Name:</strong> {hospital.name}</p>
              <p><strong>Phone Number:</strong> {hospital.phoneNumber}</p>
              <p><strong>Created At:</strong> {hospital.createdAt}</p>
              <p><strong>Updated At:</strong> {hospital.updatedAt}</p>
              <p><strong>Latitude:</strong> {hospital.latitude}</p>
              <p><strong>Longitude:</strong> {hospital.longitude}</p>
            </div>
          </div>
      
          {/* Vertical Divider for smaller screens */}
          <div className="lg:hidden border-t border-gray-300 my-4"></div>
      
          {/* Hospital Information */}
          <div className="space-y-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
              Hospital Location
            </h2>
            <div className="text-gray-700 space-y-3">
              <MapContainer mapContainerStyle={{width: "100%", height:"500px"}} mainLocation={{lat: hospital.latitude, lng:hospital.longitude}} coordinates={{lat: hospital.latitude, lng:hospital.longitude}}/>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xl font-bold text-red-500">No hospital assigned</p>
      )}
    </>
  )
}
