import { useState } from "react"
import { useLocation } from "react-router-dom"
import { TrendingUp, Package, AlertCircle, BarChart3, Upload, CheckCircle } from "lucide-react"

export default function Analysis() {
  const location = useLocation()
  const { fileName, mode, products } = location.state || {}
  const [file, setFile] = useState(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const handleFileSelect = (e) => {
    const uploaded = e.target.files?.[0]
    if (uploaded?.type === "text/csv" || uploaded?.name.endsWith(".csv")) {
      setFile(uploaded)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    const dropped = e.dataTransfer?.files?.[0]
    if (dropped?.type === "text/csv" || dropped?.name.endsWith(".csv")) {
      setFile(dropped)
    }
  }

  // If no file uploaded and we're showing upload interface
  if (!file && !fileName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">
            Upload Inventory
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-slate-600 text-center mb-8">
            Upload your CSV file to generate demand insights for your store
          </p>

          {/* Upload Area */}
          <label
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`block border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-blue-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50"
            }`}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-3">
              {file ? (
                <>
                  <CheckCircle className="w-10 h-10 text-green-500" />
                  <p className="font-medium text-slate-900">{file.name}</p>
                  <p className="text-xs text-slate-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-slate-400" />
                  <p className="font-medium text-slate-700">Click to upload</p>
                  <p className="text-xs text-slate-500">or drag and drop your CSV</p>
                </>
              )}
            </div>
          </label>

          {/* Footer */}
          <p className="text-xs text-slate-500 text-center mt-6">
            📊 Fast analysis • 🎯 Retail-focused • ⚡ Instant insights
          </p>
        </div>
      </div>
    )
  }

  // Show analysis dashboard after CSV is uploaded or products passed from Onboarding
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Inventory Analysis</h1>
          <p className="text-slate-600">
            {fileName ? `Analyzing: ${fileName}` : file ? `Analyzing: ${file.name}` : "Inventory Analysis Dashboard"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "products", label: "Products", icon: Package },
            { id: "alerts", label: "Alerts", icon: AlertCircle },
            { id: "trends", label: "Trends", icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="text-sm text-slate-600 mb-2">Total Items</div>
                <div className="text-3xl font-bold text-blue-600">248</div>
                <div className="text-xs text-slate-500 mt-2">↑ 12% from last month</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg">
                <div className="text-sm text-slate-600 mb-2">Total Value</div>
                <div className="text-3xl font-bold text-emerald-600">₹45.2K</div>
                <div className="text-xs text-slate-500 mt-2">↑ 8% from last month</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg">
                <div className="text-sm text-slate-600 mb-2">Low Stock</div>
                <div className="text-3xl font-bold text-amber-600">15</div>
                <div className="text-xs text-slate-500 mt-2">Need reorder soon</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                <div className="text-sm text-slate-600 mb-2">Out of Stock</div>
                <div className="text-3xl font-bold text-red-600">3</div>
                <div className="text-xs text-slate-500 mt-2">Critical alert</div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-4">
              <div className="text-lg font-semibold text-slate-900 mb-4">Top Products</div>
              {[
                { name: "Rice (1kg)", qty: 45, value: "₹2,250" },
                { name: "Oil (1L)", qty: 32, value: "₹1,920" },
                { name: "Sugar (1kg)", qty: 28, value: "₹1,680" },
                { name: "Flour (1kg)", qty: 25, value: "₹1,000" },
                { name: "Tea (500g)", qty: 18, value: "₹900" },
              ].map((product, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div>
                    <div className="font-medium text-slate-900">{product.name}</div>
                    <div className="text-sm text-slate-500">Qty: {product.qty} units</div>
                  </div>
                  <div className="font-bold text-slate-900">{product.value}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-red-900">Critical: Out of Stock</div>
                  <div className="text-sm text-red-700">3 items - Reorder immediately</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-amber-900">Warning: Low Stock</div>
                  <div className="text-sm text-amber-700">15 items below safety threshold</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900">Info: Slow Moving Items</div>
                  <div className="text-sm text-blue-700">7 items haven't sold in 30 days</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "trends" && (
            <div className="space-y-6">
              <div>
                <div className="text-lg font-semibold text-slate-900 mb-4">Sales Trend</div>
                <div className="h-48 bg-gradient-to-t from-blue-100 to-transparent rounded-lg flex items-end justify-around p-4">
                  {[25, 40, 35, 50, 45, 60, 55].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-blue-500 rounded-t mx-1 hover:bg-blue-600 transition-colors"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
