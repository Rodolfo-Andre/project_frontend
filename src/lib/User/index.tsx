import { IEmployeeGet } from "@/interfaces/IEmployee";
import AxiosServices from "@/services/Axios";

const getUser = async () => {
  try {
    const user = await AxiosServices.get<IEmployeeGet>(
      "api/auth/getcurrentuser",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    return user.data;
  } catch (error) {}
};

export { getUser };
