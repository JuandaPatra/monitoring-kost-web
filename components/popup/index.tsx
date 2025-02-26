"use client";
import axios from "axios";
import {
  Button,
  Modal,
  Label,
  TextInput,
  Select,
} from "flowbite-react";
import { useEffect, useState, useReducer } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { ToastSubmit } from "../Toast";

import useTableStore from "@/store/tableStore";

import {formReducer, initialState} from "@/reducers/formReducerPopupInsert"

export const PopupInsert = () => {

  const [state, dispatch] = useReducer(formReducer, initialState)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    properti: "",
    status: "",
  });

  useEffect(() => {
    
     const fetchProperties= async () => {

      try{
        const responseProperties = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/kost/list`
        );
        dispatch({type: "SET_LIST_PROPERTIES", payload: responseProperties.data.data })
      }catch(e){
        console.log(e)
      }
      };
    
      fetchProperties()
  }, []);





  const { addLead, fetchData } = useTableStore();

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    if (id === "telephone") {
      const regex = /^[0-9+]*$/; // Hanya angka dan tanda + yang diperbolehkan.
      if (!regex.test(value)) {
        return; // Jangan perbarui state jika karakter tidak valid.
      }
    }

    dispatch({
      type: "SET_FORM_DATA",
      payload : {field : id, value}
    })
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/leads`,
        {
          name: state.formData.name,
          email: state.formData.email,
          phone: state.formData.telephone,
          property_id: state.formData.properti,
          status: state.formData.status,
        }
      );

      if (response.status === 200) {
        addLead(1);
        fetchData();

        dispatch({
          type : "TOGGLE_MODAL"
        })
        dispatch({
          type : "SET_TOAST"
        })
        dispatch({
          type : "RESET_FORM"
        })
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowToast = () => {
    dispatch({type: "SET_TOAST"})
  };
  return (
    <>
      <div className="pt-5 pb-2 flex justify-end">
        <Button
          onClick={() => dispatch({
            type : "TOGGLE_MODAL"
          })}
          className="bg-cyan-500 text-white text-xl font-bold items-center gap-2"
        >
          <IoIosAddCircle className="text-xl" />
          Tambah Leads
        </Button>
      </div>
      <Modal show={state.openModal} onClose={() => dispatch({type: "TOGGLE_MODAL"})}>
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
                value={state.formData.name}
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
                value={state.formData.email}
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
                value={state.formData.telephone}
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
                value={state.formData.properti}
                onChange={handleChange}
              >
                <option value="" selected disabled>
                  -- Select an option --
                </option>
                {state.listProperties?.map((kost) => (
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
                value={state.formData.status}
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

      <ToastSubmit
        show={state.showToast}
        onDismiss={handleShowToast}
        message="Leads Berhasil Ditambahkan"
      />
    </>
  );
};
