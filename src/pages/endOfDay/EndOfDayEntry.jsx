// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const PRODUCTS = ["Soap", "Biscuits", "Rice", "Milk"];

// // mock system data (later this will come from bills / barcode / DB)
// const SYSTEM_STOCK = {
//   Soap: { opening: 120, received: 30 },
//   Biscuits: { opening: 200, received: 50 },
//   Rice: { opening: 90, received: 20 },
//   Milk: { opening: 60, received: 40 },
// };

// export default function EndOfDayEntry() {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   // default LARGE (as decided)
//   const storeType = state?.storeType || "large";

//   const [rows, setRows] = useState(
//     PRODUCTS.map((product) => ({
//       product,
//       opening:
//         storeType === "large" ? SYSTEM_STOCK[product].opening : "",
//       received:
//         storeType === "large" ? SYSTEM_STOCK[product].received : "",
//       closing: "",
//     }))
//   );

//   const updateValue = (index, value) => {
//     const updated = [...rows];
//     updated[index].closing = value;
//     setRows(updated);
//   };

//   const handleNext = () => {
//     const calculated = rows.map((r) => ({
//       product: r.product,
//       sold:
//         Number(r.opening || 0) +
//         Number(r.received || 0) -
//         Number(r.closing || 0),
//     }));

//     navigate("/end-of-day-summary", {
//       state: { data: calculated },
//     });
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white">
//       <h1 className="text-2xl font-bold mb-6">End of Day Entry</h1>

//       <table className="w-full border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">Product</th>
//             <th className="border p-2">Opening Stock</th>
//             <th className="border p-2">Stock Received</th>
//             <th className="border p-2">Closing Stock</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, i) => (
//             <tr key={row.product}>
//               <td className="border p-2">{row.product}</td>

//               <td className="border p-2 text-center">
//                 {row.opening}
//               </td>

//               <td className="border p-2 text-center">
//                 {row.received}
//               </td>

//               <td className="border p-2">
//                 <input
//                   type="number"
//                   className="w-full border p-1"
//                   value={row.closing}
//                   onChange={(e) =>
//                     updateValue(i, e.target.value)
//                   }
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button
//         onClick={handleNext}
//         className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
//       >
//         Next
//       </button>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Package, TrendingUp, ArrowRight, Calendar, Lock, Edit3 } from "lucide-react";

const PRODUCTS = ["Soap", "Biscuits", "Rice", "Milk"];

// mock system data (later this will come from bills / barcode / DB)
const SYSTEM_STOCK = {
  Soap: { opening: 120, received: 30 },
  Biscuits: { opening: 200, received: 50 },
  Rice: { opening: 90, received: 20 },
  Milk: { opening: 60, received: 40 },
};

export default function EndOfDayEntry() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // default LARGE (as decided)
  const storeType = state?.storeType || "large";

  const [rows, setRows] = useState(
    PRODUCTS.map((product) => ({
      product,
      opening:
        storeType === "large" ? SYSTEM_STOCK[product].opening : "",
      received:
        storeType === "large" ? SYSTEM_STOCK[product].received : "",
      closing: "",
    }))
  );

  const updateValue = (index, value) => {
    const updated = [...rows];
    updated[index].closing = value;
    setRows(updated);
  };

  const handleNext = () => {
    const calculated = rows.map((r) => ({
      product: r.product,
      opening: Number(r.opening || 0),
      received: Number(r.received || 0),
      closing: Number(r.closing || 0),
      sold:
        Number(r.opening || 0) +
        Number(r.received || 0) -
        Number(r.closing || 0),
    }));

    navigate("/end-of-day-summary", {
      state: { data: calculated },
    });
  };

  // Calculate totals
  const totals = rows.reduce(
    (acc, row) => ({
      opening: acc.opening + Number(row.opening || 0),
      received: acc.received + Number(row.received || 0),
      closing: acc.closing + Number(row.closing || 0),
    }),
    { opening: 0, received: 0, closing: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-6xl mx-auto p-6 lg:p-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">End of Day Entry</h1>
                <p className="text-sm text-slate-500 mt-1">Record your daily inventory movements</p>
              </div>
            </div>
            
            {/* Store Type Badge */}
            <div className="hidden lg:flex items-center gap-3 bg-white rounded-xl px-6 py-3 shadow-lg border border-slate-200">
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Store Type</p>
                <p className="text-lg font-bold text-blue-600 capitalize">{storeType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Entry Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-6">
          
          {/* Table Header */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-700">Inventory Details</h2>
            </div>
          </div>

          {/* Responsive Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left">
                    <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Product
                    </span>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Opening Stock
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Stock Received
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                        Closing Stock
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row, index) => (
                  <tr 
                    key={row.product}
                    className="hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                          <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-semibold text-slate-800">{row.product}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-100 border border-slate-200">
                          <span className="font-medium text-slate-700">{row.opening}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 border border-blue-200">
                          <span className="font-medium text-blue-700">+{row.received}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <input
                          type="number"
                          className="w-full max-w-[140px] border-2 border-blue-300 rounded-lg px-4 py-2.5 text-center font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400 bg-white"
                          placeholder="Enter"
                          value={row.closing}
                          onChange={(e) => updateValue(index, e.target.value)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* Totals Row */}
              <tfoot>
                <tr className="bg-gradient-to-r from-slate-100 to-blue-50 border-t-2 border-slate-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-slate-600" />
                      </div>
                      <span className="font-bold text-slate-800 text-lg">Total</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <div className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-200 border border-slate-300">
                        <span className="font-bold text-slate-800">{totals.opening}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <div className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-100 border border-blue-300">
                        <span className="font-bold text-blue-800">+{totals.received}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <div className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 border border-blue-700 shadow-md">
                        <span className="font-bold text-white">{totals.closing}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer Section */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Sales will be calculated automatically based on stock movements</span>
              </div>
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">How it works</h3>
              <p className="text-sm text-blue-700">
                Opening stock and received stock are auto-populated from your system. 
                Enter the <span className="font-semibold">closing stock</span> count for each product. 
                Units sold will be calculated as: <span className="font-semibold">Opening + Received - Closing = Sold</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}