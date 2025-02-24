"use client";
import axios from "axios";
import {
  Button,
  Modal,
  Checkbox,
  Label,
  TextInput,
  Select,
  Toast,
  Textarea,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { ToastSubmit } from "../../Toast";

import useTableStore from "@/store/tableStore";
import { useConfigStore } from "@/store/configStore";
import phoneNumberRegex from "@/utils/phoneNumberRegex";
import useKostStore from "@/store/tableKostStore";

export const PopupInsertKost = () => {
    const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    user_id : 8,
    price: "",
    address: "",
    description: "",
  });

  const { properties, totalLeads, todayLeads, propertyMostChosen } =
    useConfigStore();

  const [showToast, setShowToast] = useState(false);

  const { addKost, fetchData } = useKostStore();

  

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    if (id === "telephone") {
      const regex = /^[0-9+]*$/; // Hanya angka dan tanda + yang diperbolehkan.
      if (!regex.test(value)) {
        return; // Jangan perbarui state jika karakter tidak valid.
      }
    }
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/kost`, {
        name: formData.name,
        user_id : formData.user_id,
        price: formData.price,
        address: formData.address,
        description: formData.description,
      });

      if (response.status === 200) {
        addKost(1);
        fetchData();
        setOpenModal(false);
        setShowToast(true);
        setFormData({
          ...formData,
          name: "",
          price : "",
          address: "",
          description : "",
        });
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowToast = () => {
    setShowToast(false);
  };
  return (
    <>
      <div className="pt-5 pb-2 flex justify-end">
        <Button
          onClick={() => setOpenModal(true)}
          className="bg-cyan-500 text-white text-xl font-bold items-center gap-2"
        >
          <IoIosAddCircle className="text-xl" />
          Tambah Kost
        </Button>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tambahkan Kost</Modal.Header>
        <Modal.Body>
          <form
            className="flex max-w-full flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nama Kost" />
              </div>
              <TextInput
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" value="Harga" />
              </div>
              <TextInput
                id="price"
                type="number"
                required
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="address" value="Alamat" />
              </div>
              <Textarea id="address" required value={formData.address} onChange={handleChange} rows={2} />

            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Deskripsi" />
              </div>
              <Textarea id="description" required value={formData.description} onChange={handleChange} rows={4}  />
             
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>

      <ToastSubmit show={showToast} onDismiss={handleShowToast} message="Kost berhasil ditambahkan" />
    </>
  );

}