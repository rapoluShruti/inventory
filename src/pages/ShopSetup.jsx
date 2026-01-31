// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { Store, MapPin, Maximize2, Tag } from "lucide-react"

// export default function ShopSetup() {
//   const navigate = useNavigate()

//   const [shop, setShop] = useState({
//     name: "",
//     location: "",
//     size: "",
//     category: "",
//   })

//   const canContinue =
//     shop.name.trim() &&
//     shop.location.trim() &&
//     shop.size &&
//     shop.category

//   const handleContinue = () => {
//     if (!canContinue) return

//     if (shop.size === "small") {
//       navigate("/small", { state: shop })
//     } else {
//       navigate("/large", { state: shop })
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-6">
//       <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
//               <Store className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-white">Shop Setup</h1>
//           </div>
//           <p className="text-blue-100 text-sm">Get started by setting up your shop details</p>
//         </div>

//         {/* Form */}
//         <div className="px-8 py-8 space-y-6">
          
//           {/* Shop Name */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//               <Store className="w-4 h-4 text-blue-600" />
//               Shop Name
//             </label>
//             <input
//               className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               placeholder="Enter your shop name"
//               value={shop.name}
//               onChange={e =>
//                 setShop({ ...shop, name: e.target.value })
//               }
//             />
//           </div>

//           {/* Location */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//               <MapPin className="w-4 h-4 text-blue-600" />
//               Location
//             </label>
//             <input
//               className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               placeholder="Enter shop location"
//               value={shop.location}
//               onChange={e =>
//                 setShop({ ...shop, location: e.target.value })
//               }
//             />
//           </div>

//           {/* Shop Size */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//               <Maximize2 className="w-4 h-4 text-blue-600" />
//               Shop Size
//             </label>
//             <select
//               className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
//               value={shop.size}
//               onChange={e =>
//                 setShop({ ...shop, size: e.target.value })
//               }
//             >
//               <option value="">Select Shop Size</option>
//               <option value="small">Small Store</option>
//               <option value="large">Medium / Large Store</option>
//             </select>
//           </div>

//           {/* Category */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//               <Tag className="w-4 h-4 text-blue-600" />
//               Category
//             </label>
//             <select
//               className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
//               value={shop.category}
//               onChange={e =>
//                 setShop({ ...shop, category: e.target.value })
//               }
//             >
//               <option value="">Select Category</option>
//               <option value="Kirana">Kirana</option>
//               <option value="Cosmetics">Cosmetics</option>
//               <option value="Electronics">Electronics</option>
//             </select>
//           </div>

//           {/* Continue Button */}
//           <button
//             disabled={!canContinue}
//             onClick={handleContinue}
//             className={`w-full py-4 rounded-lg font-semibold text-base transition-all transform ${
//               canContinue
//                 ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl active:scale-[0.98]"
//                 : "bg-slate-200 text-slate-400 cursor-not-allowed"
//             }`}
//           >
//             {canContinue ? "Continue to Next Step →" : "Please fill all fields"}
//           </button>

//         </div>
//       </div>
//     </div>
//   )
// }   
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Store, MapPin, Loader2 } from "lucide-react"

export default function ShopSetup() {
  const navigate = useNavigate()
  const [loadingLocation, setLoadingLocation] = useState(false)

  const [shop, setShop] = useState({
    name: "",
    location: "",
    size: "",
    category: "",
  })

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser")
      return
    }

    setLoadingLocation(true)
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          // Reverse geocoding using OpenStreetMap's Nominatim API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          const data = await response.json()
          
          // Extract relevant location info
          const address = data.address
          const locationStr = [
            address.road || address.neighbourhood,
            address.suburb || address.city || address.town,
            address.state
          ].filter(Boolean).join(", ")
          
          setShop({ ...shop, location: locationStr || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` })
        } catch (error) {
          // Fallback to coordinates if geocoding fails
          setShop({ ...shop, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` })
        } finally {
          setLoadingLocation(false)
        }
      },
      (error) => {
        setLoadingLocation(false)
        alert("Unable to retrieve your location")
      }
    )
  }

  const canContinue =
    shop.name.trim() &&
    shop.location.trim() &&
    shop.size &&
    shop.category

  const handleContinue = () => {
    if (!canContinue) return

    if (shop.size === "small") {
      navigate("/small", { state: shop })
    } else {
      navigate("/large", { state: shop })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg rounded-lg border border-slate-200 shadow-sm">
        
        {/* Header */}
        <div className="border-b border-slate-200 px-8 py-6">
          <div className="flex items-center gap-3 mb-1">
            <Store className="w-5 h-5 text-slate-600" />
            <h1 className="text-2xl font-semibold text-slate-900">Shop Setup</h1>
          </div>
          <p className="text-slate-600 text-sm mt-1">Enter your shop details to continue</p>
        </div>

        {/* Form */}
        <div className="px-8 py-8 space-y-6">
          
          {/* Shop Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Shop Name
            </label>
            <input
              className="w-full border border-slate-300 px-3.5 py-2.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              placeholder="Enter your shop name"
              value={shop.name}
              onChange={e =>
                setShop({ ...shop, name: e.target.value })
              }
            />
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Location
            </label>
            <div className="relative flex gap-2">
              <input
                className="flex-1 border border-slate-300 px-3.5 py-2.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="Enter shop location"
                value={shop.location}
                onChange={e =>
                  setShop({ ...shop, location: e.target.value })
                }
              />
              <button
                type="button"
                onClick={getLocation}
                disabled={loadingLocation}
                className="px-3.5 py-2.5 border border-slate-300 rounded-md hover:bg-slate-50 active:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loadingLocation ? (
                  <Loader2 className="w-4 h-4 text-slate-600 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4 text-slate-600" />
                )}
                <span className="text-sm font-medium text-slate-700">
                  {loadingLocation ? "Detecting..." : "Use GPS"}
                </span>
              </button>
            </div>
          </div>

          {/* Shop Size */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Shop Size
            </label>
            <select
              className="w-full border border-slate-300 px-3.5 py-2.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white"
              value={shop.size}
              onChange={e =>
                setShop({ ...shop, size: e.target.value })
              }
            >
              <option value="">Select size</option>
              <option value="small">Small Store</option>
              <option value="large">Medium / Large Store</option>
            </select>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              className="w-full border border-slate-300 px-3.5 py-2.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white"
              value={shop.category}
              onChange={e =>
                setShop({ ...shop, category: e.target.value })
              }
            >
              <option value="">Select category</option>
              <option value="Kirana">Kirana</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          {/* Continue Button */}
          <button
            disabled={!canContinue}
            onClick={handleContinue}
            className="w-full mt-8 py-2.5 rounded-md font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
          >
            Continue
          </button>

        </div>
      </div>
    </div>
  )
}