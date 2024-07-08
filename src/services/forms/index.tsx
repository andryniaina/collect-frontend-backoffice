import { API_URL } from "../../config/api"
import axios from "axios"

export const postForm = async (formData: any) => {
    try {
        const response = await axios.post(`${API_URL}/forms`,formData) ;
        console.log(response) ;
    } catch(error){
        console.error(error) ;
    }
}