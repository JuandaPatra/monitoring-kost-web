import {create} from "zustand"
import axios from "axios"


interface Kost {
    id: number
    name: string
    address: string
    price: number
    kost_owner: string
}

interface KostUpdate{
  name: string
    address: string
    price: number

}



interface KostState {
    data: Kost[]
    loading: boolean
    error: string | null
    currentPage  : number
    totalPages: number
    search: string
    date : string
    fetchData: () => Promise<void>
    addKost: (page: number) => void
    setSearch: (query: string) => void
    setPage: (page: number) => void
    setDate : (date : string)=> void
    setUpdateKost: (id: number, status: KostUpdate) => Promise<boolean | null>
  }

  const useKostStore = create<KostState>((set, get) => ({
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
          `${process.env.NEXT_PUBLIC_API_URL}/kost?page=${currentPage}&q=${search}&start_date=${date}`
        )
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
    addKost: (page: number) => {
      set({ currentPage: page })
    },    
    setSearch: (query) => set({ search: query }),
    setPage: (page) => set({ currentPage: page }),
    setDate: (date) => set({ date: date, currentPage: 1 }),
    setUpdateKost : async ( id: number, data: KostUpdate)=>{ 
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/kosts/${id}`, { data }); 
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


  export default useKostStore;