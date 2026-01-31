// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

// const navigation = [
//   { name: 'Dashboard', href: '/dashboard', current: true },
//   { name: 'Inventory', href: '/invent', current: false },
//   { name: 'Calendar', href: '/cal', current: false },
//   { name: 'About us', href: '#', current: false },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Navbar() {
//   const navigate = useNavigate()
//   const { user, isAuthenticated, logout } = useAuth()

//   const handleLogout = async () => {
//     const result = await logout()
//     if (result.success) {
//       navigate('/login')
//     }
//   }

//   const handleLoginClick = () => {
//     navigate('/login')
//   }

//   return (
//     <Disclosure
//       as="nav"
//       className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
//     >
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             {/* Mobile menu button*/}
//             <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
//               <span className="absolute -inset-0.5" />
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
//               <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
//             </DisclosureButton>
//           </div>
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex shrink-0 items-center">
//               <img
//                 alt="Your Company"
//                 src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
//                 className="h-8 w-auto"
//               />
//             </div>
//             <div className="hidden sm:ml-6 sm:block">
//               <div className="flex space-x-4">
//                 {isAuthenticated ? (
//                   navigation.map((item) => (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       aria-current={item.current ? 'page' : undefined}
//                       className={classNames(
//                         item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
//                         'rounded-md px-3 py-2 text-sm font-medium',
//                       )}
//                     >
//                       {item.name}
//                     </a>
//                   ))
//                 ) : (
//                   <div className="text-gray-300 px-3 py-2 text-sm font-medium">
//                     Welcome
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             <button
//               type="button"
//               className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
//             >
//               <span className="absolute -inset-1.5" />
//               <span className="sr-only">View notifications</span>
//               <BellIcon aria-hidden="true" className="size-6" />
//             </button>

//             {/* Profile dropdown or Login button */}
//             {isAuthenticated && user ? (
//               <Menu as="div" className="relative ml-3">
//                 <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
//                   <span className="absolute -inset-1.5" />
//                   <span className="sr-only">Open user menu</span>
//                   <img
//                     alt={user.name}
//                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                     className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
//                   />
//                 </MenuButton>

//                 <MenuItems
//                   transition
//                   className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
//                 >
//                   <MenuItem>
//                     <div className="block px-4 py-2 text-sm text-gray-300">
//                       {user.name}
//                     </div>
//                   </MenuItem>
//                   <MenuItem>
//                     <div className="block px-4 py-2 text-xs text-gray-400">
//                       {user.email}
//                     </div>
//                   </MenuItem>
//                   <MenuItem>
//                     <a
//                       href="/dashboard"
//                       className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
//                     >
//                       Your profile
//                     </a>
//                   </MenuItem>
//                   <MenuItem>
//                     <a
//                       href="/dashboard"
//                       className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
//                     >
//                       Settings
//                     </a>
//                   </MenuItem>
//                   <MenuItem>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden hover:bg-red-500/20"
//                     >
//                       Sign out
//                     </button>
//                   </MenuItem>
//                 </MenuItems>
//               </Menu>
//             ) : (
//               <button
//                 onClick={handleLoginClick}
//                 className="ml-3 inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
//               >
//                 Login
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <DisclosurePanel className="sm:hidden">
//         <div className="space-y-1 px-2 pt-2 pb-3">
//           {isAuthenticated ? (
//             navigation.map((item) => (
//               <DisclosureButton
//                 key={item.name}
//                 as="a"
//                 href={item.href}
//                 aria-current={item.current ? 'page' : undefined}
//                 className={classNames(
//                   item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
//                   'block rounded-md px-3 py-2 text-base font-medium',
//                 )}
//               >
//                 {item.name}
//               </DisclosureButton>
//             ))
//           ) : (
//             <div className="text-gray-300 px-3 py-2 text-base font-medium">
//               Welcome to Retail Demand System
//             </div>
//           )}
//         </div>
//       </DisclosurePanel>
//     </Disclosure>
//   )
// }
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Inventory', href: '/invent' },
  { name: 'Calendar', href: '/cal' },
  { name: 'About Us', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) navigate('/login')
  }

  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-yellow-500 flex items-center justify-center text-gray-900 font-black text-lg">
                S
              </div>
              <span className="text-lg font-black text-gray-900">StockSathi</span>
            </div>

            {isAuthenticated && (
              <div className="hidden sm:ml-10 sm:flex sm:space-x-6">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.href)}
                      className={classNames(
                        isActive
                          ? 'text-yellow-600 border-yellow-600'
                          : 'text-gray-700 hover:text-yellow-600 border-transparent',
                        'border-b-2 px-1 pt-1 text-sm font-semibold transition-colors duration-200'
                      )}
                    >
                      {item.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {isAuthenticated && (
              <button
                type="button"
                className="relative rounded-full p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 transition"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            )}

            {isAuthenticated && user ? (
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}`}
                    alt={user.name}
                    className="h-9 w-9 rounded-full"
                  />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">{user.name}</span>
                </MenuButton>

                <MenuItems className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => navigate('/dashboard')}
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block w-full text-left px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Profile
                      </button>
                    )}
                  </MenuItem>

                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => navigate('/settings')}
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block w-full text-left px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Settings
                      </button>
                    )}
                  </MenuItem>

                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={classNames(
                          active ? 'bg-red-50 text-red-600' : 'text-red-600',
                          'block w-full text-left px-4 py-2 text-sm font-medium'
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-bold text-gray-900 hover:bg-yellow-500 transition"
              >
                Login
              </button>
            )}

            {/* MOBILE MENU BUTTON */}
            <div className="sm:hidden">
              <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 focus:outline-none">
                <Bars3Icon className="block h-6 w-6 group-data-open:hidden" />
                <XMarkIcon className="hidden h-6 w-6 group-data-open:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <DisclosurePanel className="sm:hidden border-t border-gray-200 bg-white">
        <div className="space-y-1 px-4 py-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={classNames(
                  isActive ? 'bg-yellow-100 text-yellow-900 font-bold' : 'text-gray-700 hover:bg-gray-100',
                  'block w-full text-left rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </button>
            )
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
