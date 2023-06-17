import { ICategoryDishGet, IDishGet } from "@/interfaces";
import axiosObject from "../Axios";



const DishServices = {
    getDishes : async (id:string) => {
        const {data} = await axiosObject.get<IDishGet[]>(`/api/dish/get-dishByIdCategory/${id}`);
        return data;
    },
    
    getCategoryDish : async () => {
        const {data} = await axiosObject.get<ICategoryDishGet[]>(`/api/dish/category-dish`);
        return data;
    },
}

export default DishServices;