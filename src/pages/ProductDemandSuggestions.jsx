// import { useLocation } from "react-router-dom"
// import { useEffect, useState } from "react"
// import { Search, Upload, AlertCircle } from "lucide-react"

// const defaultData = {
//   milk: [
//     { brand:"Amul", demand:"High", daily:22, weekly:150, stockout:"High" },
//     { brand:"Mother Dairy", demand:"High", daily:18, weekly:120, stockout:"Medium" },
//     { brand:"Nandini", demand:"Medium", daily:10, weekly:70, stockout:"Low" },
//     { brand:"Local Dairy", demand:"High", daily:20, weekly:135, stockout:"High" }
//   ],
//   rice: [
//     { brand:"India Gate", demand:"High", daily:15, weekly:100, stockout:"High" },
//     { brand:"Daawat", demand:"High", daily:13, weekly:90, stockout:"Medium" },
//     { brand:"Local Brand", demand:"High", daily:18, weekly:125, stockout:"High" }
//   ],
//   biscuits: [
//     { brand:"Parle-G", demand:"High", daily:30, weekly:210, stockout:"High" },
//     { brand:"Good Day", demand:"High", daily:20, weekly:140, stockout:"Medium" },
//     { brand:"Oreo", demand:"Medium", daily:12, weekly:85, stockout:"Low" }
//   ]
// }

// // CSV Parser Function
// function parseCSV(csvText) {
//   const lines = csvText.trim().split('\n')
//   if (lines.length < 2) return []

//   const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
//   const products = []

//   for (let i = 1; i < lines.length; i++) {
//     const values = lines[i].split(',').map(v => v.trim())
//     const product = {}

//     headers.forEach((header, idx) => {
//       product[header] = values[idx] || ''
//     })

//     products.push(product)
//   }

//   return products
// }

// // Determine demand level based on daily sales
// function calculateDemandLevel(dailySales) {
//   const sales = parseInt(dailySales) || 0
//   if (sales >= 20) return "High"
//   if (sales >= 10) return "Medium"
//   return "Low"
// }

// // Determine stockout risk based on current stock and daily sales
// function calculateStockoutRisk(currentStock, dailySales) {
//   const stock = parseInt(currentStock) || 0
//   const sales = parseInt(dailySales) || 0
  
//   if (sales === 0) return "Low"
//   const daysOfStock = stock / sales
  
//   if (daysOfStock <= 2) return "High"
//   if (daysOfStock <= 5) return "Medium"
//   return "Low"
// }

// // Transform CSV data to match display format
// function transformCSVData(csvProducts) {
//   return csvProducts.map(product => {
//     const productName = product['product name'] || product['product'] || product['name'] || 'Unknown'
//     const dailySales = parseInt(product['daily sales'] || product['daily'] || product['avg daily sales'] || 0) || 0
//     const weeklySales = parseInt(product['weekly sales'] || product['weekly'] || dailySales * 7 || 0) || 0
//     const currentStock = parseInt(product['current stock'] || product['stock'] || product['quantity'] || 0) || 0
    
//     return {
//       name: productName,
//       demand: calculateDemandLevel(dailySales),
//       daily: dailySales,
//       weekly: weeklySales,
//       stock: currentStock,
//       stockout: calculateStockoutRisk(currentStock, dailySales),
//       category: product['category'] || 'General'
//     }
//   })
// }

// export default function ProductDemandSuggestions() {
//   const { state } = useLocation()
//   const [query, setQuery] = useState("")
//   const [products, setProducts] = useState([])
//   const [uploadedData, setUploadedData] = useState(null)
//   const [error, setError] = useState("")

//   useEffect(() => {
//     if (state?.category) {
//       setQuery(state.category)
//       setProducts(defaultData[state.category?.toLowerCase()] || [])
//     }
//   }, [state])

//   const handleCSVUpload = (e) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     const reader = new FileReader()
//     reader.onload = (event) => {
//       try {
//         const csvText = event.target?.result
//         const csvProducts = parseCSV(csvText)
        
//         if (csvProducts.length === 0) {
//           setError("No valid data found in CSV file")
//           return
//         }

//         const transformedData = transformCSVData(csvProducts)
//         setUploadedData(transformedData)
//         setProducts(transformedData)
//         setQuery(`Uploaded Data (${file.name})`)
//         setError("")
//       } catch (err) {
//         setError("Error parsing CSV file: " + err.message)
//       }
//     }

//     reader.readAsText(file)
//   }

