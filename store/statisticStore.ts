import { create } from "zustand"

import axios from "axios"

interface PropertyMostChosen {
    property_id: number;
    name: string;
    total: number
}
interface Last7DaysLeads {
    date: string;
    total: number;
}

interface LeadsStatusDistribution {
    status: string;
    total: number
}

interface StatisticState {
    last7DaysLeads: Last7DaysLeads[];
    leadsStatusDistribution: LeadsStatusDistribution[];
    propertyMostChosen: PropertyMostChosen[];
    fetchData: () => Promise<void>;
}

export const useStatisticStore = create<StatisticState>((set) => ({
    last7DaysLeads: [],
    leadsStatusDistribution: [],
    propertyMostChosen: [],
    fetchData: async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/statistics');
            set({
                propertyMostChosen: response.data.data.propertyMostChosen, last7DaysLeads: response.data.data.last7DaysLeads,
                leadsStatusDistribution: response.data.data.leadsStatusDistribution
            })

            console.log(response.data.data.leadsStatusDistribution)
            console.log(response.data.data.last7DaysLeads)


        } catch (error) { console.log(error) }

    }
}))