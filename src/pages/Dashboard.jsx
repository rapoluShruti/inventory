// import { useState } from 'react'
// import { Home, Tag, Bell, Package, FileText, Settings as SettingsIcon, Search, TrendingUp, TrendingDown, ArrowRight, Phone, Calendar, BarChart3, Percent, Clock, X, Check } from 'lucide-react'

// export default function GroceryDashboard() {
//   const [activeSection, setActiveSection] = useState('dashboard')

//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
//       <main className="flex-1 overflow-y-auto">
//         {activeSection === 'dashboard' && <Dashboard />}
//         {activeSection === 'clearance' && <Clearance />}
//         {activeSection === 'alerts' && <AlertsPage />}
//         {activeSection === 'order' && <OrderSummary />}
//         {activeSection === 'invoice' && <Invoice />}
//         {activeSection === 'settings' && <SettingsPage />}
//       </main>
//     </div>
//   )
// }

// function Sidebar({ activeSection, setActiveSection }) {
//   const menuItems = [
//     { id: 'dashboard', icon: Home, label: 'Home' },
//     { id: 'clearance', icon: Tag, label: 'Clearance Analytics', badge: 5 },
//     { id: 'alerts', icon: Bell, label: 'Stock Alerts', badge: 3 },
//     { id: 'order', icon: Package, label: 'Orders' },
//     { id: 'invoice', icon: FileText, label: 'Invoices' },
//   ]

//   return (
//     <div className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
//       <div className="px-6 py-6 border-b border-slate-200">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl">🛒</div>
//           <div>
//             <div className="text-lg font-bold text-slate-900">RetailIQ</div>
//             <div className="text-xs text-slate-500">Analytics Dashboard</div>
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
//         {menuItems.map((item) => {
//           const Icon = item.icon
//           return (
//             <button key={item.id} onClick={() => setActiveSection(item.id)}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative text-sm font-medium ${
//                 activeSection === item.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
//               <Icon className="w-4 h-4" />
//               <span>{item.label}</span>
//               {item.badge && <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">{item.badge}</span>}
//             </button>
//           )
//         })}
//       </nav>

//       <div className="px-3 py-4 border-t border-slate-200">
//         <div className="flex items-center gap-3 px-3 py-2 mb-2">
//           <div className="w-9 h-9 bg-slate-200 rounded-lg flex items-center justify-center text-sm font-semibold text-slate-700">AK</div>
//           <div className="flex-1 min-w-0">
//             <div className="font-medium text-sm text-slate-900 truncate">Amit Kumar</div>
//             <div className="text-xs text-slate-500">Store Manager</div>
//           </div>
//         </div>
//         <button onClick={() => setActiveSection('settings')}
//           className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
//             activeSection === 'settings' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}>
//           <SettingsIcon className="w-4 h-4" />
//           <span>Settings</span>
//         </button>
//       </div>
//     </div>
//   )
// }

// function Dashboard() {
//   const stats = [
//     { icon: '📦', label: 'Total Inventory', value: '₹4.2L', meta: '100 Products', color: 'blue' },
//     { icon: '⚠️', label: 'Action Required', value: '11', change: { value: '+3 today', positive: false }, color: 'red' },
//     { icon: '💰', label: 'Revenue (MTD)', value: '₹1.1L', change: { value: '+8.2%', positive: true }, color: 'green' },
//   ]

//   return (
//     <div className="max-w-[1600px] mx-auto p-8">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Welcome back, Amit</h1>
//           <p className="text-slate-600 text-sm mt-1">Here's what's happening with your store today</p>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input type="text" placeholder="Search products..." className="w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-6 mb-8">
//         {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
//       </div>

//       <div className="grid grid-cols-3 gap-6 mb-8">
//         <InventoryChart />
//         <AlertsList />
//         <TrendsEvents />
//       </div>

//       <FestivalGrid />
//     </div>
//   )
// }

// function StatCard({ icon, label, value, meta, change, color }) {
//   const colors = {
//     blue: 'bg-blue-50 text-blue-600',
//     red: 'bg-red-50 text-red-600',
//     green: 'bg-emerald-50 text-emerald-600',
//   }

//   return (
//     <div className="bg-white p-6 rounded-xl border border-slate-200">
//       <div className="flex items-start justify-between mb-4">
//         <div className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center text-2xl`}>{icon}</div>
//       </div>
//       <div className="text-sm text-slate-600 mb-1">{label}</div>
//       <div className="text-3xl font-bold text-slate-900 mb-2">{value}</div>
//       {meta && <div className="text-xs text-slate-500">{meta}</div>}
//       {change && (
//         <div className={`inline-flex items-center gap-1 text-xs font-medium mt-2 ${change.positive ? 'text-emerald-600' : 'text-red-600'}`}>
//           {change.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
//           {change.value}
//         </div>
//       )}
//     </div>
//   )
// }

// function InventoryChart() {
//   const data = [
//     { label: 'Out', value: 10, height: 22, color: 'bg-red-500' },
//     { label: 'Low', value: 15, height: 42, color: 'bg-amber-500' },
//     { label: 'OK', value: 28, height: 78, color: 'bg-blue-500' },
//     { label: 'Good', value: 75, height: 100, color: 'bg-emerald-500' },
//     { label: 'Over', value: 5, height: 28, color: 'bg-purple-500' },
//   ]

//   return (
//     <div className="bg-white p-6 rounded-xl border border-slate-200">
//       <h3 className="text-base font-semibold text-slate-900 mb-4">Inventory Distribution</h3>
//       <div className="flex items-end justify-between h-48 gap-2 mb-4">
//         {data.map((item, i) => (
//           <div key={i} className="flex-1 flex flex-col items-center">
//             <div className={`w-full ${item.color} rounded-t hover:opacity-80 transition-opacity cursor-pointer`} style={{ height: `${item.height}%` }}></div>
//             <div className="text-xs font-medium text-slate-600 mt-2">{item.label}</div>
//             <div className="text-xs text-slate-500">{item.value}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// function AlertsList() {
//   return (
//     <div className="bg-white p-6 rounded-xl border border-slate-200">
//       <h3 className="text-base font-semibold text-slate-900 mb-4">Critical Alerts</h3>
//       <div className="space-y-3">
//         <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
//           <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">⚠️</div>
//           <div className="flex-1 min-w-0">
//             <div className="text-sm font-medium text-slate-900">Sugar - 2kg left</div>
//             <div className="text-xs text-slate-600">Reorder 20kg immediately</div>
//           </div>
//         </div>
//         <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
//           <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">📉</div>
//           <div className="flex-1 min-w-0">
//             <div className="text-sm font-medium text-slate-900">Shampoo - Slow moving</div>
//             <div className="text-xs text-slate-600">120 days old, apply discount</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function TrendsEvents() {
//   return (
//     <div className="bg-white p-6 rounded-xl border border-slate-200">
//       <h3 className="text-base font-semibold text-slate-900 mb-4">Upcoming Events</h3>
//       <div className="space-y-3">
//         <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
//           <div className="w-12 h-12 bg-blue-50 rounded-lg flex flex-col items-center justify-center">
//             <div className="text-xs font-bold text-blue-600">MAY</div>
//             <div className="text-lg font-bold text-slate-900 leading-none">25</div>
//           </div>
//           <div className="flex-1">
//             <div className="text-sm font-medium text-slate-900">Summer Sale</div>
//             <div className="text-xs text-slate-600">Juice promotion</div>
//           </div>
//         </div>
//         <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
//           <div className="w-12 h-12 bg-emerald-50 rounded-lg flex flex-col items-center justify-center">
//             <div className="text-xs font-bold text-emerald-600">JUN</div>
//             <div className="text-lg font-bold text-slate-900 leading-none">10</div>
//           </div>
//           <div className="flex-1">
//             <div className="text-sm font-medium text-slate-900">Mango Fest</div>
//             <div className="text-xs text-slate-600">Fresh season</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function FestivalGrid() {
//   const festivals = [
//     { image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop', name: 'Summer Sale', date: 'May 25', tag: '20% OFF' },
//     { image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&h=300&fit=crop', name: 'Mango Fest', date: 'Jun 10', tag: 'Fresh Stock' },
//     { image: 'https://images.unsplash.com/photo-1612042888144-9626a40bc817?w=500&h=300&fit=crop', name: 'Raksha Bandhan', date: 'Aug 30', tag: 'Gift Hampers' },
//   ]