//   const badgeClass = (demand) =>
//     demand === "High"
//       ? "bg-green-100 text-green-800"
//       : demand === "Medium"
//       ? "bg-yellow-100 text-yellow-800"
//       : "bg-red-100 text-red-800"

//   const getStockWarning = (stock, dailySales) => {
//     const sales = parseInt(dailySales) || 0
//     if (sales === 0) return null
//     const daysOfStock = stock / sales
    
//     if (daysOfStock <= 2) {
//       return "⚠️ Stock in Limited Quantity"
//     } else if (daysOfStock <= 5) {
//       return "⚠️ Consider Restocking Soon"
//     }
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 p-6">
//       <div className="max-w-5xl mx-auto space-y-6">

//         <div className="bg-white rounded-2xl shadow p-6">
//           <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
//             <Search className="w-6 h-6" />
//             Product Demand Suggestions
//           </h1>
//           <p className="text-slate-500 mt-1">
//             {uploadedData ? "Showing data from uploaded CSV" : `Showing demand for ${query ? `${query}` : "all products"}`}
//           </p>
//         </div>

//         {/* CSV Upload Section */}
//         <div className="bg-white rounded-2xl shadow p-6 border-2 border-dashed border-blue-300">
//           <div className="flex items-center gap-4">
//             <Upload className="w-6 h-6 text-blue-600" />
//             <div className="flex-1">
//               <label className="cursor-pointer">
//                 <span className="text-blue-600 font-semibold hover:underline">
//                   Upload CSV File
//                 </span>
//                 <input
//                   type="file"
//                   accept=".csv"
//                   onChange={handleCSVUpload}
//                   className="hidden"
//                 />
//               </label>
//               <p className="text-sm text-slate-500 mt-1">
//                 CSV should have columns: Product Name, Daily Sales, Weekly Sales, Current Stock (optional)
//               </p>
//             </div>
//             {uploadedData && (
//               <button
//                 onClick={() => {
//                   setUploadedData(null)
//                   setProducts([])
//                   setQuery("")
//                   setError("")
//                 }}
//                 className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
//             <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
//             <div>
//               <p className="text-red-800 font-semibold">Error</p>
//               <p className="text-red-700 text-sm">{error}</p>
//             </div>
//           </div>
//         )}

//         {/* Products Display */}
//         <div className="space-y-4">
//           {products.length === 0 && !uploadedData && (
//             <div className="text-slate-500 bg-white rounded-2xl p-6">
//               Upload a CSV file to see product demand suggestions
//             </div>
//           )}

//           {products?.map((p, idx) => (
//             <div
//               key={idx}
//               className="border border-blue-200 rounded-2xl p-6 bg-white hover:shadow-lg transition"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h2 className="font-bold text-lg text-gray-800">{p.name || p.brand}</h2>
//                   {p.category && p.category !== 'General' && (
//                     <p className="text-sm text-slate-500">{p.category}</p>
//                   )}
//                 </div>
//                 <span className={`text-xs px-3 py-1 rounded-full font-semibold ${badgeClass(p.demand)}`}>
//                   {p.demand} Demand
//                 </span>
//               </div>

//               <div className="grid grid-cols-3 gap-4 mb-4">
//                 <div className="bg-blue-50 rounded-lg p-3">
//                   <div className="font-bold text-lg text-gray-800">{p.daily}</div>
//                   <div className="text-sm text-slate-600">Avg Daily Sales</div>
//                 </div>
//                 <div className="bg-blue-50 rounded-lg p-3">
//                   <div className="font-bold text-lg text-gray-800">{p.weekly}</div>
//                   <div className="text-sm text-slate-600">Weekly Sales</div>
//                 </div>
//                 <div className="bg-blue-50 rounded-lg p-3">
//                   <div className="font-bold text-lg text-gray-800">{p.stockout}</div>
//                   <div className="text-sm text-slate-600">Stockout Risk</div>
//                 </div>
//               </div>

//               {p.stock !== undefined && p.stock !== "" && (
//                 <div className="mb-3 text-sm bg-gray-50 rounded-lg p-3">
//                   <span className="font-semibold text-gray-800">Current Stock:</span> {p.stock} units
//                 </div>
//               )}

//               <div className="flex items-start gap-2">
//                 {getStockWarning(p.stock, p.daily) && (
//                   <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
//                 )}
//                 <div className="text-sm font-medium text-yellow-700">
//                   {getStockWarning(p.stock, p.daily) || "✅ Stock Level Optimal"}
//                 </div>
//               </div>

