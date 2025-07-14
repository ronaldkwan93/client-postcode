const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getSuburbs = async(postcode: String) => {
    try {
        const response = await fetch(`${API_BASE_URL}/postcode?postcode=${postcode}`);

        const result = await response.json();
        return result;
    } catch (error) {
        
    }

}