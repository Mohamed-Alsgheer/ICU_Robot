import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { ICoordinates, IMapContainerStyle, Location } from '../../interfaces/mapInterfaces';
import Modal from './Modal';
import { Button } from './Button';
import { useState } from 'react';


interface IProps {
  zoom?: number;
  coordinates: ICoordinates;
  mapContainerStyle: IMapContainerStyle;
  mainLocation?: ICoordinates
  locations?: Location[];
}


const MapContainer = ({zoom = 10, coordinates, mapContainerStyle, mainLocation, locations = []}: IProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDhe_JHWhG3w-hiLfvaiY88xKZECtmRIFw',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [locationDataInModal, setLocationDataInModal] = useState<Location>({
    location: {
      lat: 0,
      lng: 0
    },
    visible: false,
    title: "",
    description: "",
    icon: ""
  })


  const onOpenModal = (location: Location) => {
    setIsModalOpen(true)
    setLocationDataInModal(location)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={coordinates}
        zoom={zoom}
      >
        {
          mainLocation ? (
            <Marker position={mainLocation} />
          ) : null
        }
        {locations.map((item, idx) => (
          <Marker
            key={idx}
            position={item.location}
            visible={item.visible}
            title={item.title}
            onClick={() => {onOpenModal(item)}}
            icon={
              item.icon
                ? {
                    url: item.icon,
                    scaledSize: new google.maps.Size(40, 40),
                  }
                : undefined
            }
          />
        ))}
      </GoogleMap>
      { isModalOpen ? (
        <Modal 
          isOpen={isModalOpen} 
          closeModal={onCloseModal}
          title={locationDataInModal.title}
          description={locationDataInModal.description}
        >
          <div className="flex flex-col space-y-3 mt-4">
            <div>
              <strong>Coordinates:</strong>
              <div className="pl-5">
                <p>Latitude: {locationDataInModal.location.lat}</p>
                <p>Longitude: {locationDataInModal.location.lng}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <strong>Visibility:</strong>
              <p>{locationDataInModal.visible ? "Visible" : "Not Visible"}</p>
            </div>

            <div className="flex items-center gap-2">
              <strong>Icon:</strong>
              {locationDataInModal.icon ? (
                <img 
                  src={locationDataInModal.icon} 
                  alt="Location Icon" 
                  className="w-5 h-5" 
                />
              ) : (
                <p>No icon provided</p>
              )}
            </div>

            <div>
              <Button variant="cancel" type="button" onClick={onCloseModal}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

      ): null
      }
    </>
  ) : (
    <></>
  )
}

export default MapContainer;