//               {p.demand === "High" && (
//                 <div className="mt-3 text-sm text-green-600 font-medium">
//                   ✅ Strongly Recommended to Stock
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   )
// }

import { useLocation } from "react-router-dom"
import { Search, TrendingUp } from "lucide-react"
import { useState } from "react"

/* ======================================
   BRAND RECOMMENDATIONS DATABASE
   Top brands by category (India retail)
====================================== */
const BRAND_SUGGESTIONS = {
  milk: [
    { rank: 1, name: "Amul", rating: "★★★★★", sales: "₹45,000+ daily" },
    { rank: 2, name: "Mother Dairy", rating: "★★★★", sales: "₹32,000+ daily" },
    { rank: 3, name: "Nandini", rating: "★★★★", sales: "₹28,000+ daily" },
  ],
  biscuits: [
    { rank: 1, name: "Parle-G", rating: "★★★★★", sales: "₹52,000+ daily" },
    { rank: 2, name: "Good Day", rating: "★★★★", sales: "₹38,000+ daily" },
    { rank: 3, name: "Oreo", rating: "★★★★", sales: "₹25,000+ daily" },
  ],
  rice: [
    { rank: 1, name: "India Gate", rating: "★★★★★", sales: "₹48,000+ daily" },
    { rank: 2, name: "Daawat", rating: "★★★★", sales: "₹35,000+ daily" },
    { rank: 3, name: "Basmati King", rating: "★★★★", sales: "₹22,000+ daily" },
  ],
  snacks: [
    { rank: 1, name: "Lay's", rating: "★★★★★", sales: "₹41,000+ daily" },
    { rank: 2, name: "Balaji", rating: "★★★★", sales: "₹30,000+ daily" },
    { rank: 3, name: "Haldiram's", rating: "★★★★", sales: "₹28,000+ daily" },
  ],
  beverages: [
    { rank: 1, name: "Tea Chai", rating: "★★★★★", sales: "₹36,000+ daily" },
    { rank: 2, name: "Coffee", rating: "★★★★", sales: "₹28,000+ daily" },
    { rank: 3, name: "Energy Drinks", rating: "★★★★", sales: "₹20,000+ daily" },
  ],
  default: [
    { rank: 1, name: "Top Brand (Local)", rating: "★★★★★", sales: "Best Seller" },
    { rank: 2, name: "Popular Choice", rating: "★★★★", sales: "Good Sales" },
    { rank: 3, name: "Emerging Brand", rating: "★★★★", sales: "Growing Demand" },
  ],
}

// Get suggestions for a product based on category
function getBrandSuggestions(productName) {
  const name = productName.toLowerCase()
  
  // Try to match category
  if (name.includes("milk") || name.includes("dairy")) return BRAND_SUGGESTIONS.milk
  if (name.includes("biscuit")) return BRAND_SUGGESTIONS.biscuits
  if (name.includes("rice")) return BRAND_SUGGESTIONS.rice
  if (name.includes("chip") || name.includes("snack")) return BRAND_SUGGESTIONS.snacks
  if (name.includes("tea") || name.includes("coffee") || name.includes("drink")) return BRAND_SUGGESTIONS.beverages
  
  return BRAND_SUGGESTIONS.default
}

/* ======================================
   Demand + Risk Calculation (REAL LOGIC)
====================================== */
function computeMetrics(product) {
  const daily = Number(product.dailySales ?? 0)
  const weekly = daily * 7
  const stock = Number(product.currentStock ?? 0)

  // Demand based on actual daily sales
  let demand = "Low"
  if (daily >= 15) {
    demand = "High"
  } else if (daily >= 7) {
    demand = "Medium"
  }

  // Stockout risk based on days of stock remaining
  let stockout = "Low"
  const daysOfStock = daily > 0 ? stock / daily : 999

  if (daysOfStock <= 3) {
    stockout = "High"
  } else if (daysOfStock <= 7) {
    stockout = "Medium"
  }

  return { daily, weekly, demand, stockout, daysOfStock: Math.round(daysOfStock) }
}

/* ======================================
   UI Badge Styling - YELLOW & WHITE THEME
====================================== */

