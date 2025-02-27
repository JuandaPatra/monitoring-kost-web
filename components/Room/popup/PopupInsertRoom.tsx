import { Button, Label, Modal, Select, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";

export const PopupInsertRoom = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="pt-5 pb-2 flex justify-end">
        <Button
          onClick={() => setOpenModal(true)}
          className="bg-cyan-500 text-white text-xl font-bold items-center mr-3"
        >
          <IoIosAddCircle className="text-xl" />
          Tambah Kamar
        </Button>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tambah Kamar</Modal.Header>
        <Modal.Body>
          <form
            className="flex max-w-full flex-col gap-4"
            //   onSubmit={handleSubmit}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="roomnumber" value="No. Kamar" />
              </div>
              <TextInput
                id="roomnumber"
                type="text"
                required
                //   value={formData.name}
                //   onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="typekamar" value="Tipe Kamar" />
              </div>
              <TextInput
                id="typekamar"
                type="text"
                required
                //   value={formData.price}
                //   onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="hargakamar" value="Harga" />
              </div>
              <TextInput
                id="hargakamar"
                type="integer"
                required
                //   value={formData.price}
                //   onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Deskripsi" />
              </div>
              <Select
                id="status"
                required
                // value={state.formData.properti}
                // onChange={handleChange}
              >
                <option value="" selected disabled>
                  -- Select an option --
                </option>
                  <option key="available" value={"available"}>
                    Terisi
                  </option>
                  <option key="available" value={"available"}>
                    Belum Terisi
                  </option>
              </Select>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
