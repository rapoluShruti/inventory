import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Upload, CheckCircle } from "lucide-react"

export default function LargeStoreSetup() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [isDragActive, setIsDragActive] = useState(false)

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

  const handleProcess = () => {
    if (file) {
      navigate("/suggestions", {
        state: { fileName: file.name },
      })
    }
  }

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

        {/* Process Button */}
        <button
          onClick={handleProcess}
          disabled={!file}
          className={`w-full mt-8 py-3 px-4 rounded-lg font-semibold transition-all ${
            file
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl cursor-pointer"
              : "bg-slate-200 text-slate-500 cursor-not-allowed opacity-50"
          }`}
        >
          {file ? "Analyze Inventory" : "Select CSV File"}
        </button>

        {/* Footer */}
        <p className="text-xs text-slate-500 text-center mt-6">
          📊 Fast analysis • 🎯 Retail-focused • ⚡ Instant insights
        </p>
      </div>
    </div>
  )
}
