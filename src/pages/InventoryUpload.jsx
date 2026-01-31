import { useState } from "react"
import { Upload, AlertCircle, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

// CSV Parser
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
  const products = []

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue
    
    const values = lines[i].split(',').map(v => v.trim())
    const product = {}

    headers.forEach((header, idx) => {
      product[header] = values[idx] || ''
    })

    products.push(product)
  }

  return products
}

// Transform CSV to standardized format
function transformCSVData(csvProducts) {
  return csvProducts.map(product => {
    const productName = product['product name'] || product['product'] || product['name'] || 'Unknown'
    const dailySales = parseInt(product['daily sales'] || product['daily'] || product['avg daily sales'] || 0) || 0
    const currentStock = parseInt(product['current stock'] || product['stock'] || product['quantity'] || 0) || 0
    const category = product['category'] || ''

    return {
      name: productName,
      dailySales: dailySales,
      currentStock: currentStock,
      category: category
    }
  }).filter(p => p.name !== 'Unknown' && (p.dailySales > 0 || p.currentStock > 0))
}

export default function InventoryUpload() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState([])

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.name.endsWith('.csv')) {
      setError("Please select a CSV file")
      return
    }

    setFile(selectedFile)
    setError("")

    // Read and preview
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const csvText = event.target?.result
        const csvProducts = parseCSV(csvText)

        if (csvProducts.length === 0) {
          setError("No valid data found in CSV")
          return
        }

        const transformed = transformCSVData(csvProducts)
        setPreview(transformed.slice(0, 3))
        setSuccess(true)
      } catch (err) {
        setError("Error reading file: " + err.message)
      }
    }

    reader.readAsText(selectedFile)
  }

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file first")
      return
    }

    setLoading(true)

    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const csvText = event.target?.result
        const csvProducts = parseCSV(csvText)
        const transformed = transformCSVData(csvProducts)

        // Navigate to suggestions with data
        navigate('/suggestions', {
          state: { products: transformed }
        })
      }
      reader.readAsText(file)
    } catch (err) {
      setError("Error processing file: " + err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-8 mb-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            📊 Upload Inventory
          </h1>
          <p className="text-slate-600">
            Upload your CSV file to analyze product demand and stock levels
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow p-8 mb-6 border-2 border-dashed border-blue-300">
          <div className="text-center">
            <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            
            <label className="cursor-pointer block">
              <span className="text-lg font-semibold text-blue-600 hover:underline">
                Click to select CSV file
              </span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>

            <p className="text-sm text-slate-500 mt-2">
              or drag and drop your CSV file
            </p>

            {file && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 font-semibold">✓ {file.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* CSV Format Guide */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-6 border border-blue-200">
          <h2 className="font-bold text-blue-700 mb-3">📋 CSV Format Required</h2>
          <p className="text-sm text-slate-700 mb-3">Your CSV must have these columns:</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white p-3 rounded">
              <code className="text-blue-600 font-semibold">Product Name</code>
              <p className="text-slate-600">Product name/title</p>
            </div>
            <div className="bg-white p-3 rounded">
              <code className="text-blue-600 font-semibold">Daily Sales</code>
              <p className="text-slate-600">Avg units sold per day</p>
            </div>
            <div className="bg-white p-3 rounded">
              <code className="text-blue-600 font-semibold">Current Stock</code>
              <p className="text-slate-600">Units in stock</p>
            </div>
            <div className="bg-white p-3 rounded">
              <code className="text-blue-600 font-semibold">Category</code>
              <p className="text-slate-600">(Optional) Product category</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 mt-4 bg-white p-3 rounded">
            <strong>Example:</strong><br/>
            Product Name,Daily Sales,Current Stock,Category<br/>
            Basmati Rice 5kg,5,20,Grains<br/>
            Milk 1L,20,15,Dairy
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Preview */}
        {success && preview.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-semibold">Preview: Data looks good!</p>
            </div>
            
            <div className="space-y-2 text-sm">
              {preview.map((p, idx) => (
                <div key={idx} className="bg-white p-3 rounded border border-green-200">
                  <p className="font-semibold text-gray-800">{p.name}</p>
                  <p className="text-slate-600">
                    Daily: {p.dailySales} | Stock: {p.currentStock} | Category: {p.category || 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {file && (
            <button
              onClick={() => setFile(null)}
              className="flex-1 px-6 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition"
            >
              Clear
            </button>
          )}
          
          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition ${
              file && !loading
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Processing...' : 'Analyze Inventory'}
          </button>
        </div>
      </div>
    </div>
  )
}