//   return (
//     <div className="bg-white p-6 rounded-xl border border-slate-200">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-bold text-slate-900">Seasonal Opportunities</h2>
//         <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All →</button>
//       </div>

//       <div className="grid grid-cols-3 gap-6">
//         {festivals.map((f, i) => (
//           <div key={i} className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
//             <div className="h-40 relative">
//               <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
//               <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-blue-600">{f.tag}</div>
//             </div>
//             <div className="p-4">
//               <div className="font-semibold text-slate-900 mb-1">{f.name}</div>
//               <div className="text-sm text-slate-600">{f.date}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// function Clearance() {
//   const [selectedItem, setSelectedItem] = useState(null)
//   const [appliedPromotions, setAppliedPromotions] = useState({})

//   const items = [
//     {
//       id: 1,
//       name: 'Shampoo - Herbal Essence 400ml',
//       sku: 'SHP-HE-400',
//       daysInShelf: 120,
//       expiryDays: 45,
//       stock: 24,
//       mrp: 450,
//       avgSalePerWeek: 1.2,
//       status: 'critical',
//       reason: 'Expiring soon + Slow moving',
//       recommendation: 'Apply 30-40% discount immediately',
//       salesTrend: 'down',
//       lastSold: 8,
//     },
//     {
//       id: 2,
//       name: 'Face Cream - Lotus 50g',
//       sku: 'FC-LOT-50',
//       daysInShelf: 90,
//       expiryDays: 120,
//       stock: 18,
//       mrp: 280,
//       avgSalePerWeek: 0.8,
//       status: 'warning',
//       reason: 'Very slow moving',
//       recommendation: 'Apply 20-25% discount + promote',
//       salesTrend: 'down',
//       lastSold: 15,
//     },
//     {
//       id: 3,
//       name: 'Hair Oil - Parachute 200ml',
//       sku: 'HO-PAR-200',
//       daysInShelf: 75,
//       expiryDays: 180,
//       stock: 32,
//       mrp: 180,
//       avgSalePerWeek: 1.5,
//       status: 'monitor',
//       reason: 'Declining trend detected',
//       recommendation: 'Apply 15% discount or bundle offer',
//       salesTrend: 'down',
//       lastSold: 6,
//     },
//     {
//       id: 4,
//       name: 'Soap - Lux 100g (Pack of 4)',
//       sku: 'SP-LUX-100',
//       daysInShelf: 45,
//       expiryDays: 90,
//       stock: 28,
//       mrp: 160,
//       avgSalePerWeek: 2.1,
//       status: 'watch',
//       reason: 'Seasonal decline',
//       recommendation: 'Bundle with other items',
//       salesTrend: 'stable',
//       lastSold: 4,
//     },
//   ]

//   const applyPromotion = (item, discount) => {
//     const discountedPrice = item.mrp * (1 - discount / 100)
//     const estimatedWeeklySales = item.avgSalePerWeek * (1 + discount / 20)
//     const projectedRevenue = discountedPrice * estimatedWeeklySales * 4
//     const currentRevenue = item.mrp * item.avgSalePerWeek * 4

//     setAppliedPromotions({
//       ...appliedPromotions,
//       [item.id]: {
//         discount,
//         originalPrice: item.mrp,
//         newPrice: discountedPrice,
//         estimatedWeeklySales,
//         projectedMonthlyRevenue: projectedRevenue,
//         currentMonthlyRevenue: currentRevenue,
//         revenueDiff: projectedRevenue - currentRevenue,
//         appliedAt: new Date(),
//       }
//     })
//   }

//   const removePromotion = (itemId) => {
//     const newPromotions = { ...appliedPromotions }
//     delete newPromotions[itemId]
//     setAppliedPromotions(newPromotions)
//   }

//   return (
//     <div className="max-w-[1600px] mx-auto p-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-slate-900">Clearance Analytics</h1>
//         <p className="text-slate-600 text-sm mt-1">AI-powered recommendations to optimize inventory clearance</p>
//       </div>

//       <div className="grid grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg border border-slate-200">
//           <div className="text-sm text-slate-600 mb-1">Items Needing Action</div>
//           <div className="text-2xl font-bold text-slate-900">{items.length}</div>
//           <div className="text-xs text-red-600 font-medium mt-1">↓ Clear in 30 days</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg border border-slate-200">
//           <div className="text-sm text-slate-600 mb-1">Locked Capital</div>
//           <div className="text-2xl font-bold text-slate-900">₹24,580</div>
//           <div className="text-xs text-amber-600 font-medium mt-1">In slow stock</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg border border-slate-200">
//           <div className="text-sm text-slate-600 mb-1">Active Promotions</div>
//           <div className="text-2xl font-bold text-slate-900">{Object.keys(appliedPromotions).length}</div>
//           <div className="text-xs text-blue-600 font-medium mt-1">Currently running</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg border border-slate-200">
//           <div className="text-sm text-slate-600 mb-1">Projected Recovery</div>
//           <div className="text-2xl font-bold text-emerald-600">
//             ₹{Object.values(appliedPromotions).reduce((acc, p) => acc + p.projectedMonthlyRevenue, 0).toFixed(0)}
//           </div>
//           <div className="text-xs text-emerald-600 font-medium mt-1">Next 30 days</div>
//         </div>
//       </div>

//       <div className="space-y-4">
//         {items.map((item) => {
//           const promo = appliedPromotions[item.id]
//           const isSelected = selectedItem?.id === item.id

