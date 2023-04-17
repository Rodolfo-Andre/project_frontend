interface ICategoryDishPrincipal {
  nameCatDish: string;
}

interface ICategoryDishGet extends ICategoryDishPrincipal {
  id: string;
}

export type { ICategoryDishPrincipal, ICategoryDishGet };
