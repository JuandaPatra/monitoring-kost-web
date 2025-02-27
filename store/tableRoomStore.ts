import {create} from "zustand"
import axios from "axios"
import useTableStore from "./tableStore";

interface Room{
    id :number;
    properties_id: number;
    room_number: string;
    type:string;
    price : number;
    status: string;
}

interface RoomState {
    data : Room[]
    loading: boolean;
    error : string | null;
    currentPage : number;
    totalPage : number;
    search : string
    fetchData : ()=>Promise<void>
    addRoom : (page : number) => void;
    setSearch : (query : string) => void;
    setPage : (page : number) => void;


}

const useRoomStore = create<RoomState>((set,get)=>({
    data: [],
    loading: false,
    error: null,
    currentPage : 1,
    totalPage: 1,
    search: "",
    fetchData : async ()=>{
        const { currentPage, search } = get()
     try{
        set({loading:true, error:null})
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/kost?page=${currentPage}&q=${search}`
          )
          set({
            data: response.data.data.data || [],
            totalPage: response.data.data.last_page || 1,
            loading: false,
            error: null
          })

     }catch(error){
        console.log(error)
        set({loading : false, error : "Error"})
     }   
    },
    addRoom : (page : number)=>{
        set({currentPage : page})
    },
    setSearch: (query) => set({ search: query }),
    setPage: (page) => set({ currentPage: page }),



}))

export default useTableStore;