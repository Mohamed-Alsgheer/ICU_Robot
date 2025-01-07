import { useState } from "react"
import { Button } from "../components/UI/Button"
import Modal from "../components/UI/Modal"
import { Header } from "../components/UI/Header"
import { Label } from "../components/UI/Label"
import Input from "../components/UI/Input"
import { InputErorrMessage } from "../components/UI/InputErorrMessage"
import { Textarea } from "../components/UI/Textarea"
import { Table } from "../components/UI/Table"
import { Collapsible } from "../components/UI/Collapsible"
import toast from "react-hot-toast"
import MapContainer from "../components/UI/MapContainer"
import { ICoordinates, IMapContainerStyle, Location } from "../interfaces/mapInterfaces"

export const Components = () => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const onOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const onCloseDeleteModal = () => {

    setIsDeleteModalOpen(false)
  }

  const columns = ["Product Name", "Color", "Category", "Price", "Actions"];

  const rows = [
    { name: "Apple MacBook Pro 17\"", color: "Silver", category: "Laptop", price: "$2999" },
    { name: "iPhone 13 Pro", color: "Gold", category: "Phone", price: "$999" },
  ];

  if (isDeleteModalOpen) {
    toast.success("You will navigate to the home page after 2 seconds.",
      {
        position: "top-center",
        duration: 2000,
        style: {backgroundColor: "black", color: "white", width: "fit-content",},
      }
    );
  }

  const center: ICoordinates = {
    lat: 29.9773,
    lng: 31.1325
  }
  
  const containerStyle: IMapContainerStyle = {
    width: '100%',
    height: '800px',
  }
  
  // const userLocation: Location = {
  //   location: {
  //     lat: 29.9773,
  //     lng: 31.1325
  //   },
  //   title: "Khalid",
  //   visible: true,
  //   icon: "/src/assets/hospitalisation.png",
  //   description: "Khalid is undergoing medical evaluation at the hospital for a minor injury. Status: Stable."
  // }

  const locations: Location[] = [
    {
      location: {
        lat: 30.0444,
        lng: 31.2357
      },
      visible: true,
      title: "Cairo Tower",
      icon: "/src/assets/medicine.png",
      description: "A modern landmark offering panoramic views of Cairo.",
    },
    {
      location: {
        lat: 25.6997,
        lng: 32.6396
      },
      visible: true,
      title: "Luxor Temple",
      icon: "/src/assets/medicine.png",
      description: "An ancient Egyptian temple dedicated to the gods Amun, Mut, and Khonsu.",
    },
    {
      location: {
        lat: 29.9753,
        lng: 31.1376
      },
      visible: true,
      title: "Great Sphinx of Giza",
      icon: "/src/assets/medicine.png",
      description: "A large limestone statue of a reclining sphinx, symbolizing strength and wisdom.",
    },
    {
      location: {
        lat: 25.7407,
        lng: 32.6019
      },
      visible: true,
      title: "Valley of the Kings",
      icon: "/src/assets/medicine.png",
      description: "A burial site of ancient Egyptian pharaohs and nobles, famous for its tombs.",
    }
  ];
  

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <Header 
          heading="Welcome to Our Platform" 
          subtitle="Discover amazing features tailored for you." 
        />

        <div className="flex items-start justify-center gap-5">
            <Button variant="info" type="button">info</Button>
            <Button variant="info" type="button" isLoading={true}>info</Button>
            <Button variant="normal" type="submit">normal</Button>
            <Button variant="success" type="reset">success</Button>
            <Button variant="warning">warning</Button>
            <Button variant="error">error</Button>
            <Button variant="danger">danger</Button>
            <Button variant="cancel">cancel</Button>
            <Button variant="default">default</Button>
            <Button variant="default">default</Button>
        </div>

        <div>
          <Button variant="info" type="button" onClick={onOpenDeleteModal}>Click Me To Try Modal</Button>
          <Modal isOpen={isDeleteModalOpen} closeModal={onCloseDeleteModal}
            title="Are you sure you want to remove this todo from your store ?"
            description="Deleting this todo will remove it permenantly from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
          >
            <div className="flex items-center space-x-3 mt-4">
              <Button variant="danger" type="button">
                Yes , Remove
              </Button>
              <Button variant="cancel" type="button" onClick={onCloseDeleteModal}>
                Cancel
              </Button>
            </div>
          </Modal>
        </div>

        <div className="flex items-center flex-col gap-5">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" type="text" />
          </div>

          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" type="text" isError={true} />
            <InputErorrMessage message={"There is an error."} />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium mb-2">
              Description
            </label>
            <Textarea cols={30} id="description" name="description" placeholder="Enter a description..." />
          </div>
        </div>

        <div>
          <Table columns={columns}>
            {rows.map((row, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.color}</td>
                <td className="px-6 py-4">{row.category}</td>
                <td className="px-6 py-4">{row.price}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <Button variant="info" type="button">edit</Button>
                  <Button variant="danger" type="button">delete</Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>

        <div className="w-[750px]">
          <Collapsible title="Click to Expand">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, vitae amet soluta quae atque hic dicta nihil illum commodi reiciendis assumenda voluptate ullam nesciunt excepturi, numquam dignissimos ratione ad quia!</p>
          </Collapsible>
        </div>

        <MapContainer coordinates={center} mapContainerStyle={containerStyle} mainLocation={center} locations={locations} />

      </div>
    </>
  )
}
