export const PRODUCT_CATALOG = {
  Kirana: {
    Staples: ["Rice", "Wheat Flour", "Sugar", "Salt"],
    FMCG: ["Soap", "Shampoo", "Toothpaste"],
    Snacks: ["Biscuits", "Chips", "Chocolate"],
  },
  Cosmetics: {
    SkinCare: ["Face Wash", "Moisturizer"],
    HairCare: ["Shampoo", "Hair Oil"],
  },
  Electronics: {
    Accessories: ["Charger", "Earphones", "Power Bank"],
  },
}

export function flattenCatalog(category) {
  if (!PRODUCT_CATALOG[category]) return []
  return Object.values(PRODUCT_CATALOG[category]).flat()
}