/* ---------------------------------------
   Component
---------------------------------------- */
// Demo products for when no data is passed
const DEMO_PRODUCTS = [
  { name: "Amul Milk", dailySales: 25, weeklySales: 175, currentStock: 15 },
  { name: "Parle-G Biscuits", dailySales: 35, weeklySales: 245, currentStock: 8 },
  { name: "India Gate Rice", dailySales: 18, weeklySales: 126, currentStock: 20 },
  { name: "Lay's Chips", dailySales: 22, weeklySales: 154, currentStock: 12 },
  { name: "Nandini Curd", dailySales: 16, weeklySales: 112, currentStock: 5 },
  { name: "Aashirvaad Atta", dailySales: 20, weeklySales: 140, currentStock: 25 },
]

export default function ProductDemandSuggestions() {
  const { state } = useLocation()
  const products = state?.products && state.products.length > 0 ? state.products : DEMO_PRODUCTS
  const [filter, setFilter] = useState("all") // all, high-demand, low-stock

  // Calculate metrics for all products
  const productsWithMetrics = products.map(product => ({
    ...product,
    metrics: computeMetrics(product)
  }))

  // Filter products based on selected filter
  let filteredProducts = productsWithMetrics

  if (filter === "high-demand") {
    filteredProducts = productsWithMetrics.filter(p => p.metrics.demand === "High")
  } else if (filter === "low-stock") {
    const avgStock = productsWithMetrics.reduce((sum, p) => sum + Number(p.currentStock ?? 0), 0) / productsWithMetrics.length
    filteredProducts = productsWithMetrics.filter(p => Number(p.currentStock ?? 0) < avgStock * 0.6)
  }

  // Count for badges
  const highDemandCount = productsWithMetrics.filter(p => p.metrics.demand === "High").length
  const avgStock = productsWithMetrics.reduce((sum, p) => sum + Number(p.currentStock ?? 0), 0) / productsWithMetrics.length
  const lowStockCount = productsWithMetrics.filter(p => Number(p.currentStock ?? 0) < avgStock * 0.6).length

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header - More Human */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-700 tracking-wide">SMART INVENTORY</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-3 leading-tight">
            What You Should Stock
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            {state?.products && state.products.length > 0 
              ? "We analyzed your sales and spotted what's hot. Here are the brands your customers actually want." 
              : "Based on local shopping patterns, these are the brands flying off shelves."}
          </p>
        </div>

        {/* Filter Tabs - More Casual */}
        {products.length > 0 && (
          <div className="mb-10 flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all text-sm ${
                filter === "all"
                  ? "bg-yellow-400 text-gray-900 shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({products.length})
            </button>

            <button
              onClick={() => setFilter("high-demand")}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all text-sm flex items-center gap-2 ${
                filter === "high-demand"
                  ? "bg-yellow-400 text-gray-900 shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🔥 Hot Items <span className="font-black text-sm">{highDemandCount}</span>
            </button>

            <button
              onClick={() => setFilter("low-stock")}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all text-sm flex items-center gap-2 ${
                filter === "low-stock"
                  ? "bg-red-400 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ⚠️ Running Low <span className="font-black text-sm">{lowStockCount}</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {state?.products && state.products.length === 0 && (
          <div className="text-center bg-gray-50 border-2 border-dashed border-gray-300 p-12 rounded-2xl">
            <p className="text-gray-600 text-lg">No data yet. Upload a CSV to see recommendations.</p>
          </div>
        )}

        {/* Filter Empty State */}
        {products.length > 0 && filteredProducts.length === 0 && (
          <div className="text-center bg-gray-50 border-2 border-dashed border-gray-300 p-12 rounded-2xl">
            <p className="text-gray-600 text-lg">Nothing found in this filter.</p>
          </div>
        )}

        {/* Product Cards with Brand Suggestions */}
        {/* Product Cards with Brand Suggestions */}
        <div className="space-y-8 mb-16">
          {filteredProducts.map((product, idx) => {
            const metrics = product.metrics
            const isHighDemand = metrics.demand === "High"
            const avgStockAcrossProducts = productsWithMetrics.reduce((sum, p) => sum + Number(p.currentStock ?? 0), 0) / productsWithMetrics.length
            const isLowStock = Number(product.currentStock ?? 0) < avgStockAcrossProducts * 0.6
            const brandSuggestions = getBrandSuggestions(product.name)

            return (
              <div
                key={idx}
                className={`border-l-8 bg-white rounded-xl p-8 hover:shadow-xl transition-all ${
                  isHighDemand && isLowStock
                    ? "border-l-red-500"
                    : isHighDemand
                    ? "border-l-yellow-500"
                    : isLowStock
                    ? "border-l-orange-500"
                    : "border-l-gray-300"
                }`}
              >
                {/* Top Row */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">
                      {product.name}
                    </h2>
                    {product.category && (
                      <p className="text-sm text-gray-500 font-medium">{product.category}</p>
                    )}
                  </div>

                  {isHighDemand && isLowStock && (
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-black animate-pulse">
                      🚨 URGENT
                    </div>
                  )}
                  {isHighDemand && !isLowStock && (
                    <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-black">
                      🔥 HOT
                    </div>
                  )}
                </div>

                {/* Stats - More Natural Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-200">
                  <div>
                    <div className="text-gray-500 text-xs font-semibold mb-1">DAILY</div>
                    <div className="text-3xl font-black text-gray-900">{metrics.daily}</div>
                    <div className="text-xs text-gray-500 mt-1">units sold</div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs font-semibold mb-1">WEEKLY</div>
                    <div className="text-3xl font-black text-gray-900">{metrics.weekly}</div>
                    <div className="text-xs text-gray-500 mt-1">units sold</div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs font-semibold mb-1">IN STOCK</div>
                    <div className={`text-3xl font-black ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                      {product.currentStock}
                    </div>
                    <div className={`text-xs mt-1 ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                      {metrics.daysOfStock} days left
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs font-semibold mb-1">RISK LEVEL</div>
                    <div className={`text-2xl font-black ${metrics.stockout === "High" ? 'text-orange-600' : 'text-yellow-600'}`}>
                      {metrics.stockout}
                    </div>
                  </div>
                </div>

                {/* Brand Suggestions - More Casual */}
                <div className="mb-8">
                  <h3 className="text-xl font-black text-gray-900 mb-4">
                    Top Brands to Stock
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {brandSuggestions.map((brand) => (
                      <div
                        key={brand.rank}
                        className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg ${
                          brand.rank === 1
                            ? "bg-yellow-100 border-yellow-400 shadow-md"
                            : brand.rank === 2
                            ? "bg-gray-100 border-gray-400"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <div className="flex items-baseline gap-2 mb-2">
                          {brand.rank === 1 && <span className="text-2xl">⭐</span>}
                          <span className="text-xs font-black text-gray-600"># {brand.rank}</span>
                        </div>
                        <div className="font-black text-lg text-gray-900 mb-2">
                          {brand.name}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {brand.rating}
                        </div>
                        <div className="text-xs font-bold text-gray-700 bg-gray-50 inline-block px-3 py-1 rounded-full">
                          {brand.sales}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Message */}
                <div className="pt-4 border-t border-gray-200">
                  {isHighDemand && isLowStock && (
                    <div className="text-red-900 text-base font-bold">
                      ⚡ Order #1 brand RIGHT NOW - customers are asking for it!
                    </div>
                  )}
                  {isHighDemand && !isLowStock && (
                    <div className="text-yellow-900 text-base font-bold">
                      👍 People love this. Stock up on top brands.
                    </div>
                  )}
                  {!isHighDemand && isLowStock && (
                    <div className="text-orange-900 text-base font-bold">
                      ⏰ Running low. Reorder soon.
                    </div>
                  )}
                  {!isHighDemand && !isLowStock && (
                    <div className="text-gray-700 text-base font-bold">
                      ✓ Stock looks good. Keep monitoring.
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary Stats */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 text-white rounded-xl p-8 hover:shadow-xl transition">
              <div className="text-5xl font-black mb-3">🔥</div>
              <div className="text-3xl font-black mb-2">{highDemandCount}</div>
              <div className="text-sm text-gray-300">Hot Products</div>
              <div className="text-xs text-gray-400 mt-2">{Math.round((highDemandCount / products.length) * 100)}% of your range</div>
            </div>

            <div className="bg-red-500 text-white rounded-xl p-8 hover:shadow-xl transition">
              <div className="text-5xl font-black mb-3">⚠️</div>
              <div className="text-3xl font-black mb-2">{lowStockCount}</div>
              <div className="text-sm text-red-100">Items Running Low</div>
              <div className="text-xs text-red-100 mt-2">{Math.round((lowStockCount / products.length) * 100)}% need restocking</div>
            </div>

            <div className="bg-yellow-400 text-gray-900 rounded-xl p-8 hover:shadow-xl transition">
              <div className="text-5xl font-black mb-3">📊</div>
              <div className="text-3xl font-black mb-2">{products.length}</div>
              <div className="text-sm text-gray-800">Total Tracked</div>
              <div className="text-xs text-gray-700 mt-2">Keep watch on these</div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
