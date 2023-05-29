import { Aperture } from "@/interfaces/IAperture";
import { AxiosServices } from "..";
import { Voucher } from "@/interfaces/IVoucher";
import { handleError } from "@/utils";
import { AxiosError } from "axios";
import { PayMethod } from "@/interfaces";

export const apertureServicesAsync = {
  getApertureById: async (id: number) => {
    const { data } = await AxiosServices.get<Aperture>(
      `api/Aperture/cash/${id}`
    );

    return data;
  },

  getListIdCash: async () => {
    const { data } = await AxiosServices.get<Aperture[]>("api/Cash");
    const listado = data.reduce((acc: string[], { id }: { id: number }) => {
      acc.push(id.toString());
      return acc;
    }, []);

    return listado;
  },

  updateAperture: async (idAperture: number) => {
    try {
      const response = await AxiosServices.put<Aperture>(
        `api/Aperture/${idAperture}`,
        {
          fecClose: new Date(),
        }
      );
      return response.data;
    } catch (error) {
      const errores = error as AxiosError;
      handleError(errores);
      return null;
    }
  },
  createAperture: async (idCash: number) => {
    try {
      const response = await AxiosServices.post<Aperture>("api/Aperture", {
        idCash,
        employeeId: 1,
        fecOpen: new Date(),
        fecClose: null,
        saleToDay: 0,
      });
      return response.data;
    } catch (error) {
      const errores = error as AxiosError;
      handleError(errores);
      return null;
    }
  },

  getPayMethods: async () => {
    const { data } = await AxiosServices.get("api/PayMethod");
    const payMethods = data as PayMethod[];

    return payMethods.reduce(
      (acc: { value: number; label: string }[], { id, paymethod }) => {
        acc.push({ value: id, label: paymethod });
        return acc;
      },
      [] as { value: number; label: string }[]
    );
  },
};

export const apertureServices = {
  totalReduce: (data: Voucher[]) => {
    return data.reduce((acc, { totalPrice }) => {
      acc += totalPrice;
      return acc;
    }, 0);
  },

  totalByMethodsReduce: (data: Voucher[]) => {
    return data.reduce((acc, { voucherDetail }: Voucher) => {
      const { payMethod, paymentAmount } = voucherDetail;
      const { paymethod: namePayment } = payMethod;
      const index = acc.findIndex(
        (c: { name: string; total: number }) => c.name === namePayment
      );
      if (index === -1) {
        acc.push({ name: namePayment, total: paymentAmount });
      } else {
        acc[index].total += paymentAmount;
      }

      return acc;
    }, [] as { name: string; total: number }[]);
  },

  // cboMethods: (data: Voucher[]) => {
  //   return data.reduce((acc, { voucherDetail }: Voucher) => {
  //     const { payMethod } = voucherDetail;
  //     const { paymethod: namePayment, id } = payMethod;
  //     const index = acc.findIndex(
  //       (c: { value: number; label: string }) => c.label === namePayment
  //     );
  //     if (index === -1) {
  //       acc.push({ value: id, label: namePayment });
  //     }

  //     return acc;
  //   }, [] as { value: number; label: string }[]);
  // },
};