//           return (
//             <div key={item.id} className={`bg-white border-2 rounded-xl overflow-hidden transition-all ${
//               promo ? 'border-emerald-300' : isSelected ? 'border-blue-300' : 'border-slate-200'
//             }`}>
//               <div className="p-5">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1">
//                     <div className="flex items-start gap-3">
//                       <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
//                         item.status === 'critical' ? 'bg-red-100' :
//                         item.status === 'warning' ? 'bg-amber-100' :
//                         item.status === 'monitor' ? 'bg-blue-100' : 'bg-slate-100'
//                       }`}>
//                         {item.status === 'critical' ? '🔴' : item.status === 'warning' ? '⚠️' : item.status === 'monitor' ? '📊' : '👁️'}
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h3>
//                         <div className="flex items-center gap-4 text-sm text-slate-600">
//                           <span className="font-mono">{item.sku}</span>
//                           <span>•</span>
//                           <span className="flex items-center gap-1">
//                             <Clock className="w-3 h-3" />
//                             {item.daysInShelf} days in shelf
//                           </span>
//                           <span>•</span>
//                           <span className={item.expiryDays < 60 ? 'text-red-600 font-medium' : ''}>
//                             Expires in {item.expiryDays} days
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setSelectedItem(isSelected ? null : item)}
//                     className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                   >
//                     {isSelected ? 'Hide Details' : 'View Analytics'}
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-5 gap-4 mb-4">
//                   <div className="bg-slate-50 p-3 rounded-lg">
//                     <div className="text-xs text-slate-600 mb-1">Stock</div>
//                     <div className="text-lg font-bold text-slate-900">{item.stock} units</div>
//                   </div>
//                   <div className="bg-slate-50 p-3 rounded-lg">
//                     <div className="text-xs text-slate-600 mb-1">MRP</div>
//                     <div className="text-lg font-bold text-slate-900">₹{item.mrp}</div>
//                   </div>
//                   <div className="bg-slate-50 p-3 rounded-lg">
//                     <div className="text-xs text-slate-600 mb-1">Avg Sale/Week</div>
//                     <div className="text-lg font-bold text-slate-900">{item.avgSalePerWeek}</div>
//                   </div>
//                   <div className="bg-slate-50 p-3 rounded-lg">
//                     <div className="text-xs text-slate-600 mb-1">Last Sold</div>
//                     <div className="text-lg font-bold text-slate-900">{item.lastSold} days ago</div>
//                   </div>
//                   <div className="bg-slate-50 p-3 rounded-lg">
//                     <div className="text-xs text-slate-600 mb-1">Trend</div>
//                     <div className={`text-lg font-bold ${item.salesTrend === 'down' ? 'text-red-600' : 'text-slate-600'}`}>
//                       {item.salesTrend === 'down' ? '↓ Down' : '→ Stable'}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
//                   <div className="flex items-start gap-3">
//                     <BarChart3 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <div className="font-semibold text-slate-900 mb-1">Analysis: {item.reason}</div>
//                       <div className="text-sm text-slate-700 mb-2">{item.recommendation}</div>
//                       <div className="text-xs text-slate-600">
//                         At current rate, will take {Math.ceil(item.stock / item.avgSalePerWeek)} weeks to clear stock
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {promo && (
//                   <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-lg mb-4">
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex items-center gap-2">
//                         <Check className="w-5 h-5 text-emerald-600" />
//                         <span className="font-semibold text-emerald-900">Promotion Active: {promo.discount}% OFF</span>
//                       </div>
//                       <button onClick={() => removePromotion(item.id)} className="text-emerald-600 hover:text-emerald-700">
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-4 gap-4 mb-3">
//                       <div>
//                         <div className="text-xs text-emerald-700 mb-1">Original Price</div>
//                         <div className="text-base font-bold text-slate-400 line-through">₹{promo.originalPrice}</div>
//                       </div>
//                       <div>
//                         <div className="text-xs text-emerald-700 mb-1">Discounted Price</div>
//                         <div className="text-base font-bold text-emerald-900">₹{promo.newPrice.toFixed(0)}</div>
//                       </div>
//                       <div>
//                         <div className="text-xs text-emerald-700 mb-1">Est. Weekly Sales</div>
//                         <div className="text-base font-bold text-emerald-900">{promo.estimatedWeeklySales.toFixed(1)} units</div>
//                       </div>
//                       <div>
//                         <div className="text-xs text-emerald-700 mb-1">30-Day Revenue</div>
//                         <div className="text-base font-bold text-emerald-900">₹{promo.projectedMonthlyRevenue.toFixed(0)}</div>
//                       </div>
//                     </div>

//                     <div className="bg-white p-3 rounded border border-emerald-200">
//                       <div className="text-sm mb-2">
//                         <span className="text-slate-600">Impact: </span>
//                         <span className={`font-semibold ${promo.revenueDiff > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
//                           {promo.revenueDiff > 0 ? '+' : ''}₹{promo.revenueDiff.toFixed(0)} revenue {promo.revenueDiff > 0 ? 'increase' : 'loss'}
//                         </span>
//                         <span className="text-slate-600"> vs no promotion</span>
//                       </div>
//                       <div className="text-xs text-slate-600">
//                         Promotion will help clear {Math.ceil(promo.estimatedWeeklySales * 4)} units in 30 days (vs {Math.ceil(item.avgSalePerWeek * 4)} normally)
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {!promo && (
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => applyPromotion(item, 15)}
//                       className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm"
//                     >
//                       <Percent className="w-4 h-4 inline mr-1" />
//                       Apply 15% Discount
//                     </button>
//                     <button
//                       onClick={() => applyPromotion(item, 25)}
//                       className="flex-1 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg font-medium hover:bg-amber-100 transition-colors text-sm"
//                     >
//                       <Percent className="w-4 h-4 inline mr-1" />
//                       Apply 25% Discount
//                     </button>
//                     <button
//                       onClick={() => applyPromotion(item, 35)}
//                       className="flex-1 px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors text-sm"
//                     >
//                       <Percent className="w-4 h-4 inline mr-1" />
//                       Apply 35% Discount
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {isSelected && (
//                 <div className="border-t border-slate-200 bg-slate-50 p-5">
//                   <h4 className="font-semibold text-slate-900 mb-4">Detailed Analytics</h4>
                  
//                   <div className="grid grid-cols-3 gap-6">
//                     <div className="bg-white p-4 rounded-lg border border-slate-200">
//                       <div className="text-sm font-medium text-slate-600 mb-3">Sales Velocity</div>
//                       <div className="space-y-2">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-slate-600">Current rate:</span>
//                           <span className="font-medium">{item.avgSalePerWeek}/week</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-slate-600">Weeks to clear:</span>
//                           <span className="font-medium text-red-600">{Math.ceil(item.stock / item.avgSalePerWeek)} weeks</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-slate-600">Days till expiry:</span>
//                           <span className="font-medium text-amber-600">{item.expiryDays} days</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-white p-4 rounded-lg border border-slate-200">
//                       <div className="text-sm font-medium text-slate-600 mb-3">Revenue Analysis</div>
//                       <div className="space-y-2">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-slate-600">Inventory value:</span>
//                           <span className="font-medium">₹{item.stock * item.mrp}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-slate-600">Monthly revenue:</span>
//                           <span className="font-medium">₹{(item.avgSalePerWeek * 4 * item.mrp).toFixed(0)}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-slate-600">Potential loss:</span>
//                           <span className="font-medium text-red-600">₹{item.stock * item.mrp}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-white p-4 rounded-lg border border-slate-200">
//                       <div className="text-sm font-medium text-slate-600 mb-3">Recommendations</div>
//                       <div className="space-y-2 text-sm text-slate-700">
//                         {item.expiryDays < 60 && <div>• Urgent: Apply 30%+ discount</div>}
//                         {item.avgSalePerWeek < 1.5 && <div>• Bundle with fast-moving items</div>}
//                         {item.salesTrend === 'down' && <div>• Promote on social media</div>}
//                         <div>• Place in high-traffic area</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// function AlertsPage() {
//   return (
//     <div className="max-w-[1600px] mx-auto p-8">
//       <h1 className="text-2xl font-bold text-slate-900 mb-8">Stock Alerts</h1>
//       <div className="bg-white p-6 rounded-xl border border-slate-200">
//         <p className="text-slate-600">Critical stock alerts and reorder recommendations</p>
//       </div>
//     </div>
//   )
// }

// function OrderSummary() {
//   return (
//     <div className="max-w-[1600px] mx-auto p-8">
//       <h1 className="text-2xl font-bold text-slate-900 mb-8">Orders</h1>
//       <div className="bg-white p-6 rounded-xl border border-slate-200">
//         <p className="text-slate-600">Manage purchase orders and supplier orders</p>
//       </div>
//     </div>
//   )
// }

// function Invoice() {
//   return (
//     <div className="max-w-[1600px] mx-auto p-8">
//       <h1 className="text-2xl font-bold text-slate-900 mb-8">Invoices</h1>
//       <div className="bg-white p-6 rounded-xl border border-slate-200">
//         <p className="text-slate-600">Create and manage customer invoices</p>
//       </div>
//     </div>
//   )
// }

// function SettingsPage() {
//   return (
//     <div className="max-w-[1600px] mx-auto p-8">
//       <h1 className="text-2xl font-bold text-slate-900 mb-8">Settings</h1>
//       <div className="bg-white p-6 rounded-xl border border-slate-200">
//         <p className="text-slate-600">Configure your store settings and preferences</p>
//       </div>
//     </div>
//   )
// }
import { useState } from 'react'
import { Home, Tag, Bell, Package, FileText, Settings as SettingsIcon, Search, TrendingUp, TrendingDown, ArrowRight, Phone, Calendar, BarChart3, Percent, Clock, X, Check, AlertTriangle, Activity, Zap, ShoppingCart } from 'lucide-react'
import InventoryManagementSystem from './RetailInventorySystem'

export default function GroceryDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-y-auto">
        {activeSection === 'dashboard' && <Dashboard />}
        {activeSection === 'clearance' && <Clearance />}
        {activeSection === 'alerts' && <AlertsPage />}
        {activeSection === 'order' && <InventoryManagementSystem />}
        {activeSection === 'invoice' && <Invoice />}
        {activeSection === 'settings' && <SettingsPage />}
      </main>
    </div>
  )
}

function Sidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'clearance', icon: Tag, label: 'Clearance Analytics', badge: 5 },
    { id: 'alerts', icon: Bell, label: 'Alerts & Suggestions', badge: 8 },
    { id: 'order', icon: Package, label: 'Inventory' },
    { id: 'invoice', icon: FileText, label: 'Invoices' },
  ]

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col sticky top-0 h-screen">
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-xl">🛒</div>
          <div>
            <div className="text-lg font-black text-gray-900">StockSathi</div>
            <div className="text-xs text-gray-600">Dashboard</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const handleClick = () => {
            setActiveSection(item.id)
          }

          return (
            <button key={item.id} onClick={handleClick}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative text-sm font-medium ${
                activeSection === item.id ? 'bg-yellow-100 text-yellow-900 font-bold' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.badge && <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">{item.badge}</span>}
            </button>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-9 h-9 bg-yellow-200 rounded-lg flex items-center justify-center text-sm font-bold text-yellow-900">AK</div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm text-gray-900 truncate">Amit Kumar</div>
            <div className="text-xs text-gray-600">Store Manager</div>
          </div>
        </div>
        <button onClick={() => setActiveSection('settings')}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
            activeSection === 'settings' ? 'bg-yellow-100 text-yellow-900 font-bold' : 'text-gray-700 hover:bg-gray-100'}`}>
          <SettingsIcon className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  )
}

function Dashboard() {
  const stats = [
    { icon: '📦', label: 'Total Inventory', value: '₹4.2L', meta: '100 Products', color: 'blue' },
    { icon: '⚠️', label: 'Action Required', value: '11', change: { value: '+3 today', positive: false }, color: 'red' },
    { icon: '💰', label: 'Revenue (MTD)', value: '₹1.1L', change: { value: '+8.2%', positive: true }, color: 'green' },
  ]

  return (
    <div className="max-w-[1600px] mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Welcome back, Amit</h1>
          <p className="text-gray-600 text-sm mt-2">Here's what's happening with your store today</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search products..." className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <InventoryChart />
        <AlertsList />
        <TrendsEvents />
      </div>

      <FestivalGrid />
    </div>
  )
}

function StatCard({ icon, label, value, meta, change, color }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-emerald-50 text-emerald-600',
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center text-2xl`}>{icon}</div>
      </div>
      <div className="text-sm text-slate-600 mb-1">{label}</div>
      <div className="text-3xl font-bold text-slate-900 mb-2">{value}</div>
      {meta && <div className="text-xs text-slate-500">{meta}</div>}
      {change && (
        <div className={`inline-flex items-center gap-1 text-xs font-medium mt-2 ${change.positive ? 'text-emerald-600' : 'text-red-600'}`}>
          {change.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change.value}
        </div>
      )}
    </div>
  )
}

