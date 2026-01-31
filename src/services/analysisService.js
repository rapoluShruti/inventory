// // src/services/analysisService.js

// import { FESTIVAL_TRENDS } from "../data/trendsignals"

// export function getAnalysis(products, festival) {
//   return products.map(p => {
//     let demand = "Normal"
//     let action = "Maintain stock"

//     if (FESTIVAL_TRENDS[festival]?.high.includes(p.name)) {
//       demand = "High"
//       action = "Increase stock"
//     } else if (FESTIVAL_TRENDS[festival]?.medium.includes(p.name)) {
//       demand = "Medium"
//       action = "Monitor & reorder"
//     }

//     return {
//       product: p.name,
//       reorderFrequency: p.frequency ?? 1,
//       demand,
//       action,
//     }
//   })
// }
import { FESTIVAL_TRENDS } from "../data/trendsignals"

export function getAnalysis(products, festival) {
  return products.map((p) => {
    const frequency = p.frequency ?? 1
    const stock = p.stock ?? 0   // 👈 YOU MUST PASS THIS
    let demand = "Low"
    let action = "Maintain stock"

    // Festival boost
    const festivalBoost =
      FESTIVAL_TRENDS[festival]?.high.includes(p.name) ? 1.5 :
      FESTIVAL_TRENDS[festival]?.medium.includes(p.name) ? 1.2 :
      1

    const demandScore = frequency * festivalBoost

    // Core logic
    if (demandScore >= 8 && stock <= 20) {
      demand = "High"
      action = "Urgent restock"
    } else if (demandScore >= 4) {
      demand = "Medium"
      action = "Plan reorder"
    }

    return {
      product: p.name,
      reorderFrequency: frequency,
      demand,
      action,
    }
  })
}
