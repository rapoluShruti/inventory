// import { useLocation, useNavigate } from "react-router-dom";

// function EndOfDaySummary() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const data = location.state?.data || [];

//   return (
//     <div className="min-h-screen bg-white p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6">End of Day Summary</h1>

//         {data.length === 0 ? (
//           <p className="text-gray-500">No data available.</p>
//         ) : (
//           <table className="w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2 text-left">Product</th>
//                 <th className="border p-2">Opening</th>
//                 <th className="border p-2">Received</th>
//                 <th className="border p-2">Closing</th>
//                 <th className="border p-2">Sold</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row) => (
//                 <tr key={row.product}>
//                   <td className="border p-2">{row.product}</td>
//                   <td className="border p-2">{row.opening}</td>
//                   <td className="border p-2">{row.received}</td>
//                   <td className="border p-2">{row.closing}</td>
//                   <td className="border p-2 font-semibold text-green-700">
//                     {row.sold}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         <button
//           onClick={() => navigate("/")}
//           className="mt-6 bg-gray-700 text-white px-6 py-2 rounded"
//         >
//           Back to Home
//         </button>
//       </div>
//     </div>
//   );
// }

// export default EndOfDaySummary;

import { useLocation, useNavigate } from "react-router-dom";
import { Package, TrendingUp, CheckCircle2, Home, BarChart3, FileText } from "lucide-react";

function EndOfDaySummary() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.data || [];

  // Calculate totals
  const totals = data.reduce(
    (acc, row) => ({
      opening: acc.opening + row.opening,
      received: acc.received + row.received,
      closing: acc.closing + row.closing,
      sold: acc.sold + row.sold,
    }),
    { opening: 0, received: 0, closing: 0, sold: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50">
      <div className="max-w-6xl mx-auto p-6 lg:p-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-3 rounded-xl shadow-lg">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">End of Day Summary</h1>
                <p className="text-sm text-slate-500 mt-1">Review your daily inventory performance</p>
              </div>
            </div>
            
            {/* Summary Stats */}
            <div className="hidden lg:flex items-center gap-6 bg-white rounded-xl px-6 py-3 shadow-lg border border-slate-200">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <p className="text-xs font-semibold text-slate-500 uppercase">Total Sold</p>
                </div>
                <p className="text-2xl font-bold text-emerald-600">{totals.sold}</p>
              </div>
              <div className="h-10 w-px bg-slate-200"></div>
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Products</p>
                <p className="text-2xl font-bold text-slate-700">{data.length}</p>
              </div>
            </div>
          </div>
        </div>

        {data.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="bg-slate-100 p-6 rounded-full mb-4">
                <FileText className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No Data Available</h3>
              <p className="text-slate-500 mb-6">Complete the End of Day Entry to see your summary here.</p>
              <button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all"
              >
                Go to Entry
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Main Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-6">
              
              {/* Table Header */}
              <div className="bg-gradient-to-r from-slate-50 to-emerald-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-lg font-semibold text-slate-700">Daily Inventory Report</h2>
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
                        <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                          Opening
                        </span>
                      </th>
                      <th className="px-6 py-4 text-center">
                        <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                          Received
                        </span>
                      </th>
                      <th className="px-6 py-4 text-center">
                        <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                          Closing
                        </span>
                      </th>
                      <th className="px-6 py-4 text-center">
                        <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                          Sold
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.map((row, index) => (
                      <tr 
                        key={row.product}
                        className="hover:bg-slate-50/50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                              <Package className="w-5 h-5 text-emerald-600" />
                            </div>
                            <span className="font-semibold text-slate-800">{row.product}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-center font-medium text-slate-700">
                            {row.opening}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-center">
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
                              +{row.received}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-center font-medium text-slate-700">
                            {row.closing}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-center">
                            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-base">
                              {row.sold}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  
                  {/* Totals Row */}
                  <tfoot>
                    <tr className="bg-gradient-to-r from-slate-100 to-emerald-50 border-t-2 border-slate-300">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-slate-600" />
                          </div>
                          <span className="font-bold text-slate-800 text-lg">Total</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-center font-bold text-slate-800 text-lg">
                          {totals.opening}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-center">
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-200 text-blue-800 font-bold text-base">
                            +{totals.received}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-center font-bold text-slate-800 text-lg">
                          {totals.closing}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-center">
                          <span className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-emerald-600 text-white font-bold text-lg shadow-lg">
                            {totals.sold}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg border border-slate-200 px-6 py-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Summary completed successfully</span>
              </div>
              <button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:from-slate-800 hover:to-slate-900 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </button>
            </div>

            {/* Info Card */}
            <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg mt-0.5">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-emerald-900 mb-1">Daily Summary Complete</h3>
                  <p className="text-sm text-emerald-700">
                    Your end of day inventory has been calculated. Total units sold: <span className="font-bold">{totals.sold}</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default EndOfDaySummary;