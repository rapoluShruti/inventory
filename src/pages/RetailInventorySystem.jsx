import React, { useState, useMemo } from "react";
import {
  Package,
  AlertTriangle,
  TrendingDown,
  ShoppingCart,
  FileText,
  CheckCircle,
  XCircle,
  Send,
  Truck,
  Upload,
  Camera,
  X,
  MapPin,
  Database,
  RefreshCw,
  Printer,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  DollarSign,
  TrendingUp,
  Box,
  Warehouse,
  ClipboardList,
} from "lucide-react";

export default function InventoryManagementSystem() {
  const [view, setView] = useState("dashboard");

  // ===========================
  // MASTER DATA
  // ===========================
  
  // Products/Materials
  const [products, setProducts] = useState([
    {
      id: "P001",
      name: "Rice - Basmati (25kg)",
      category: "Groceries",
      unit: "bags",
      hsnCode: "1006",
      gstRate: 5,
      minStock: 50,
      reorderQty: 100,
      costPrice: 1200,
      sellingPrice: 1500,
    },
    {
      id: "P002",
      name: "Cooking Oil - Sunflower (15L)",
      category: "Groceries",
      unit: "cans",
      hsnCode: "1512",
      gstRate: 18,
      minStock: 30,
      reorderQty: 60,
      costPrice: 1800,
      sellingPrice: 2100,
    },
    {
      id: "P003",
      name: "Sugar - White (50kg)",
      category: "Groceries",
      unit: "bags",
      hsnCode: "1701",
      gstRate: 5,
      minStock: 40,
      reorderQty: 80,
      costPrice: 2200,
      sellingPrice: 2500,
    },
    {
      id: "P004",
      name: "Wheat Flour (25kg)",
      category: "Groceries",
      unit: "bags",
      hsnCode: "1101",
      gstRate: 5,
      minStock: 60,
      reorderQty: 120,
      costPrice: 800,
      sellingPrice: 950,
    },
    {
      id: "P005",
      name: "Milk Powder (1kg)",
      category: "Dairy",
      unit: "packets",
      hsnCode: "0402",
      gstRate: 12,
      minStock: 100,
      reorderQty: 200,
      costPrice: 450,
      sellingPrice: 550,
    },
    {
      id: "P006",
      name: "Tea Leaves - Premium (500g)",
      category: "Beverages",
      unit: "packets",
      hsnCode: "0902",
      gstRate: 12,
      minStock: 80,
      reorderQty: 150,
      costPrice: 320,
      sellingPrice: 400,
    },
    {
      id: "P007",
      name: "Coffee Powder (500g)",
      category: "Beverages",
      unit: "packets",
      hsnCode: "0901",
      gstRate: 12,
      minStock: 50,
      reorderQty: 100,
      costPrice: 380,
      sellingPrice: 480,
    },
    {
      id: "P008",
      name: "Biscuits - Cream (200g)",
      category: "Snacks",
      unit: "boxes",
      hsnCode: "1905",
      gstRate: 18,
      minStock: 200,
      reorderQty: 400,
      costPrice: 45,
      sellingPrice: 60,
    },
  ]);

  // Vendors
  const [vendors, setVendors] = useState([
    {
      id: "V001",
      name: "Wholesale Grocers Ltd",
      gstin: "27AAAAA0000A1Z5",
      state: "Maharashtra",
      phone: "+91 98765 00001",
      email: "wholesale@grocers.com",
      category: "Groceries",
      rating: 4.5,
    },
    {
      id: "V002",
      name: "Dairy Products Suppliers",
      gstin: "27BBBBB0000B1Z5",
      state: "Maharashtra",
      phone: "+91 98765 00002",
      email: "dairy@suppliers.com",
      category: "Dairy",
      rating: 4.8,
    },
    {
      id: "V003",
      name: "Beverage Distributors Inc",
      gstin: "27CCCCC0000C1Z5",
      state: "Maharashtra",
      phone: "+91 98765 00003",
      email: "info@beveragedist.com",
      category: "Beverages",
      rating: 4.3,
    },
  ]);

  // Projects/Stores
  const [projects, setProjects] = useState([
    {
      id: "STORE001",
      name: "Main Store - Mumbai Central",
      location: "Mumbai Central, Maharashtra",
      type: "Retail Store",
      manager: "Rajesh Kumar",
    },
    {
      id: "STORE002",
      name: "Branch Store - Andheri",
      location: "Andheri West, Maharashtra",
      type: "Retail Store",
      manager: "Priya Sharma",
    },
    {
      id: "WAREHOUSE001",
      name: "Central Warehouse",
      location: "Bhiwandi, Maharashtra",
      type: "Warehouse",
      manager: "Amit Patel",
    },
  ]);

  // ===========================
  // INVENTORY STATE
  // ===========================
  const [inventory, setInventory] = useState(() => {
    const inv = {};
    products.forEach((p) => {
      inv[p.id] = {
        productId: p.id,
        openingStock: Math.floor(Math.random() * 150) + 20,
        received: 0,
        sold: 0,
        damaged: 0,
        projectId: "STORE001",
      };
    });
    
    // Make some products low stock
    inv["P001"].openingStock = 35; // Low
    inv["P003"].openingStock = 25; // Low
    inv["P005"].openingStock = 75; // Low
    inv["P008"].openingStock = 150; // Low
    
    return inv;
  });

  const getAvailableStock = (productId, projectId = "STORE001") => {
    const inv = inventory[productId];
    if (!inv || inv.projectId !== projectId) return 0;
    return (inv.openingStock || 0) + (inv.received || 0) - (inv.sold || 0) - (inv.damaged || 0);
  };

  const isLowStock = (productId) => {
    const product = products.find((p) => p.id === productId);
    const available = getAvailableStock(productId);
    return available <= (product?.minStock || 0);
  };

  // ===========================
  // REORDER CART
  // ===========================
  const [reorderCart, setReorderCart] = useState([]);

  const addToReorderCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existing = reorderCart.find((item) => item.productId === productId);
    if (existing) {
      alert("Product already in reorder cart");
      return;
    }

    setReorderCart((prev) => [
      ...prev,
      {
        productId: product.id,
        productName: product.name,
        quantity: product.reorderQty,
        unit: product.unit,
        costPrice: product.costPrice,
        gstRate: product.gstRate,
        hsnCode: product.hsnCode,
      },
    ]);
  };

  const updateReorderQty = (productId, qty) => {
    setReorderCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.max(0, Number(qty || 0)) } : item
      )
    );
  };

  const removeFromReorderCart = (productId) => {
    setReorderCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  // ===========================
  // PURCHASE ORDERS
  // ===========================
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const createPOFromCart = () => {
    if (reorderCart.length === 0) {
      alert("Reorder cart is empty");
      return;
    }

    const hasZeroQty = reorderCart.some((item) => item.quantity <= 0);
    if (hasZeroQty) {
      alert("Remove items with zero quantity");
      return;
    }

    const poNumber = `PO-${Date.now().toString().slice(-8)}`;
    const po = {
      id: `PO-${Date.now()}`,
      poNumber,
      projectId: "STORE001",
      projectName: "Main Store - Mumbai Central",
      vendorId: "",
      vendor: null,
      items: reorderCart.map((item) => ({ ...item })),
      status: "draft",
      createdAt: new Date().toISOString(),
      createdBy: "Store Manager",
      sentAt: null,
      receivedAt: null,
    };

    setPurchaseOrders((prev) => [po, ...prev]);
    setReorderCart([]);
    setView("purchase-orders");
    alert(`Purchase Order created: ${poNumber}`);
  };

  const updatePOVendor = (poId, vendorId) => {
    setPurchaseOrders((prev) =>
      prev.map((po) => {
        if (po.id === poId) {
          const vendor = vendors.find((v) => v.id === vendorId);
          return { ...po, vendorId, vendor };
        }
        return po;
      })
    );
  };

  const sendPOToVendor = (poId) => {
    setPurchaseOrders((prev) =>
      prev.map((po) => {
        if (po.id === poId) {
          if (!po.vendorId) {
            alert("Please select a vendor first");
            return po;
          }
          return {
            ...po,
            status: "sent",
            sentAt: new Date().toISOString(),
          };
        }
        return po;
      })
    );
    alert("PO sent to vendor successfully!");
  };

  // ===========================
  // MATERIAL RECEIVING
  // ===========================
  const [selectedPO, setSelectedPO] = useState(null);
  const [receivingMethod, setReceivingMethod] = useState(null); // "bill", "manual", "barcode"
  const [receivingData, setReceivingData] = useState({
    receivedItems: [],
    photos: [],
    gpsVerified: false,
    gpsData: null,
    invoiceFile: null,
  });
  const [manualReceipt, setManualReceipt] = useState({ productName: "", quantity: "", productId: "" });
  const [barcodeInput, setBarcodeInput] = useState("");
  const [scannedItems, setScannedItems] = useState([]);

  const startReceiving = (po) => {
    setSelectedPO(po);
    setReceivingMethod(null);
    setScannedItems([]);
    setManualReceipt({ productName: "", quantity: "", productId: "" });
    setBarcodeInput("");
    setReceivingData({
      receivedItems: po.items.map((item) => ({
        ...item,
        receivedQty: item.quantity,
        damagedQty: 0,
      })),
      photos: [],
      gpsVerified: false,
      gpsData: null,
      invoiceFile: null,
    });
  };

  const handleBarcodeClick = (productId) => {
    const product = selectedPO.items.find((item) => item.productId === productId);
    if (!product) return;

    setScannedItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, scannedQty: item.scannedQty + 1 }
            : item
        );
      } else {
        return [...prev, { productId, productName: product.productName, scannedQty: 1 }];
      }
    });

    // Auto-update stock
    setReceivingData((prev) => ({
      ...prev,
      receivedItems: prev.receivedItems.map((item) =>
        item.productId === productId
          ? { ...item, receivedQty: item.receivedQty + 1 }
          : item
      ),
    }));
  };

  const handleManualAdd = () => {
    if (!manualReceipt.productName || !manualReceipt.quantity) {
      alert("Please enter product name and quantity");
      return;
    }

    const qty = parseInt(manualReceipt.quantity) || 0;
    if (qty <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    // Auto-update stock
    setReceivingData((prev) => ({
      ...prev,
      receivedItems: prev.receivedItems.map((item) =>
        item.productName.toLowerCase().includes(manualReceipt.productName.toLowerCase())
          ? { ...item, receivedQty: item.receivedQty + qty }
          : item
      ),
    }));

    setManualReceipt({ productName: "", quantity: "", productId: "" });
    alert(`Added ${qty} units of ${manualReceipt.productName}`);
  };

  const handleOCRUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate OCR - in real scenario, send to backend for actual OCR
    alert("📸 Processing bill with OCR...\n✓ Detected 5 items automatically!\nYou can review and adjust quantities below.");
    
    // Simulate OCR result - auto-fill quantities
    setReceivingData((prev) => ({
      ...prev,
      receivedItems: prev.receivedItems.map((item) => ({
        ...item,
        receivedQty: item.quantity, // Auto-fill from bill
      })),
      invoiceFile: {
        name: file.name,
        url: URL.createObjectURL(file),
      },
    }));
  };

  const updateReceivedQty = (productId, qty) => {
    setReceivingData((prev) => ({
      ...prev,
      receivedItems: prev.receivedItems.map((item) =>
        item.productId === productId ? { ...item, receivedQty: Math.max(0, Number(qty || 0)) } : item
      ),
    }));
  };

  const updateDamagedQty = (productId, qty) => {
    setReceivingData((prev) => ({
      ...prev,
      receivedItems: prev.receivedItems.map((item) =>
        item.productId === productId ? { ...item, damagedQty: Math.max(0, Number(qty || 0)) } : item
      ),
    }));
  };

  const confirmReceivingQuick = () => {
    // Update inventory with received quantities
    receivingData.receivedItems.forEach((item) => {
      if (item.receivedQty > 0) {
        setInventory((prev) => {
          const inv = prev[item.productId] || {
            productId: item.productId,
            openingStock: 0,
            received: 0,
            sold: 0,
            damaged: 0,
            projectId: selectedPO.projectId,
          };

          return {
            ...prev,
            [item.productId]: {
              ...inv,
              received: (inv.received || 0) + item.receivedQty,
              damaged: (inv.damaged || 0) + (item.damagedQty || 0),
            },
          };
        });
      }
    });

    // Update PO to received
    setPurchaseOrders((prev) =>
      prev.map((po) => {
        if (po.id === selectedPO.id) {
          return {
            ...po,
            status: "received",
            receivedAt: new Date().toISOString(),
            receivingData,
          };
        }
        return po;
      })
    );

    alert("✓ Material received successfully!");
    setSelectedPO(null);
    setReceivingMethod(null);
    setScannedItems([]);
    setReceivingData({
      receivedItems: [],
      photos: [],
      gpsVerified: false,
      gpsData: null,
      invoiceFile: null,
    });
    setView("purchase-orders");
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((file) => URL.createObjectURL(file));
    setReceivingData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...urls],
    }));
  };

  const removePhoto = (index) => {
    setReceivingData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const verifyGPS = () => {
    const gps = {
      lat: 19.076 + (Math.random() - 0.5) * 0.01,
      lng: 72.8777 + (Math.random() - 0.5) * 0.01,
      accuracy: Math.floor(10 + Math.random() * 20),
      timestamp: new Date().toISOString(),
    };
    setReceivingData((prev) => ({
      ...prev,
      gpsVerified: true,
      gpsData: gps,
    }));
  };

  const handleInvoiceUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReceivingData((prev) => ({
      ...prev,
      invoiceFile: {
        name: file.name,
        url: URL.createObjectURL(file),
      },
    }));
  };

  const confirmReceiving = () => {
    if (!receivingData.gpsVerified) {
      alert("GPS verification required");
      return;
    }
    if (receivingData.photos.length === 0) {
      alert("Upload at least one photo");
      return;
    }
    if (!receivingData.invoiceFile) {
      alert("Upload vendor invoice");
      return;
    }

    // Update inventory
    receivingData.receivedItems.forEach((item) => {
      setInventory((prev) => {
        const inv = prev[item.productId] || {
          productId: item.productId,
          openingStock: 0,
          received: 0,
          sold: 0,
          damaged: 0,
          projectId: selectedPO.projectId,
        };

        return {
          ...prev,
          [item.productId]: {
            ...inv,
            received: (inv.received || 0) + item.receivedQty,
            damaged: (inv.damaged || 0) + item.damagedQty,
          },
        };
      });
    });

    // Update PO
    setPurchaseOrders((prev) =>
      prev.map((po) => {
        if (po.id === selectedPO.id) {
          return {
            ...po,
            status: "received",
            receivedAt: new Date().toISOString(),
            receivingData,
          };
        }
        return po;
      })
    );

    alert("Material received successfully!");
    setSelectedPO(null);
    setReceivingData({
      receivedItems: [],
      photos: [],
      gpsVerified: false,
      gpsData: null,
      invoiceFile: null,
    });
    setView("purchase-orders");
  };

  // ===========================
  // INVOICING & TALLY
  // ===========================
  const [invoices, setInvoices] = useState([]);
  const [tallyLogs, setTallyLogs] = useState([]);
  const [showTallyModal, setShowTallyModal] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);

  const generateInvoiceFromPO = (po) => {
    if (!po.receivingData) {
      alert("PO must be received first");
      return;
    }

    const items = po.receivingData.receivedItems.map((item) => {
      const amount = item.receivedQty * item.costPrice;
      const gstAmount = (amount * item.gstRate) / 100;
      return {
        productId: item.productId,
        productName: item.productName,
        quantity: item.receivedQty,
        unit: item.unit,
        rate: item.costPrice,
        hsnCode: item.hsnCode,
        taxableAmount: amount,
        gstRate: item.gstRate,
        cgst: gstAmount / 2,
        sgst: gstAmount / 2,
        totalAmount: amount + gstAmount,
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.taxableAmount, 0);
    const totalGST = items.reduce((sum, item) => sum + item.cgst + item.sgst, 0);
    const grandTotal = items.reduce((sum, item) => sum + item.totalAmount, 0);

    const invoice = {
      id: `INV-${Date.now()}`,
      invoiceNo: `INV-2026-${String(invoices.length + 1).padStart(4, "0")}`,
      poId: po.id,
      poNumber: po.poNumber,
      vendor: po.vendor,
      projectId: po.projectId,
      projectName: po.projectName,
      date: new Date().toISOString().split("T")[0],
      items,
      subtotal: Number(subtotal.toFixed(2)),
      totalGST: Number(totalGST.toFixed(2)),
      grandTotal: Number(grandTotal.toFixed(2)),
      tallySynced: false,
      tallyVoucherId: null,
      createdAt: new Date().toISOString(),
    };

    setInvoices((prev) => [invoice, ...prev]);
    setView("invoices");
    alert(`Invoice generated: ${invoice.invoiceNo}`);
  };

  const syncInvoiceToTally = (invoiceId) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId);
    if (!invoice) return;

    setSyncInProgress(true);

    setTimeout(() => {
      const voucherId = `TALLY-VCHR-${Date.now()}`;

      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === invoiceId
            ? {
                ...inv,
                tallySynced: true,
                tallyVoucherId: voucherId,
              }
            : inv
        )
      );

      setTallyLogs((prev) => [
        {
          id: `TL-${Date.now()}`,
          invoiceId: invoice.id,
          invoiceNo: invoice.invoiceNo,
          voucherId,
          syncedAt: new Date().toISOString(),
        },
        ...prev,
      ]);

      setSyncInProgress(false);
      alert(`Synced to Tally! Voucher: ${voucherId}`);
    }, 1500);
  };

  // ===========================
  // ANALYTICS
  // ===========================
  const analytics = useMemo(() => {
    const totalProducts = products.length;
    const lowStockCount = products.filter((p) => isLowStock(p.id)).length;
    const totalInventoryValue = products.reduce((sum, p) => {
      const stock = getAvailableStock(p.id);
      return sum + stock * p.costPrice;
    }, 0);
    const pendingPOs = purchaseOrders.filter((po) => po.status === "sent").length;

    return {
      totalProducts,
      lowStockCount,
      totalInventoryValue,
      pendingPOs,
    };
  }, [products, inventory, purchaseOrders]);

  // ===========================
  // BARCODE GENERATOR
  // ===========================
  const generateBarcode = (text) => {
    const chars = String(text).split("");
    return (
      <svg width="260" height="70" className="mx-auto max-w-full">
        {chars.map((char, i) => {
          const width = !isNaN(char) ? 7 : 4;
          return (
            <rect
              key={i}
              x={i * 9}
              y="0"
              width={width}
              height="50"
              fill={i % 2 === 0 ? "#000" : "#333"}
            />
          );
        })}
        <text x="130" y="66" textAnchor="middle" fontSize="10" fill="#000">
          {text}
        </text>
      </svg>
    );
  };

  // ===========================
  // VIEWS
  // ===========================

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Package size={24} className="text-blue-600" />}
          label="Total Products"
          value={analytics.totalProducts}
          color="blue"
        />
        <StatCard
          icon={<AlertTriangle size={24} className="text-red-600" />}
          label="Low Stock Items"
          value={analytics.lowStockCount}
          color="red"
        />
        <StatCard
          icon={<DollarSign size={24} className="text-green-600" />}
          label="Inventory Value"
          value={`₹${(analytics.totalInventoryValue / 100000).toFixed(1)}L`}
          color="green"
        />
        <StatCard
          icon={<ShoppingCart size={24} className="text-orange-600" />}
          label="Pending POs"
          value={analytics.pendingPOs}
          color="orange"
        />
      </div>

      {/* Low Stock Alert */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={28} className="text-red-600" />
          <div>
            <h3 className="text-xl font-bold text-red-900">Low Stock Alert</h3>
            <p className="text-sm text-red-700">Items below minimum stock level</p>
          </div>
        </div>

        {products.filter((p) => isLowStock(p.id)).length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle size={48} className="mx-auto mb-3 text-green-500" />
            <p className="text-gray-600 font-medium">All products are well stocked</p>
          </div>
        ) : (
          <div className="space-y-3">
            {products
              .filter((p) => isLowStock(p.id))
              .map((product) => {
                const available = getAvailableStock(product.id);
                const inCart = reorderCart.some((item) => item.productId === product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border border-red-200 p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{product.name}</h4>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm">
                          <span className="text-gray-600">
                            Available: <span className="font-bold text-red-600">{available}</span>
                          </span>
                          <span className="text-gray-600">
                            Min Stock: <span className="font-bold">{product.minStock}</span>
                          </span>
                          <span className="text-gray-600">
                            Reorder Qty: <span className="font-bold text-green-600">{product.reorderQty}</span>
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => addToReorderCart(product.id)}
                        disabled={inCart}
                        className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${
                          inCart
                            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                            : "bg-orange-600 text-white hover:bg-orange-700"
                        }`}
                      >
                        {inCart ? (
                          <>
                            <CheckCircle size={16} /> In Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} /> Add to Reorder
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickActionCard
          icon={<ClipboardList size={32} className="text-blue-600" />}
          title="View Inventory"
          description="Check all stock levels"
          onClick={() => setView("inventory")}
        />
        <QuickActionCard
          icon={<ShoppingCart size={32} className="text-orange-600" />}
          title="Reorder Cart"
          description={`${reorderCart.length} items in cart`}
          onClick={() => setView("reorder-cart")}
        />
        <QuickActionCard
          icon={<FileText size={32} className="text-green-600" />}
          title="Purchase Orders"
          description={`${purchaseOrders.length} total POs`}
          onClick={() => setView("purchase-orders")}
        />
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <Warehouse size={28} className="text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
            <p className="text-sm text-gray-600 mt-1">Track opening stock, received, sold, and available quantities</p>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Product</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase">Category</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase">Opening Stock</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase">Received</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase">Sold</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase">Damaged</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase">Available</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase">Min Stock</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase">Status</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => {
                const inv = inventory[product.id] || {
                  openingStock: 0,
                  received: 0,
                  sold: 0,
                  damaged: 0,
                };
                const available = getAvailableStock(product.id);
                const low = isLowStock(product.id);
                const inCart = reorderCart.some((item) => item.productId === product.id);

                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        HSN: {product.hsnCode} • GST: {product.gstRate}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-sm text-gray-900">
                      {inv.openingStock}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-sm text-green-600 font-medium">
                      {inv.received}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-sm text-blue-600 font-medium">
                      {inv.sold}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-sm text-red-600 font-medium">
                      {inv.damaged}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`font-mono text-lg font-bold ${
                          low ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {available}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-sm text-gray-600">
                      {product.minStock}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {low ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase">
                          <TrendingDown size={14} /> Low
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase">
                          <CheckCircle size={14} /> OK
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => addToReorderCart(product.id)}
                        disabled={inCart}
                        className={`px-3 py-1.5 rounded text-xs font-bold uppercase ${
                          inCart
                            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                            : "bg-orange-600 text-white hover:bg-orange-700"
                        }`}
                      >
                        {inCart ? "In Cart" : "Reorder"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {products.map((product) => {
          const inv = inventory[product.id] || {
            openingStock: 0,
            received: 0,
            sold: 0,
            damaged: 0,
          };
          const available = getAvailableStock(product.id);
          const low = isLowStock(product.id);
          const inCart = reorderCart.some((item) => item.productId === product.id);

          return (
            <div
              key={product.id}
              className={`bg-white rounded-lg border-2 p-4 ${
                low ? "border-red-300" : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.category} • HSN: {product.hsnCode}
                  </p>
                </div>
                {low ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase">
                    <TrendingDown size={14} /> Low
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase">
                    <CheckCircle size={14} /> OK
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <InfoBox label="Opening" value={inv.openingStock} />
                <InfoBox label="Received" value={inv.received} color="green" />
                <InfoBox label="Sold" value={inv.sold} color="blue" />
                <InfoBox label="Damaged" value={inv.damaged} color="red" />
                <InfoBox label="Available" value={available} highlight={low} />
                <InfoBox label="Min Stock" value={product.minStock} />
              </div>

              <button
                onClick={() => addToReorderCart(product.id)}
                disabled={inCart}
                className={`w-full px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 ${
                  inCart
                    ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                    : "bg-orange-600 text-white hover:bg-orange-700"
                }`}
              >
                {inCart ? (
                  <>
                    <CheckCircle size={16} /> In Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} /> Add to Reorder
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderReorderCart = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart size={28} className="text-orange-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Reorder Cart</h2>
              <p className="text-sm text-gray-600 mt-1">
                {reorderCart.length} items • Ready to create PO
              </p>
            </div>
          </div>

          {reorderCart.length > 0 && (
            <button
              onClick={createPOFromCart}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 flex items-center gap-2"
            >
              <FileText size={18} /> Create PO
            </button>
          )}
        </div>
      </div>

      {reorderCart.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600 font-medium mb-2">Your reorder cart is empty</p>
          <p className="text-sm text-gray-500">Add low stock items to create a purchase order</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">Product</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase">Quantity</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase">Unit</th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase">Cost Price</th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase">Total</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reorderCart.map((item) => {
                  const total = item.quantity * item.costPrice;
                  return (
                    <tr key={item.productId} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{item.productName}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          HSN: {item.hsnCode} • GST: {item.gstRate}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateReorderQty(item.productId, e.target.value)}
                          className="w-24 px-3 py-2 border border-gray-300 rounded text-center font-mono"
                          min={0}
                        />
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {item.unit}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-gray-900">
                        ₹{item.costPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">
                        ₹{total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => removeFromReorderCart(item.productId)}
                          className="px-3 py-1.5 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-right font-bold text-gray-900">
                    CART TOTAL:
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-xl text-orange-600">
                    ₹
                    {reorderCart
                      .reduce((sum, item) => sum + item.quantity * item.costPrice, 0)
                      .toFixed(2)}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderPurchaseOrders = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <FileText size={28} className="text-green-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Purchase Orders</h2>
            <p className="text-sm text-gray-600 mt-1">Manage all purchase orders</p>
          </div>
        </div>
      </div>

      {purchaseOrders.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileText size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600 font-medium">No purchase orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {purchaseOrders.map((po) => (
            <div key={po.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{po.poNumber}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Created: {new Date(po.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Project: {po.projectName}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={po.status} />
                  </div>
                </div>

                {po.status === "draft" && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Vendor
                    </label>
                    <select
                      value={po.vendorId || ""}
                      onChange={(e) => updatePOVendor(po.id, e.target.value)}
                      className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">-- Select Vendor --</option>
                      {vendors.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} - {v.category}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {po.vendor && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <InfoBox label="Vendor" value={po.vendor.name} />
                      <InfoBox label="GSTIN" value={po.vendor.gstin} />
                      <InfoBox label="Phone" value={po.vendor.phone} />
                    </div>
                  </div>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                        Product
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">
                        Unit
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase">
                        Rate
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {po.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.productName}</td>
                        <td className="px-6 py-4 text-center font-mono text-sm text-gray-900">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-700">
                          {item.unit}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-sm text-gray-900">
                          ₹{item.costPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-sm text-gray-900">
                          ₹{(item.quantity * item.costPrice).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3">
                  {po.status === "draft" && (
                    <button
                      onClick={() => sendPOToVendor(po.id)}
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <Send size={18} /> Send to Vendor
                    </button>
                  )}

                  {po.status === "sent" && (
                    <button
                      onClick={() => startReceiving(po)}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Truck size={18} /> Receive Material
                    </button>
                  )}

                  {po.status === "received" && (
                    <button
                      onClick={() => generateInvoiceFromPO(po)}
                      className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 flex items-center justify-center gap-2"
                    >
                      <FileText size={18} /> Generate Invoice
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Receiving Modal */}
      {selectedPO && !receivingMethod && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="border-b border-gray-200 p-6 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Receive Material</h3>
                <p className="text-sm text-gray-600 mt-1">PO: {selectedPO.poNumber}</p>
              </div>
              <button
                onClick={() => setSelectedPO(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-600 font-medium">Choose receiving method:</p>
              
              {/* SMALL SHOP OPTIONS */}
              <div className="space-y-3">
                <button
                  onClick={() => setReceivingMethod("bill")}
                  className="w-full p-4 border-2 border-blue-300 rounded-lg hover:bg-blue-50 transition text-left"
                >
                  <div className="font-bold text-gray-900">📋 Upload Bill (OCR Auto-Detection)</div>
                  <div className="text-sm text-gray-600 mt-1">Upload bill photo • AI extracts items & quantities</div>
                </button>

                <button
                  onClick={() => setReceivingMethod("manual")}
                  className="w-full p-4 border-2 border-green-300 rounded-lg hover:bg-green-50 transition text-left"
                >
                  <div className="font-bold text-gray-900">✏️ Manual Entry</div>
                  <div className="text-sm text-gray-600 mt-1">Enter product name & quantity manually</div>
                </button>
              </div>

              {/* LARGE SHOP OPTIONS */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => setReceivingMethod("barcode")}
                  className="w-full p-4 border-2 border-purple-300 rounded-lg hover:bg-purple-50 transition text-left"
                >
                  <div className="font-bold text-gray-900">📱 Barcode Scanner</div>
                  <div className="text-sm text-gray-600 mt-1">Scan products • Stock updates instantly</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SMALL SHOP - BILL UPLOAD WITH OCR */}
      {selectedPO && receivingMethod === "bill" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">📋 Upload Vendor Bill</h3>
                <p className="text-sm text-gray-600 mt-1">Upload bill • OCR will auto-detect items</p>
              </div>
              <button
                onClick={() => {
                  setSelectedPO(null);
                  setReceivingMethod(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Bill Upload */}
              <div className="border border-gray-200 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleOCRUpload}
                  className="hidden"
                  id="bill-upload"
                />
                <label
                  htmlFor="bill-upload"
                  className="block cursor-pointer bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:bg-blue-100"
                >
                  <Upload className="mx-auto mb-2 text-blue-600" size={32} />
                  <p className="text-sm text-blue-600 font-medium">Click to upload bill photo</p>
                  <p className="text-xs text-gray-500 mt-1">AI will auto-detect items & quantities</p>
                </label>

                {receivingData.invoiceFile && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-green-800 font-medium">✓ {receivingData.invoiceFile.name}</span>
                  </div>
                )}
              </div>

              {/* Auto-Detected Items */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-bold text-gray-900 uppercase text-sm">Auto-Detected Items</h4>
                </div>
                <div className="p-4">
                  {receivingData.receivedItems.length === 0 ? (
                    <p className="text-gray-500 text-sm">Upload bill first to see detected items</p>
                  ) : (
                    <div className="space-y-3">
                      {receivingData.receivedItems.map((item) => (
                        <div key={item.productId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{item.productName}</p>
                            <p className="text-xs text-gray-600">Detected Qty: {item.quantity}</p>
                          </div>
                          <input
                            type="number"
                            value={item.receivedQty}
                            onChange={(e) => updateReceivedQty(item.productId, e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-center font-mono"
                            min={0}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedPO(null);
                    setReceivingMethod(null);
                    confirmReceivingQuick();
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                >
                  Confirm & Complete
                </button>
                <button
                  onClick={() => setReceivingMethod(null)}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SMALL SHOP - MANUAL ENTRY */}
      {selectedPO && receivingMethod === "manual" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">✏️ Manual Entry</h3>
                <p className="text-sm text-gray-600 mt-1">Enter product name & quantity received</p>
              </div>
              <button
                onClick={() => {
                  setSelectedPO(null);
                  setReceivingMethod(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Input Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Rice, Oil, Sugar..."
                    value={manualReceipt.productName}
                    onChange={(e) => setManualReceipt({ ...manualReceipt, productName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Received</label>
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    value={manualReceipt.quantity}
                    onChange={(e) => setManualReceipt({ ...manualReceipt, quantity: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    min={0}
                  />
                </div>
                <button
                  onClick={handleManualAdd}
                  className="w-full px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                >
                  Add Item
                </button>
              </div>

              {/* Added Items */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-bold text-gray-900 uppercase text-sm">Items to Receive</h4>
                </div>
                <div className="p-4">
                  {receivingData.receivedItems.length === 0 ? (
                    <p className="text-gray-500 text-sm">No items added yet</p>
                  ) : (
                    <div className="space-y-2">
                      {receivingData.receivedItems.map((item) => (
                        <div key={item.productId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="font-medium text-gray-900">{item.productName}</span>
                          <span className="text-blue-600 font-bold">{item.receivedQty} units</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedPO(null);
                    setReceivingMethod(null);
                    confirmReceivingQuick();
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                >
                  Confirm & Complete
                </button>
                <button
                  onClick={() => setReceivingMethod(null)}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LARGE SHOP - BARCODE SCANNER */}
      {selectedPO && receivingMethod === "barcode" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">📱 Barcode Scanner</h3>
                <p className="text-sm text-gray-600 mt-1">Click "Scan" on products • Stock updates instantly</p>
              </div>
              <button
                onClick={() => {
                  setSelectedPO(null);
                  setReceivingMethod(null);
                  setScannedItems([]);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Scannable Products */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 uppercase text-sm">Products in PO</h4>
                <div className="grid gap-3 max-h-[40vh] overflow-y-auto">
                  {selectedPO.items.map((item) => (
                    <div key={item.productId} className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-bold text-gray-900">{item.productName}</p>
                          <p className="text-xs text-gray-600">PO Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-600">
                            {receivingData.receivedItems.find(i => i.productId === item.productId)?.receivedQty || 0}
                          </p>
                          <p className="text-xs text-gray-600">received</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleBarcodeClick(item.productId)}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 flex items-center justify-center gap-2"
                      >
                        📷 Scan
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scanned Summary */}
              {scannedItems.length > 0 && (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">✓ Scanned Items</h4>
                  <div className="space-y-1 text-sm">
                    {scannedItems.map((item) => (
                      <p key={item.productId} className="text-green-800">
                        {item.productName}: <span className="font-bold">{item.scannedQty} units</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedPO(null);
                    setReceivingMethod(null);
                    confirmReceivingQuick();
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:opacity-50"
                  disabled={scannedItems.length === 0}
                >
                  Complete Receiving
                </button>
                <button
                  onClick={() => setReceivingMethod(null)}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <FileText size={28} className="text-purple-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Invoices</h2>
            <p className="text-sm text-gray-600 mt-1">View and sync invoices to Tally</p>
          </div>
        </div>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileText size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600 font-medium">No invoices generated yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="bg-white border-2 border-gray-800 rounded-lg p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Database size={18} />
                  ACCOUNTING INTEGRATION
                  {invoice.tallySynced && (
                    <span className="ml-2 text-green-700">
                      ✓ Synced (Voucher: {invoice.tallyVoucherId})
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowTallyModal(true)}
                    className="px-4 py-2 bg-gray-700 text-white rounded text-xs font-bold uppercase"
                  >
                    View Logs
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-gray-900 text-white rounded text-xs font-bold uppercase flex items-center gap-2"
                  >
                    <Printer size={16} /> Print
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-extrabold tracking-wide">TAX INVOICE</h1>
                <p className="text-sm text-gray-600 mt-1">GST Compliant Invoice</p>
              </div>

              {/* Barcode */}
              <div className="flex justify-center mb-8">
                <div className="border border-gray-300 p-4 rounded w-full max-w-md">
                  <p className="text-xs text-gray-600 mb-2 font-semibold text-center">
                    INVOICE BARCODE
                  </p>
                  {generateBarcode(invoice.invoiceNo)}
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm mb-6">
                <div>
                  <p className="font-bold border-b pb-1 mb-2">VENDOR DETAILS</p>
                  <p className="font-semibold">{invoice.vendor?.name}</p>
                  <p>GSTIN: {invoice.vendor?.gstin}</p>
                  <p>State: {invoice.vendor?.state}</p>
                </div>

                <div className="sm:text-right">
                  <p className="font-bold border-b pb-1 mb-2">INVOICE DETAILS</p>
                  <p>
                    <strong>Invoice No:</strong> {invoice.invoiceNo}
                  </p>
                  <p>
                    <strong>PO No:</strong> {invoice.poNumber}
                  </p>
                  <p>
                    <strong>Date:</strong> {invoice.date}
                  </p>
                  <p>
                    <strong>Project:</strong> {invoice.projectName}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm min-w-[1000px]">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="border p-2 text-left">PRODUCT</th>
                      <th className="border p-2 text-center">HSN</th>
                      <th className="border p-2 text-center">QTY</th>
                      <th className="border p-2 text-center">UNIT</th>
                      <th className="border p-2 text-right">RATE</th>
                      <th className="border p-2 text-right">TAXABLE</th>
                      <th className="border p-2 text-center">GST%</th>
                      <th className="border p-2 text-right">CGST</th>
                      <th className="border p-2 text-right">SGST</th>
                      <th className="border p-2 text-right">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="border p-2">{item.productName}</td>
                        <td className="border p-2 text-center">{item.hsnCode}</td>
                        <td className="border p-2 text-center">{item.quantity}</td>
                        <td className="border p-2 text-center">{item.unit}</td>
                        <td className="border p-2 text-right">₹{item.rate.toFixed(2)}</td>
                        <td className="border p-2 text-right">₹{item.taxableAmount.toFixed(2)}</td>
                        <td className="border p-2 text-center">{item.gstRate}%</td>
                        <td className="border p-2 text-right">₹{item.cgst.toFixed(2)}</td>
                        <td className="border p-2 text-right">₹{item.sgst.toFixed(2)}</td>
                        <td className="border p-2 text-right font-semibold">
                          ₹{item.totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="border border-gray-800 p-4 w-full max-w-md">
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Subtotal (Taxable):</span>
                    <span>₹{invoice.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Total GST:</span>
                    <span>₹{invoice.totalGST.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-extrabold border-t pt-2">
                    <span>GRAND TOTAL:</span>
                    <span>₹{invoice.grandTotal.toFixed(2)}</span>
                  </div>

                  <button
                    disabled={syncInProgress || invoice.tallySynced}
                    onClick={() => syncInvoiceToTally(invoice.id)}
                    className={`mt-4 w-full py-2.5 rounded font-bold uppercase text-sm flex items-center justify-center gap-2 ${
                      syncInProgress
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : invoice.tallySynced
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-orange-600 text-white hover:bg-orange-700"
                    }`}
                  >
                    <RefreshCw size={16} />
                    {syncInProgress ? "Syncing..." : invoice.tallySynced ? "Synced ✅" : "Sync to Tally"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tally Logs Modal */}
      {showTallyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Tally Sync Logs</h3>
                <p className="text-sm text-gray-600 mt-1">All invoice sync attempts</p>
              </div>
              <button
                onClick={() => setShowTallyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {tallyLogs.length === 0 ? (
                <div className="text-center py-12">
                  <Database size={64} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 font-medium">No sync logs found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tallyLogs.map((log) => (
                    <div
                      key={log.id}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            Invoice: <span className="font-mono">{log.invoiceNo}</span>
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Synced: {new Date(log.syncedAt).toLocaleString()}
                          </p>
                        </div>

                        <div className="text-sm font-bold text-green-700">
                          ✅ SUCCESS • Voucher: <span className="font-mono">{log.voucherId}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ===========================
  // MAIN RENDER
  // ===========================
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg mb-6 p-6">
          <div className="flex items-center gap-3">
            <Warehouse size={36} className="text-white" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Inventory Management System
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                Complete stock management for small & large stores
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-gray-200">
            <TabButton
              label="Dashboard"
              active={view === "dashboard"}
              onClick={() => setView("dashboard")}
            />
            <TabButton
              label="Inventory"
              active={view === "inventory"}
              onClick={() => setView("inventory")}
            />
            <TabButton
              label={`Cart (${reorderCart.length})`}
              active={view === "reorder-cart"}
              onClick={() => setView("reorder-cart")}
            />
            <TabButton
              label={`POs (${purchaseOrders.length})`}
              active={view === "purchase-orders"}
              onClick={() => setView("purchase-orders")}
            />
            <TabButton
              label={`Invoices (${invoices.length})`}
              active={view === "invoices"}
              onClick={() => setView("invoices")}
            />
          </div>
        </div>

        {/* Content */}
        <div>
          {view === "dashboard" && renderDashboard()}
          {view === "inventory" && renderInventory()}
          {view === "reorder-cart" && renderReorderCart()}
          {view === "purchase-orders" && renderPurchaseOrders()}
          {view === "invoices" && renderInvoices()}
        </div>
      </div>
    </div>
  );
}

// ===========================
// HELPER COMPONENTS
// ===========================

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-3 text-sm font-medium transition-colors ${
        active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function StatCard({ icon, label, value, color = "blue" }) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    red: "from-red-500 to-red-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} rounded-lg shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between mb-3">
        {icon}
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
      </div>
      <div className="text-3xl font-extrabold font-mono mb-1">{value}</div>
      <div className="text-sm font-medium opacity-90">{label}</div>
    </div>
  );
}

function QuickActionCard({ icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all text-left"
    >
      {icon}
      <h3 className="font-bold text-gray-900 mt-3">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </button>
  );
}

function InfoBox({ label, value, color = "gray", highlight = false }) {
  const colors = {
    gray: "text-gray-900",
    green: "text-green-600",
    blue: "text-blue-600",
    red: "text-red-600",
  };

  return (
    <div
      className={`bg-gray-50 rounded-lg p-3 border ${
        highlight ? "border-red-300 bg-red-50" : "border-gray-200"
      }`}
    >
      <p className="text-xs text-gray-600 uppercase mb-1">{label}</p>
      <p className={`font-mono font-bold ${highlight ? "text-red-700" : colors[color]}`}>
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    draft: "bg-gray-100 text-gray-800",
    sent: "bg-blue-100 text-blue-800",
    received: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`inline-flex px-3 py-1 text-xs font-bold rounded-full uppercase ${
        styles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}