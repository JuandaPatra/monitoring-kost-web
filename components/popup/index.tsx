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
} from "flowbite-react";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { ToastSubmit } from "../Toast";

import useTableStore from "@/store/tableStore";
import { useConfigStore } from "@/store/configStore";
import phoneNumberRegex from "@/utils/phoneNumberRegex";

export const PopupInsert = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    properti: "",
    status: "",
  });

  const { properties, totalLeads, todayLeads, propertyMostChosen } =
    useConfigStore();

  const [showToast, setShowToast] = useState(false);

  const { addLead, fetchData } = useTableStore();

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
      const response = await axios.post(`http://localhost:8000/api/leads`, {
        name: formData.name,
        email: formData.email,
        phone: formData.telephone,
        property_id: formData.properti,
        status: formData.status,
      });

      if (response.status === 200) {
        addLead(1);
        fetchData();
        setOpenModal(false);
        setShowToast(true);
        setFormData({
          name: "",
          email: "",
          telephone: "",
          properti: "",
          status: "",
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
          Tambah Leads
        </Button>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Insert Leads</Modal.Header>
        <Modal.Body>
          <form
            className="flex max-w-full flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
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
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="telephone" value="Telephone" />
              </div>
              <TextInput
                id="telephone"
                type="text"
                required
                value={formData.telephone}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="properti" value="Tipe Kos" />
              </div>
              <Select
                id="properti"
                required
                value={formData.properti}
                onChange={handleChange}
              >
                <option value="" selected disabled>
                  -- Select an option --
                </option>
                {properties.map((kost) => (
                  <option key={kost.id} value={kost.id}>
                    {kost.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="status" value="Status" />
              </div>
              <Select
                id="status"
                required
                value={formData.status}
                onChange={handleChange}
              >
                <option value="" selected disabled>
                  -- Select an option --
                </option>
                <option value={0}>Menghubungi Pemilik</option>
                <option value={1}>Menyewa Kos</option>
                <option value={2}>Tidak jadi Menyewa</option>
                <option value={3}>Tidak memberi Feedback</option>
              </Select>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>

      <ToastSubmit show={showToast} onDismiss={handleShowToast} />
    </>
  );
};
