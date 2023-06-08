import { ICategoryDishGet } from "@/interfaces/ICategoryDish";

interface IDishPrincipal {
  nameDish: string;
  priceDish: number;
  imgDish: string;
}

interface IDishCreateOrUpdate extends IDishPrincipal {
  categoryDishId?: string;
}

interface IDishGet extends IDishPrincipal {
  id: string;
  categoryDish: ICategoryDishGet;
}

interface IDishOrderStatistics {
  dishId: string;
  nameDish: string;
  imgDish: string;
  nameCatDish: string;
  totalSales: number;
  quantityOfDishesSold: number;
}

export type {
  IDishPrincipal,
  IDishCreateOrUpdate,
  IDishGet,
  IDishOrderStatistics,
};
