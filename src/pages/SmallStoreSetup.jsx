// import { useEffect, useState } from "react"
// import { useLocation, useNavigate } from "react-router-dom"
// import { getProductsByCategory } from "../services/productService"

// export default function SmallStoreSetup() {
//   const { state } = useLocation()
//   const navigate = useNavigate()
//   const [products, setProducts] = useState([])
//   const [selected, setSelected] = useState([])

//   useEffect(() => {
//     getProductsByCategory(state.category).then(setProducts)
//   }, [])

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="font-bold text-xl mb-4">Select Products</h2>

//       <div className="grid grid-cols-3 gap-2">
//         {products.map(p => (
//           <button key={p}
//             onClick={() =>
//               setSelected(prev =>
//                 prev.includes(p) ? prev : [...prev, p]
//               )
//             }
//             className={`border p-2 rounded ${
//               selected.includes(p) ? "bg-green-500 text-white" : ""
//             }`}>
//             {p}
//           </button>
//         ))}
//       </div>

//       <button
//         onClick={() => navigate("/analysis", { state: { products: selected } })}
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
//         Show Analysis
//       </button>
//     </div>
//   )
// }
// import { useNavigate } from "react-router-dom"

// export default function SmallStoreSetup() {
//   const navigate = useNavigate()

//   const selectCategory = (category) => {
//     navigate("/suggestions", {
//       state: { category }
//     })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
//       <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
//         <h2 className="text-xl font-bold mb-4">
//           Select Category (Small Store)
//         </h2>

//         <div className="grid grid-cols-2 gap-4">
//           <button
//             onClick={() => selectCategory("milk")}
//             className="p-4 border rounded-xl hover:bg-blue-50"
//           >
//             Milk
//           </button>

//           <button
//             onClick={() => selectCategory("rice")}
//             className="p-4 border rounded-xl hover:bg-blue-50"
//           >
//             Rice
//           </button>

//           <button
//             onClick={() => selectCategory("biscuits")}
//             className="p-4 border rounded-xl hover:bg-blue-50"
//           >
//             Biscuits
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CATEGORY_SUGGESTIONS = {
  kirana: [
    "Soap",
    "Rice",
    "Biscuits",
    "Milk",
    "Cooking Oil",
    "Sugar",
    "Salt"
  ],
  cosmetics: [
    "Lipstick",
    "Mascara",
    "Foundation",
    "Concealer",
    "Compact Powder",
    "Eyeliner",
    "Face Wash"
  ],
  electronics: [
    "Mobile Charger",
    "Earphones",
    "Power Bank",
    "USB Cable",
    "Extension Board"
  ]
}

export default function SmallStoreSetup() {
  const navigate = useNavigate()

  const [category, setCategory] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])

  const products = category ? CATEGORY_SUGGESTIONS[category] : []

  const toggleProduct = (product) => {
    setSelectedProducts(prev =>
      prev.includes(product)
        ? prev.filter(p => p !== product)
        : [...prev, product]
    )
  }

  const goToAnalysis = () => {
    navigate("/analysis", {
      state: { products: selectedProducts }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">

        {/* STEP 1: CATEGORY SELECTION */}
        {!category && (
          <>
            <h2 className="text-xl font-bold">
              Select Store Category
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setCategory("kirana")}
                className="p-4 border rounded-xl hover:bg-blue-50 font-medium"
              >
                Kirana / Grocery
              </button>

              <button
                onClick={() => setCategory("cosmetics")}
                className="p-4 border rounded-xl hover:bg-blue-50 font-medium"
              >
    
                Cosmetics
              </button>
              <button
                onClick={() => setCategory("electronics")}
                className="p-4 border rounded-xl hover:bg-blue-50 font-medium"
              >
                Electronics
              </button>
            </div>
          </>
        )}

        {/* STEP 2: PRODUCT SUGGESTIONS */}
        {category && (
          <>
            <h2 className="text-xl font-bold">
              Products Commonly Sold
            </h2>

            <p className="text-sm text-slate-500">
              Category: <strong>{category}</strong>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {products.map(p => (
                <button
                  key={p}
                  onClick={() => toggleProduct(p)}
                  className={`p-3 rounded-xl border text-sm transition ${
                    selectedProducts.includes(p)
                      ? "bg-green-500 text-white border-green-500"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              disabled={selectedProducts.length === 0}
              onClick={goToAnalysis}
              className={`mt-6 w-full py-3 rounded-xl font-semibold ${
                selectedProducts.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Show Analysis
            </button>
          </>
        )}

      </div>
    </div>
  )
}
