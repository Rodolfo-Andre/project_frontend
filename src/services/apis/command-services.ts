import axiosObject from "../Axios";


const  CommandServices = {
    saveCommand : async (command:any) => {
        const {data} = await axiosObject.post(`/api/command`,command);
        return data;
    },
    deleteCommand : async (id:number) => {
        const {data} = await axiosObject.delete(`/api/command/${id}`);
        return data;
    }
}

export default CommandServices;