function InventoryChart() {
  const data = [
    { label: 'Out of Stock', value: 10, height: 22, color: 'bg-red-500', description: '10 items' },
    { label: 'Low Stock', value: 15, height: 42, color: 'bg-amber-500', description: '15 items' },
    { label: 'OK', value: 28, height: 78, color: 'bg-blue-500', description: '28 items' },
    { label: 'Good Stock', value: 75, height: 100, color: 'bg-emerald-500', description: '75 items' },
    { label: 'Over Stock', value: 5, height: 28, color: 'bg-purple-500', description: '5 items' },
  ]

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 h-full">
      <h3 className="text-base font-semibold text-slate-900 mb-6">Stock Status</h3>
      
      {/* Chart */}
      <div className="flex items-end justify-around h-56 gap-3 mb-6 px-2">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="text-xs font-bold text-slate-600 text-center h-6">{item.value}</div>
            <div className="w-full flex flex-col items-center">
              <div 
                className={`w-full ${item.color} rounded-t-lg shadow-md hover:shadow-lg transition-all duration-200 group-hover:opacity-90 cursor-pointer`} 
                style={{ height: `${item.height * 1.5}px` }}
                title={item.description}
              ></div>
              <div className="w-full bg-slate-50 rounded-b-lg px-2 py-1 text-center">
                <div className="text-xs font-medium text-slate-700 leading-tight">{item.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="text-xs text-slate-600">Good (75)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-xs text-slate-600">OK (28)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          <span className="text-xs text-slate-600">Low (15)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-xs text-slate-600">Out (10)</span>
        </div>
      </div>
    </div>
  )
}

