import { create } from "zustand"
import axios from "axios"

interface Lead {
    id: number;
    name: string;
    property_name: string;
    status: string;
    date: string;
}

interface TableState {
    data: Lead[];
    loading: Boolean
    error: string | null
    currentPage: number
    totalPages: number
    search: string
    date : string
    fetchData: () => Promise<void>
    addLead: (page: number) => void
    setSearch: (query: string) => void
    setPage: (page: number) => void
    setDate : (date : string)=> void
    setUpdateLead: (id: number, status: string) => Promise<boolean | null>;

    

}


const useTableStore = create<TableState>((set, get) => ({
    data: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    search: "",
    date: "",
    fetchData: async () => {
        const { currentPage, search, date } = get()
        try {
            set({ loading: true, error: null })
            const response = await axios.get(
                `http://localhost:8000/api/leads?page=${currentPage}&q=${search}&start_date=${date}`
            );
            set({
                data: response.data.data.data || [],
                totalPages: response.data.data.last_page || 1,
                loading: false,
                error: null
            })
        } catch (error) {
            console.log(error)
            set({ loading: false, error: "Error fetching data" })
        }
    },
    addLead: (page) => set({ currentPage: 1 }),
    setSearch: (query) => set({ search: query }),
    setPage: (page) => set({ currentPage: page }),
    setDate: (date) => set({date : date, currentPage: 1}),
    setUpdateLead : async ( id: number, status: string)=>{
        try {
            const response = await axios.put(`http://localhost:8000/api/leads/${id}`, { status: status });
            if(response.status === 200){
               await  get().fetchData()
                return true
            }
        }catch(error){
            console.log(error)
            return false
        }
        return false



        
    },
}))

export default useTableStore;