"use client"
import useKostStore from "@/store/tableKostStore";
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

interface PopupEditProps {
    show: boolean
    data: Kost | null
    onDismiss: () => void
}

interface Kost{
    id: number
    name: string
    address: string
    price: number
    kost_owner: string
}

interface KostUpdate{
    id: number
    name: string
    address: string
    price: number
    kost_owner: string
}

export const PopupEditKost: React.FC<PopupEditProps> = ({show, data, onDismiss}) => {
    if(!data)return null

    useEffect(()=>{
        console.log(data);
        // setStatus(data?.status_id);
    }, [])

    const { setUpdateKost } = useKostStore();
    const [status, setStatus] = useState<Kost>(data);
    const handleChange=(event: React.ChangeEvent<HTMLSelectElement>)=>{
        console.log(event.target.value);
        // setStatus(+event.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const response = await setUpdateKost(data?.id!, data!);
        if(response){
            onDismiss();
        }
    }
    return (
        <>
        <Modal show={show} onClose={onDismiss} >
                <Modal.Header>Update Leads</Modal.Header>
                <Modal.Body>
                  <form
                    className="flex max-w-full flex-col gap-4"
                    onSubmit={handleSubmit}
                  >
        
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="status" value="Status" />
                      </div>
                      <Select
                        id="status"
                        required
                        // value={status}
                        onChange={handleChange}
                      >
                        <option value=""  disabled>
                          -- Select an option --
                        </option>
                        {/* <option selected={data?.status_id == 0 } value={0}>Menghubungi Pemilik</option>
                        <option selected={data?.status_id == 1} value={1}>Menyewa Kos</option>
                        <option selected={data?.status_id == 2} value={2}>Tidak jadi Menyewa</option>
                        <option selected={data?.status_id == 3} value={3}>Tidak memberi Feedback</option> */}
                      </Select>
                    </div>
                    <Button type="submit">Submit</Button>
                  </form>
                </Modal.Body>
              </Modal>
        </>
    );

}