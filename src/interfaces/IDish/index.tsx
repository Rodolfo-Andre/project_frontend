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

export type { IDishPrincipal, IDishCreateOrUpdate, IDishGet };
