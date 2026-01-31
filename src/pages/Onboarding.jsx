import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { CheckCircle, UploadCloud, Store, Building2, ArrowRight } from "lucide-react";

const SMALL_STORE_CATEGORIES = {
  "Grains & Staples": ["Rice","Wheat Flour","Sugar","Salt","Dal","Poha","Suji"],
  "Dairy & Bakery": ["Milk","Butter","Cheese","Paneer","Curd","Bread"],
  "Snacks & Beverages": ["Chips","Biscuits","Chocolate","Juice","Cold Drink"],
  "Household": ["Detergent","Soap","Shampoo","Toothpaste","Phenyl"]
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null); // small | large
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [excelProducts, setExcelProducts] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  /* -------------------------
     COMMON HELPERS
  -------------------------- */
  const addProduct = (name) => {
    if (selectedProducts.includes(name)) return;
    setSelectedProducts([...selectedProducts, name]);
  };

  const removeProduct = (name) => {
    setSelectedProducts(selectedProducts.filter(p => p !== name));
  };

  const handleComplete = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product");
      return;
    }
    
    navigate("/analysis", {
      state: {
        mode,
        products: selectedProducts,
        fileName: uploadedFileName,
      },
    });
  };

  /* -------------------------
     EXCEL IMPORT (BIG STORE)
  -------------------------- */
  const handleExcelUpload = (file) => {
    if (!file) return;
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const names = new Set();
      rows.forEach(row => {
        row.forEach(cell => {
          if (typeof cell === "string" && cell.trim().length > 1) {
            names.add(cell.trim());
          }
        });
      });

      setExcelProducts([...names]);
    };
    reader.readAsArrayBuffer(file);
  };


  /* -------------------------
     UI
  -------------------------- */
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-yellow-400 text-gray-900 p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-black flex items-center gap-3">
            Get Your Store Ready
          </h1>
          <p className="text-gray-800 mt-2 text-lg">
            Let's set up your products the way that works for you
          </p>
        </div>

        {/* MODE SELECT */}
        {!mode && (
          <div className="grid md:grid-cols-2 gap-6">
            <ModeCard
              icon={<Store size={40} />}
              title="Small Store"
              desc="Manual product selection"
              onClick={() => setMode("small")}
            />
            <ModeCard
              icon={<Building2 size={40} />}
              title="Large Store"
              desc="Import from Excel"
              onClick={() => setMode("large")}
            />
          </div>
        )}

        {/* SMALL STORE FLOW */}
        {mode === "small" && (
          <>
            <Section title="What do you sell?">
              <div className="flex flex-wrap gap-3">
                {Object.keys(SMALL_STORE_CATEGORIES).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg border-2 font-semibold transition ${
                      activeCategory === cat
                        ? "bg-yellow-400 text-gray-900 border-yellow-400"
                        : "bg-white text-gray-700 border-gray-200 hover:border-yellow-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Section>

            {activeCategory && (
              <Section title="Select Products">
                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                  {SMALL_STORE_CATEGORIES[activeCategory].map(p => (
                    <Chip
                      key={p}
                      label={p}
                      active={selectedProducts.includes(p)}
                      onClick={() => addProduct(p)}
                    />
                  ))}
                </div>
              </Section>
            )}
          </>
        )}

        {/* LARGE STORE FLOW */}
        {mode === "large" && (
          <>
            <Section title="Import Inventory Excel">
              <label className="border-2 border-dashed border-indigo-300 rounded-2xl p-8 flex flex-col items-center cursor-pointer bg-white">
                <UploadCloud size={40} className="text-indigo-500 mb-2" />
                <span>Upload Excel File</span>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  hidden
                  onChange={(e) => handleExcelUpload(e.target.files[0])}
                />
              </label>
            </Section>

            {excelProducts.length > 0 && (
              <Section title="Detected Products">
                <div className="flex flex-wrap gap-2">
                  {excelProducts.map(p => (
                    <Chip
                      key={p}
                      label={p}
                      active={selectedProducts.includes(p)}
                      onClick={() => addProduct(p)}
                    />
                  ))}
                </div>
              </Section>
            )}
          </>
        )}

        {/* SELECTED PRODUCTS */}
        {(mode === "small" || mode === "large") && (
          <>
            <Section title="Your Selected Products">
              {selectedProducts.length === 0 ? (
                <p className="text-slate-500">No products selected yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedProducts.map(p => (
                    <Chip
                      key={p}
                      label={`${p} ✕`}
                      active
                      onClick={() => removeProduct(p)}
                    />
                  ))}
                </div>
              )}
            </Section>

            {/* COMPLETION BUTTON */}
            {selectedProducts.length > 0 && (
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Ready to Analyze?</h3>
                  <p className="text-indigo-100 text-sm mt-1">
                    {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected • {mode === 'small' ? 'Manual' : 'Excel'} mode
                  </p>
                </div>
                <button
                  onClick={handleComplete}
                  className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-black hover:shadow-lg transition flex items-center gap-2"
                >
                  Complete Setup <ArrowRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* -------------------------
   SMALL COMPONENTS
-------------------------- */

function Section({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <h2 className="text-xl font-black text-gray-900 mb-6">{title}</h2>
      {children}
    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
        active
          ? "bg-yellow-400 text-gray-900 font-bold"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

function ModeCard({ icon, title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-yellow-400 transition text-left"
    >
      <div className="mb-4 text-yellow-500">{icon}</div>
      <h3 className="text-2xl font-black text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm font-medium">{desc}</p>
    </button>
  );
}
