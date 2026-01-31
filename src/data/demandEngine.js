// src/data/demandEngine.js

export const FESTIVAL_DEMAND = {
  Diwali: {
    high: ["Chips", "Chocolate", "Soap"],
    medium: ["Rice", "Biscuits"],
  },
  Holi: {
    high: ["Hair Oil", "Face Wash"],
    medium: ["Soap"],
  },
}

export function generateDemand(products, festival) {
  return products.map(p => ({
    product: p,
    demand:
      FESTIVAL_DEMAND[festival]?.high.includes(p)
        ? "High"
        : FESTIVAL_DEMAND[festival]?.medium.includes(p)
        ? "Medium"
        : "Normal",
    reorder:
      FESTIVAL_DEMAND[festival]?.high.includes(p)
        ? "Order More"
        : "Maintain",
  }))
}
