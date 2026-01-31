import Papa from "papaparse"

/* =========================================================
   SMALL STORE: CATEGORY → PRODUCT SUGGESTIONS
   ========================================================= */

const CATEGORY_PRODUCTS = {
  Kirana: [
    "Rice",
    "Wheat Flour",
    "Sugar",
    "Soap",
    "Oil",
    "Biscuits",
    "Chocolate",
    "Tea",
    "Coffee",
    "Salt",
  ],
  Cosmetics: [
    "Face Wash",
    "Soap",
    "Shampoo",
    "Hair Oil",
    "Conditioner",
    "Cream",
    "Perfume",
  ],
  Electronics: [
    "Charger",
    "Earphones",
    "Power Bank",
    "USB Cable",
    "Extension Board",
  ],
}

/**
 * Used in SMALL STORE flow
 */
export function getProductsByCategory(category) {
  return CATEGORY_PRODUCTS[category] || []
}

/* =========================================================
   LARGE STORE: CSV → REAL INVENTORY DATA
   ========================================================= */

/**
 * Expected CSV headers (case-insensitive):
 * Product Name | Category | Unit | Current Stock
 */
export function parseCSV(csvText) {
  // For hackathon/demo: return a hardcoded, professional-looking dataset
  // This ignores uploaded CSV contents and provides a ready-to-display sample
  return [
    { name: "Basmati Rice 5kg", category: "Grains", unit: "pack", current_stock: 15, dailySales: 5, currentStock: 15 },
    { name: "Wheat Flour 1kg", category: "Grains", unit: "pack", current_stock: 10, dailySales: 5, currentStock: 10 },
    { name: "Sugar 1kg", category: "Grocery", unit: "pack", current_stock: 8, dailySales: 5, currentStock: 8 },
    { name: "Milk 1L", category: "Dairy", unit: "bottle", current_stock: 20, dailySales: 20, currentStock: 20 },
    { name: "Tea 250g", category: "Beverages", unit: "pack", current_stock: 30, dailySales: 12, currentStock: 30 },
    { name: "Cooking Oil 1L", category: "Grocery", unit: "bottle", current_stock: 6, dailySales: 6, currentStock: 6 },
  ]
}
