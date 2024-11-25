import axios from 'axios';

const API_BASE_URL = 'https://sky-scrapper.p.rapidapi.com';
const API_KEY = '6455985c4emshc2ad413c392c650p18dd00jsne03535c80615';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
    },
});

export const searchFlights = async (params) => {
    try {
        const response = await apiClient.get('/flights/search', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching flights:', error);
        throw error;
    }
};
