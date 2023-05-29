import { ICashGet } from "@/interfaces";
import { AxiosServices } from "..";

export interface IMetodoPago {
  id: number;
  paymethod: string;
}

export interface ITipoComprobante {
  id: number;
  name: string;
}

export const facturaServices = {
  cboComandas: async () => {
    const { data } = await AxiosServices.get("api/aperture");
    const comandas = data as ICashGet[];
    return comandas;
  },

  cboMetodosPago: async () => {
    const { data } = await AxiosServices.get("api/paymethod");
    const metodosPago = data as IMetodoPago[];
    return metodosPago;
  },
  cboTipoComprobante: async () => {
    const { data } = await AxiosServices.get("api/vouchertype");
    const tipoComprobante = data as ITipoComprobante[];
    return tipoComprobante;
  },
};