function AlertsList() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <h3 className="text-base font-semibold text-slate-900 mb-4">Critical Alerts</h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">⚠️</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-900">Sugar - 2kg left</div>
            <div className="text-xs text-slate-600">Reorder 20kg immediately</div>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">📉</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-900">Shampoo - Slow moving</div>
            <div className="text-xs text-slate-600">120 days old, apply discount</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TrendsEvents() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <h3 className="text-base font-semibold text-slate-900 mb-4">Upcoming Events</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex flex-col items-center justify-center">
            <div className="text-xs font-bold text-blue-600">MAY</div>
            <div className="text-lg font-bold text-slate-900 leading-none">25</div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-900">Summer Sale</div>
            <div className="text-xs text-slate-600">Juice promotion</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-emerald-50 rounded-lg flex flex-col items-center justify-center">
            <div className="text-xs font-bold text-emerald-600">JUN</div>
            <div className="text-lg font-bold text-slate-900 leading-none">10</div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-900">Mango Fest</div>
            <div className="text-xs text-slate-600">Fresh season</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FestivalGrid() {
  const festivals = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1585707571428-a62de2109fe0?w=500&h=300&fit=crop',
      name: '#1 Best Seller',
      date: 'Top Product',
      tag: '⭐ #1 SELLING',
      description: 'Highest demand this month',
      stats: { sold: 245, trending: '↑ 42%' }
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      name: 'Promotion Impact',
      date: 'This Month',
      tag: '📈 +58% SALES',
      description: 'Sales boost after discount',
      stats: { before: '₹12K', after: '₹19K' }
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1612042888144-9626a40bc817?w=500&h=300&fit=crop',
      name: 'Raksha Bandhan',
      date: 'Aug 30',
      tag: 'Gift Hampers',
      description: 'Upcoming festival opportunity'
    },
  ]

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900">Sales & Performance</h2>
        <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All →</button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {festivals.map((f, i) => (
          <div key={i} className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group">
            <div className="h-40 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img src={f.image} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" onError={(e) => {e.target.style.display = 'none'}} />
              
              {/* Badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold">
                {f.tag}
              </div>

              {/* Stats Badge for #1 Selling */}
              {f.id === 1 && (
                <div className="absolute bottom-3 right-3 bg-green-500/90 text-white px-3 py-1 rounded-lg text-xs font-bold">
                  Sold: {f.stats.sold}
                </div>
              )}

              {/* Sales Hike Badge for Promotion */}
              {f.id === 2 && (
                <div className="absolute bottom-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold">
                  {f.stats.after}
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="font-semibold text-slate-900 mb-1">{f.name}</div>
              <div className="text-sm text-slate-600 mb-2">{f.date}</div>
              
              {/* Stats Row */}
              {f.id === 1 && (
                <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg">
                  <span className="text-xs text-gray-700">Trending</span>
                  <span className="text-sm font-bold text-green-600">{f.stats.trending}</span>
                </div>
              )}
              
              {f.id === 2 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Before:</span>
                    <span className="text-gray-800 font-medium">{f.stats.before}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">After:</span>
                    <span className="text-green-600 font-bold">{f.stats.after}</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-green-600" style={{width: '58%'}}></div>
                  </div>
                </div>
              )}

              {f.id === 3 && (
                <div className="text-xs text-slate-500">{f.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Clearance() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [appliedPromotions, setAppliedPromotions] = useState({})

  const items = [
    {
      id: 1,
      name: 'Shampoo - Herbal Essence 400ml',
      sku: 'SHP-HE-400',
      daysInShelf: 120,
      expiryDays: 45,
      stock: 24,
      mrp: 450,
      avgSalePerWeek: 1.2,
      status: 'critical',
      reason: 'Expiring soon + Slow moving',
      recommendation: 'Apply 30-40% discount immediately',
      salesTrend: 'down',
      lastSold: 8,
    },
    {
      id: 2,
      name: 'Face Cream - Lotus 50g',
      sku: 'FC-LOT-50',
      daysInShelf: 90,
      expiryDays: 120,
      stock: 18,
      mrp: 280,
      avgSalePerWeek: 0.8,
      status: 'warning',
      reason: 'Very slow moving',
      recommendation: 'Apply 20-25% discount + promote',
      salesTrend: 'down',
      lastSold: 15,
    },
    {
      id: 3,
      name: 'Hair Oil - Parachute 200ml',
      sku: 'HO-PAR-200',
      daysInShelf: 75,
      expiryDays: 180,
      stock: 32,
      mrp: 180,
      avgSalePerWeek: 1.5,
      status: 'monitor',
      reason: 'Declining trend detected',
      recommendation: 'Apply 15% discount or bundle offer',
      salesTrend: 'down',
      lastSold: 6,
    },
    {
      id: 4,
      name: 'Soap - Lux 100g (Pack of 4)',
      sku: 'SP-LUX-100',
      daysInShelf: 45,
      expiryDays: 90,
      stock: 28,
      mrp: 160,
      avgSalePerWeek: 2.1,
      status: 'watch',
      reason: 'Seasonal decline',
      recommendation: 'Bundle with other items',
      salesTrend: 'stable',
      lastSold: 4,
    },
  ]

  const applyPromotion = (item, discount) => {
    const discountedPrice = item.mrp * (1 - discount / 100)
    const estimatedWeeklySales = item.avgSalePerWeek * (1 + discount / 20)
    const projectedRevenue = discountedPrice * estimatedWeeklySales * 4
    const currentRevenue = item.mrp * item.avgSalePerWeek * 4

    setAppliedPromotions({
      ...appliedPromotions,
      [item.id]: {
        discount,
        originalPrice: item.mrp,
        newPrice: discountedPrice,
        estimatedWeeklySales,
        projectedMonthlyRevenue: projectedRevenue,
        currentMonthlyRevenue: currentRevenue,
        revenueDiff: projectedRevenue - currentRevenue,
        appliedAt: new Date(),
      }
    })
  }

  const removePromotion = (itemId) => {
    const newPromotions = { ...appliedPromotions }
    delete newPromotions[itemId]
    setAppliedPromotions(newPromotions)
  }

  return (
    <div className="max-w-[1600px] mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Clearance Analytics</h1>
        <p className="text-slate-600 text-sm mt-1">AI-powered recommendations to optimize inventory clearance</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-600 mb-1">Items Needing Action</div>
          <div className="text-2xl font-bold text-slate-900">{items.length}</div>
          <div className="text-xs text-red-600 font-medium mt-1">↓ Clear in 30 days</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-600 mb-1">Locked Capital</div>
          <div className="text-2xl font-bold text-slate-900">₹24,580</div>
          <div className="text-xs text-amber-600 font-medium mt-1">In slow stock</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-600 mb-1">Active Promotions</div>
          <div className="text-2xl font-bold text-slate-900">{Object.keys(appliedPromotions).length}</div>
          <div className="text-xs text-blue-600 font-medium mt-1">Currently running</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-600 mb-1">Projected Recovery</div>
          <div className="text-2xl font-bold text-emerald-600">
            ₹{Object.values(appliedPromotions).reduce((acc, p) => acc + p.projectedMonthlyRevenue, 0).toFixed(0)}
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Next 30 days</div>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const promo = appliedPromotions[item.id]
          const isSelected = selectedItem?.id === item.id

          return (
            <div key={item.id} className={`bg-white border-2 rounded-xl overflow-hidden transition-all ${
              promo ? 'border-emerald-300' : isSelected ? 'border-blue-300' : 'border-slate-200'
            }`}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                        item.status === 'critical' ? 'bg-red-100' :
                        item.status === 'warning' ? 'bg-amber-100' :
                        item.status === 'monitor' ? 'bg-blue-100' : 'bg-slate-100'
                      }`}>
                        {item.status === 'critical' ? '🔴' : item.status === 'warning' ? '⚠️' : item.status === 'monitor' ? '📊' : '👁️'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="font-mono">{item.sku}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.daysInShelf} days in shelf
                          </span>
                          <span>•</span>
                          <span className={item.expiryDays < 60 ? 'text-red-600 font-medium' : ''}>
                            Expires in {item.expiryDays} days
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedItem(isSelected ? null : item)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {isSelected ? 'Hide Details' : 'View Analytics'}
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-4 mb-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Stock</div>
                    <div className="text-lg font-bold text-slate-900">{item.stock} units</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">MRP</div>
                    <div className="text-lg font-bold text-slate-900">₹{item.mrp}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Avg Sale/Week</div>
                    <div className="text-lg font-bold text-slate-900">{item.avgSalePerWeek}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Last Sold</div>
                    <div className="text-lg font-bold text-slate-900">{item.lastSold} days ago</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Trend</div>
                    <div className={`text-lg font-bold ${item.salesTrend === 'down' ? 'text-red-600' : 'text-slate-600'}`}>
                      {item.salesTrend === 'down' ? '↓ Down' : '→ Stable'}
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Analysis: {item.reason}</div>
                      <div className="text-sm text-slate-700 mb-2">{item.recommendation}</div>
                      <div className="text-xs text-slate-600">
                        At current rate, will take {Math.ceil(item.stock / item.avgSalePerWeek)} weeks to clear stock
                      </div>
                    </div>
                  </div>
                </div>

                {promo && (
                  <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-lg mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-600" />
                        <span className="font-semibold text-emerald-900">Promotion Active: {promo.discount}% OFF</span>
                      </div>
                      <button onClick={() => removePromotion(item.id)} className="text-emerald-600 hover:text-emerald-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-emerald-700 mb-1">Original Price</div>
                        <div className="text-base font-bold text-slate-400 line-through">₹{promo.originalPrice}</div>
                      </div>
                      <div>
                        <div className="text-xs text-emerald-700 mb-1">Discounted Price</div>
                        <div className="text-base font-bold text-emerald-900">₹{promo.newPrice.toFixed(0)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-emerald-700 mb-1">Est. Weekly Sales</div>
                        <div className="text-base font-bold text-emerald-900">{promo.estimatedWeeklySales.toFixed(1)} units</div>
                      </div>
                      <div>
                        <div className="text-xs text-emerald-700 mb-1">30-Day Revenue</div>
                        <div className="text-base font-bold text-emerald-900">₹{promo.projectedMonthlyRevenue.toFixed(0)}</div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded border border-emerald-200">
                      <div className="text-sm mb-2">
                        <span className="text-slate-600">Impact: </span>
                        <span className={`font-semibold ${promo.revenueDiff > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {promo.revenueDiff > 0 ? '+' : ''}₹{promo.revenueDiff.toFixed(0)} revenue {promo.revenueDiff > 0 ? 'increase' : 'loss'}
                        </span>
                        <span className="text-slate-600"> vs no promotion</span>
                      </div>
                      <div className="text-xs text-slate-600">
                        Promotion will help clear {Math.ceil(promo.estimatedWeeklySales * 4)} units in 30 days (vs {Math.ceil(item.avgSalePerWeek * 4)} normally)
                      </div>
                    </div>
                  </div>
                )}

                {!promo && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => applyPromotion(item, 15)}
                      className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm"
                    >
                      <Percent className="w-4 h-4 inline mr-1" />
                      Apply 15% Discount
                    </button>
                    <button
                      onClick={() => applyPromotion(item, 25)}
                      className="flex-1 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg font-medium hover:bg-amber-100 transition-colors text-sm"
                    >
                      <Percent className="w-4 h-4 inline mr-1" />
                      Apply 25% Discount
                    </button>
                    <button
                      onClick={() => applyPromotion(item, 35)}
                      className="flex-1 px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors text-sm"
                    >
                      <Percent className="w-4 h-4 inline mr-1" />
                      Apply 35% Discount
                    </button>
                  </div>
                )}
              </div>

              {isSelected && (
                <div className="border-t border-slate-200 bg-slate-50 p-5">
                  <h4 className="font-semibold text-slate-900 mb-4">Detailed Analytics</h4>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <div className="text-sm font-medium text-slate-600 mb-3">Sales Velocity</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Current rate:</span>
                          <span className="font-medium">{item.avgSalePerWeek}/week</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Weeks to clear:</span>
                          <span className="font-medium text-red-600">{Math.ceil(item.stock / item.avgSalePerWeek)} weeks</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Days till expiry:</span>
                          <span className="font-medium text-amber-600">{item.expiryDays} days</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <div className="text-sm font-medium text-slate-600 mb-3">Revenue Analysis</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Inventory value:</span>
                          <span className="font-medium">₹{item.stock * item.mrp}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Monthly revenue:</span>
                          <span className="font-medium">₹{(item.avgSalePerWeek * 4 * item.mrp).toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Potential loss:</span>
                          <span className="font-medium text-red-600">₹{item.stock * item.mrp}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <div className="text-sm font-medium text-slate-600 mb-3">Recommendations</div>
                      <div className="space-y-2 text-sm text-slate-700">
                        {item.expiryDays < 60 && <div>• Urgent: Apply 30%+ discount</div>}
                        {item.avgSalePerWeek < 1.5 && <div>• Bundle with fast-moving items</div>}
                        {item.salesTrend === 'down' && <div>• Promote on social media</div>}
                        <div>• Place in high-traffic area</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AlertsPage() {
  const inventoryData = [
    { name: 'Rice - Basmati 5kg', category: 'Grains', stock: 145, status: 'good', trend: 'stable', avgSale: 28, soldLastWeek: 32, daysToExpiry: 180 },
    { name: 'Sugar - White 1kg', category: 'Essentials', stock: 2, status: 'critical', trend: 'up', avgSale: 45, soldLastWeek: 52, daysToExpiry: 90 },
    { name: 'Milk - Full Cream 1L', category: 'Dairy', stock: 8, status: 'low', trend: 'stable', avgSale: 85, soldLastWeek: 88, daysToExpiry: 3 },
    { name: 'Cooking Oil - Sunflower 1L', category: 'Oil', stock: 35, status: 'ok', trend: 'stable', avgSale: 22, soldLastWeek: 24, daysToExpiry: 120 },
    { name: 'Tea - Premium Leaf 250g', category: 'Beverages', stock: 18, status: 'ok', trend: 'down', avgSale: 12, soldLastWeek: 8, daysToExpiry: 150 },
  ]

  const trendingData = [
    { name: 'Cold Drinks', status: 'hot', sales: 156, growth: '+42%', reason: 'Summer season', action: 'Stock up +50%' },
    { name: 'Ice Cream', status: 'hot', sales: 98, growth: '+38%', reason: 'Hot weather', action: 'Increase variety' },
    { name: 'Mangoes', status: 'seasonal', sales: 124, growth: '+65%', reason: 'Peak season', action: 'Promote heavily' },
  ]

  const slowMovingData = [
    { name: 'Winter Cream', sales: 3, decline: '-78%', daysInStock: 145, suggestion: 'Apply 40% discount or return to supplier' },
    { name: 'Heavy Blankets', sales: 1, decline: '-92%', daysInStock: 180, suggestion: 'Clearance sale, 50% off' },
    { name: 'Hot Chocolate Mix', sales: 5, decline: '-65%', daysInStock: 120, suggestion: 'Bundle with coffee products' },
  ]

  const demandData = [
    { name: 'Sanitizer Gel', requests: 12, avgPrice: '₹80', competitors: 'In stock nearby', action: 'Order 50 units' },
    { name: 'Face Masks (N95)', requests: 8, avgPrice: '₹25', competitors: 'Limited availability', action: 'Order 100 units' },
    { name: 'Hand Wash Refill', requests: 15, avgPrice: '₹120', competitors: 'High demand area-wide', action: 'Order 30 units' },
  ]

  return (
    <div className="max-w-[1600px] mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Alerts & Suggestions</h1>
        <p className="text-slate-600 text-sm mt-1">AI-powered insights to optimize your inventory and maximize profits</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-600 mb-1">Current Inventory</div>
          <div className="text-2xl font-bold text-slate-900">100 Items</div>
          <div className="text-xs text-blue-600 font-medium mt-1">Total SKUs</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-sm text-red-600 mb-1">Critical Alerts</div>
          <div className="text-2xl font-bold text-red-700">3</div>
          <div className="text-xs text-red-600 font-medium mt-1">Immediate action needed</div>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="text-sm text-amber-600 mb-1">Low Stock</div>
          <div className="text-2xl font-bold text-amber-700">5</div>
          <div className="text-xs text-amber-600 font-medium mt-1">Reorder soon</div>
        </div>
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <div className="text-sm text-emerald-600 mb-1">Trending Items</div>
          <div className="text-2xl font-bold text-emerald-700">8</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">High demand detected</div>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="bg-white rounded-xl border border-slate-200 mb-6 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Inventory Status Overview
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-slate-700">Product</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-700">Category</th>
                <th className="text-center p-4 text-sm font-semibold text-slate-700">Stock</th>
                <th className="text-center p-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-center p-4 text-sm font-semibold text-slate-700">Avg Sale/Week</th>
                <th className="text-center p-4 text-sm font-semibold text-slate-700">Last Week</th>
                <th className="text-center p-4 text-sm font-semibold text-slate-700">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventoryData.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-slate-900">{item.name}</div>
                    <div className="text-xs text-slate-500">Expires: {item.daysToExpiry} days</div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{item.category}</td>
                  <td className="p-4 text-center">
                    <span className="font-semibold text-slate-900">{item.stock}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'critical' ? 'bg-red-100 text-red-700' :
                      item.status === 'low' ? 'bg-amber-100 text-amber-700' :
                      item.status === 'ok' ? 'bg-blue-100 text-blue-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.status === 'critical' ? 'Critical' : item.status === 'low' ? 'Low' : item.status === 'ok' ? 'OK' : 'Good'}
                    </span>
                  </td>
                  <td className="p-4 text-center text-sm text-slate-700">{item.avgSale}</td>
                  <td className="p-4 text-center text-sm font-medium text-slate-900">{item.soldLastWeek}</td>
                  <td className="p-4 text-center">
                    {item.trend === 'up' && <TrendingUp className="w-5 h-5 text-emerald-600 mx-auto" />}
                    {item.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600 mx-auto" />}
                    {item.trend === 'stable' && <Activity className="w-5 h-5 text-blue-600 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Critical Notifications */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          Critical Alerts & Low Stock Notifications
        </h2>
        <div className="space-y-3">
          <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">⚠️</div>
              <div className="flex-1">
                <div className="font-bold text-red-900 mb-1">URGENT: Sugar - Only 2kg remaining</div>
                <div className="text-sm text-red-700 mb-2">Average sale: 45kg/week • High demand detected (+15% this week)</div>
                <div className="bg-white border border-red-200 p-3 rounded-lg">
                  <div className="text-sm font-semibold text-slate-900 mb-1">AI Recommendation:</div>
                  <div className="text-sm text-slate-700">Reorder 50kg immediately. Stock will run out in 0.3 days at current rate. Customer frustration risk: HIGH</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">📦</div>
              <div className="flex-1">
                <div className="font-bold text-amber-900 mb-1">LOW STOCK: Milk - Full Cream 1L (8 units left)</div>
                <div className="text-sm text-amber-700 mb-2">Average sale: 85 units/week • Expires in 3 days</div>
                <div className="bg-white border border-amber-200 p-3 rounded-lg">
                  <div className="text-sm font-semibold text-slate-900 mb-1">AI Recommendation:</div>
                  <div className="text-sm text-slate-700">Order 100 units for delivery tomorrow. Consider refrigeration capacity. Popular item with consistent demand.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-300 p-4 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">📉</div>
              <div className="flex-1">
                <div className="font-bold text-blue-900 mb-1">TREND ALERT: Tea sales declining</div>
                <div className="text-sm text-blue-700 mb-2">Sold 8 units last week vs 12 average • Declining 33%</div>
                <div className="bg-white border border-blue-200 p-3 rounded-lg">
                  <div className="text-sm font-semibold text-slate-900 mb-1">AI Suggestion:</div>
                  <div className="text-sm text-slate-700">Sales dropping due to summer. Consider 15% promotion or bundle with biscuits. Expected recovery in 45 days.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Items */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border-2 border-emerald-300 p-6">
          <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            🔥 Trending Hot - What's Selling Fast
          </h2>
          <div className="space-y-4">
            {trendingData.map((item, i) => (
              <div key={i} className="bg-white border border-emerald-200 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-slate-900 text-lg">{item.name}</div>
                    <div className="text-sm text-slate-600">{item.reason}</div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">{item.growth}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-600">Sold: <span className="font-semibold text-slate-900">{item.sales} units/week</span></div>
                  <div className="text-emerald-700 font-semibold">→ {item.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300 p-6">
          <h2 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            ❄️ Not Moving - Items to Clear
          </h2>
          <div className="space-y-4">
            {slowMovingData.map((item, i) => (
              <div key={i} className="bg-white border border-purple-200 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.daysInStock} days in stock</div>
                  </div>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">{item.decline}</span>
                </div>
                <div className="text-sm text-slate-600 mb-2">Only {item.sales} units sold this month</div>
                <div className="bg-amber-50 border border-amber-200 p-2 rounded text-sm text-amber-800">
                  <span className="font-semibold">Action:</span> {item.suggestion}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High Demand Not in Stock */}
      <div className="bg-white rounded-xl border-2 border-blue-300 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-blue-600" />
          📢 High Demand Items You Don't Stock
        </h2>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
          <div className="text-sm text-blue-800">
            Based on customer requests, nearby competition analysis, and seasonal trends, these items are in high demand in your area but not currently in your inventory.
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {demandData.map((item, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 p-4 rounded-lg hover:border-blue-300 transition-colors">
              <div className="font-bold text-slate-900 mb-2">{item.name}</div>
              <div className="space-y-1 text-sm text-slate-600 mb-3">
                <div>Customer requests: <span className="font-semibold text-slate-900">{item.requests} this month</span></div>
                <div>Market price: <span className="font-semibold text-slate-900">{item.avgPrice}</span></div>
                <div className="text-xs text-amber-600">{item.competitors}</div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function OrderSummary() {
  const inventoryItems = [
    { name: 'Rice - Basmati 5kg', sku: 'RICE-BAS-5KG', category: 'Grains', stock: 145, reorderLevel: 50, status: 'good', location: 'Aisle 1-A', supplier: 'India Foods Co.' },
    { name: 'Sugar - White 1kg', sku: 'SUG-WHT-1KG', category: 'Essentials', stock: 2, reorderLevel: 20, status: 'critical', location: 'Aisle 2-B', supplier: 'Sweet Traders' },
    { name: 'Milk - Full Cream 1L', sku: 'MILK-FC-1L', category: 'Dairy', stock: 8, reorderLevel: 30, status: 'low', location: 'Refrigerator 1', supplier: 'Daily Dairy' },
    { name: 'Cooking Oil - Sunflower 1L', sku: 'OIL-SUN-1L', category: 'Oil', stock: 35, reorderLevel: 25, status: 'ok', location: 'Aisle 3-C', supplier: 'Golden Oils Ltd' },
    { name: 'Tea - Premium Leaf 250g', sku: 'TEA-PRM-250G', category: 'Beverages', stock: 18, reorderLevel: 15, status: 'ok', location: 'Aisle 4-D', supplier: 'Tea Gardens Inc' },
    { name: 'Flour - Wheat 10kg', sku: 'FLR-WHT-10KG', category: 'Grains', stock: 62, reorderLevel: 30, status: 'good', location: 'Aisle 1-B', supplier: 'India Foods Co.' },
    { name: 'Salt - Iodized 1kg', sku: 'SALT-IOD-1KG', category: 'Essentials', stock: 88, reorderLevel: 40, status: 'good', location: 'Aisle 2-A', supplier: 'Salt Works' },
    { name: 'Biscuits - Marie 200g', sku: 'BISC-MAR-200G', category: 'Snacks', stock: 24, reorderLevel: 20, status: 'ok', location: 'Aisle 5-E', supplier: 'Snack Factory' },
  ]

  return (
    <div className="max-w-[1600px] mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Complete Inventory</h1>
        <p className="text-slate-600 text-sm mt-1">View and manage all products in your store</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-600 mb-1">Total SKUs</div>
          <div className="text-2xl font-bold text-slate-900">{inventoryItems.length}</div>
          <div className="text-xs text-blue-600 font-medium mt-1">Active products</div>
        </div>
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <div className="text-sm text-emerald-700 mb-1">Well Stocked</div>
          <div className="text-2xl font-bold text-emerald-700">
            {inventoryItems.filter(i => i.status === 'good').length}
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Above reorder level</div>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="text-sm text-amber-700 mb-1">Low Stock</div>
          <div className="text-2xl font-bold text-amber-700">
            {inventoryItems.filter(i => i.status === 'low' || i.status === 'ok').length}
          </div>
          <div className="text-xs text-amber-600 font-medium mt-1">Need attention</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-sm text-red-700 mb-1">Critical</div>
          <div className="text-2xl font-bold text-red-700">
            {inventoryItems.filter(i => i.status === 'critical').length}
          </div>
          <div className="text-xs text-red-600 font-medium mt-1">Urgent reorder</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Complete Inventory List</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search inventory..." 
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Categories</option>
                <option>Grains</option>
                <option>Dairy</option>
                <option>Essentials</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-slate-700">Product Details</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-700">SKU</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-700">Category</th>
                <th className="text-center p-4 text-sm font-semibold text-slate-700">Current Stock</th>
                <th className="text-center p-4 text-sm font-semibold text-slate-700">Reorder Level</th>
                <th className="text-center p-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-700">Location</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-700">Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventoryItems.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-slate-900">{item.name}</div>
                  </td>
                  <td className="p-4">
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">{item.sku}</code>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{item.category}</td>
                  <td className="p-4 text-center">
                    <span className="font-bold text-slate-900 text-lg">{item.stock}</span>
                  </td>
                  <td className="p-4 text-center text-sm text-slate-600">{item.reorderLevel}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === 'critical' ? 'bg-red-100 text-red-700' :
                      item.status === 'low' ? 'bg-amber-100 text-amber-700' :
                      item.status === 'ok' ? 'bg-blue-100 text-blue-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.status === 'critical' ? '🔴 CRITICAL' : 
                       item.status === 'low' ? '⚠️ LOW' : 
                       item.status === 'ok' ? '📊 OK' : 
                       '✅ GOOD'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{item.location}</td>
                  <td className="p-4 text-sm text-slate-600">{item.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Invoice() {
  return (
    <div className="max-w-[1600px] mx-auto p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Invoices</h1>
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <p className="text-slate-600">Create and manage customer invoices</p>
      </div>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="max-w-[1600px] mx-auto p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Settings</h1>
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <p className="text-slate-600">Configure your store settings and preferences</p>
      </div>
    </div>
  )
}