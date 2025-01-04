import { create } from "zustand"

import axios from "axios"

interface Property {
    id: number;
    name: string;
}

interface PropertyMostChosen {
    property_id: number;
    name : string;
    total: number
}
interface ConfigState {
    properties: Property[]; // Array of property details
    totalLeads: number; // Total number of leads
    todayLeads: number; // Number of leads for today
    propertyMostChosen: PropertyMostChosen[];
    fetchData: () => Promise<void>;
}

export const useConfigStore = create<ConfigState>((set) => ({
    properties: [],
    totalLeads: 0,
    todayLeads: 0,
    propertyMostChosen: [],
    fetchData: async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/home');
            set({ properties: response.data.data.properties, totalLeads: response.data.data.totalLeads, todayLeads: response.data.data.todayLeads, propertyMostChosen: response.data.data.propertyMostChosen })


        } catch (error) { console.log(error) }
    },


}))