// import React, { useState, useMemo } from 'react';
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   isSameMonth,
//   isSameDay,
//   addMonths,
//   subMonths,
//   startOfWeek,
//   endOfWeek,
//   isToday,
//   getDay,
//   addDays,
// } from 'date-fns';
// import {
//   Store,
//   TrendingUp,
//   Calendar,
//   Bell,
//   ChevronLeft,
//   ChevronRight,
//   CalendarDays,
//   X,
//   CheckCircle2,
//   Circle,
//   Lightbulb,
//   StickyNote,
//   Sparkles,
//   ShoppingBag,
//   Tag as TagIcon,
//   Users,
//   Instagram,
//   Package,
// } from 'lucide-react';

// // ============================================================================
// // UTILITY FUNCTIONS
// // ============================================================================

// const cn = (...classes) => {
//   return classes.filter(Boolean).join(' ');
// };

// // ============================================================================
// // TYPE DEFINITIONS & CONFIG
// // ============================================================================

// const tagConfig = {
//   festival: {
//     label: 'Festival',
//     className: 'bg-tag-festival text-tag-festival-foreground',
//     icon: Sparkles,
//   },
//   sales: {
//     label: 'Sales',
//     className: 'bg-tag-sales text-tag-sales-foreground',
//     icon: TagIcon,
//   },
//   social: {
//     label: 'Social',
//     className: 'bg-tag-social text-tag-social-foreground',
//     icon: Instagram,
//   },
//   weekend: {
//     label: 'Weekend',
//     className: 'bg-tag-weekend text-tag-weekend-foreground',
//     icon: ShoppingBag,
//   },
//   inventory: {
//     label: 'Inventory',
//     className: 'bg-tag-inventory text-tag-inventory-foreground',
//     icon: Package,
//   },
// };

// const priorityConfig = {
//   high: {
//     label: 'High Priority',
//     className: 'text-destructive',
//     dotClassName: 'bg-destructive',
//   },
//   medium: {
//     label: 'Medium Priority',
//     className: 'text-primary',
//     dotClassName: 'bg-primary',
//   },
//   low: {
//     label: 'Low Priority',
//     className: 'text-muted-foreground',
//     dotClassName: 'bg-muted-foreground',
//   },
// };

// // ============================================================================
// // DATA GENERATION
// // ============================================================================

// const createEvent = (
//   date,
//   title,
//   tagType,
//   priority,
//   description,
//   actions
// ) => ({
//   id: `${date.toISOString()}-${title}`,
//   date,
//   title,
//   tagType,
//   priority,
//   description,
//   suggestedActions: actions.map((a, i) => ({
//     id: `${date.toISOString()}-${i}`,
//     ...a,
//     completed: false,
//   })),
//   notes: '',
// });

// const generateMockEvents = (year, month) => {
//   const events = [];
//   const startDate = startOfMonth(new Date(year, month));
//   const endDate = endOfMonth(new Date(year, month));
//   const days = eachDayOfInterval({ start: startDate, end: endDate });

//   // Add weekend opportunities
//   days.forEach((day) => {
//     const dayOfWeek = getDay(day);
//     if (dayOfWeek === 0 || dayOfWeek === 6) {
//       events.push(
//         createEvent(
//           day,
//           'Weekend Rush',
//           'weekend',
//           'medium',
//           'Higher footfall expected. Consider extended hours and extra staff.',
//           [
//             { title: 'Schedule extra staff', description: 'Ensure adequate coverage for busy hours', icon: 'users' },
//             { title: 'Check inventory levels', description: 'Stock up on bestsellers', icon: 'package' },
//             { title: 'Plan social post', description: 'Share weekend specials', icon: 'instagram' },
//           ]
//         )
//       );
//     }
//   });

//   // Festival events
//   const festivals = [
//     { day: 3, title: "Valentine's Week Start", desc: 'Love season begins! Perfect for gift promotions.' },
//     { day: 8, title: "International Women's Day", desc: 'Celebrate with special offers for women.' },
//     { day: 14, title: "Valentine's Day", desc: 'Peak gifting day - maximize visibility!' },
//     { day: 17, title: 'Holi Festival', desc: 'Colors of joy! Great for festive merchandise.' },
//     { day: 21, title: 'Spring Equinox', desc: 'New season, new collections launch opportunity.' },
//   ];

//   festivals.forEach(({ day, title, desc }) => {
//     if (day <= days.length) {
//       events.push(
//         createEvent(
//           days[day - 1],
//           title,
//           'festival',
//           'high',
//           desc,
//           [
//             { title: 'Create festive display', description: 'Decorate store with themed elements', icon: 'sparkles' },
//             { title: 'Run special discount', description: 'Festival-themed offers', icon: 'percent' },
//             { title: 'Social media campaign', description: 'Share festive content', icon: 'share' },
//             { title: 'Stock festive items', description: 'Ensure themed products available', icon: 'gift' },
//           ]
//         )
//       );
//     }
//   });

//   // Sales opportunities
//   const salesDays = [5, 10, 15, 20, 25];
//   salesDays.forEach((day) => {
//     if (day <= days.length) {
//       events.push(
//         createEvent(
//           days[day - 1],
//           'Flash Sale Day',
//           'sales',
//           'medium',
//           'Perfect day for limited-time offers to boost sales.',
//           [
//             { title: 'Set discount prices', description: 'Prepare promotional pricing', icon: 'tag' },
//             { title: 'Update POS system', description: 'Ensure discounts apply correctly', icon: 'settings' },
//             { title: 'Train staff on offers', description: 'Brief team on promotions', icon: 'users' },
//           ]
//         )
//       );
//     }
//   });

//   // Social media days
//   const socialDays = [2, 7, 12, 18, 23, 28];
//   socialDays.forEach((day) => {
//     if (day <= days.length) {
//       events.push(
//         createEvent(
//           days[day - 1],
//           'High Engagement Day',
//           'social',
//           'low',
//           'Analytics show higher social media activity. Great for posting!',
//           [
//             { title: 'Post product showcase', description: 'Share new arrivals or bestsellers', icon: 'camera' },
//             { title: 'Go live on Instagram', description: 'Connect with followers', icon: 'video' },
//             { title: 'Respond to comments', description: 'Engage with your community', icon: 'message-circle' },
//           ]
//         )
//       );
//     }
//   });

//   // Inventory days
//   const inventoryDays = [1, 16];
//   inventoryDays.forEach((day) => {
//     if (day <= days.length) {
//       events.push(
//         createEvent(
//           days[day - 1],
//           'Inventory Review',
//           'inventory',
//           'medium',
//           'Time to check stock levels and reorder bestsellers.',
//           [
//             { title: 'Count current stock', description: 'Physical inventory check', icon: 'clipboard-list' },
//             { title: 'Review sales data', description: 'Identify fast-moving items', icon: 'bar-chart' },
//             { title: 'Place reorders', description: 'Restock popular items', icon: 'truck' },
//           ]
//         )
//       );
//     }
//   });

//   return events;
// };

// const getEventsForDate = (events, date) => {
//   return events.filter(
//     (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
//   );
// };

// // ============================================================================
// // UI COMPONENTS
// // ============================================================================

// // Button Component
// const Button = ({ children, variant = 'default', size = 'default', className, onClick, ...props }) => {
//   const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
//   const variants = {
//     default: 'bg-primary text-primary-foreground hover:bg-primary/90',
//     outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
//     ghost: 'hover:bg-accent hover:text-accent-foreground',
//   };
  
//   const sizes = {
//     default: 'h-10 px-4 py-2',
//     sm: 'h-9 rounded-md px-3',
//     lg: 'h-11 rounded-md px-8',
//     icon: 'h-10 w-10',
//   };
  
//   return (
//     <button
//       className={cn(baseStyles, variants[variant], sizes[size], className)}
//       onClick={onClick}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// // Textarea Component
// const Textarea = ({ className, value, onChange, placeholder, ...props }) => {
//   return (
//     <textarea
//       className={cn(
//         'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
//         className
//       )}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       {...props}
//     />
//   );
// };

// // EventTag Component
// const EventTag = ({ type, size = 'sm', showIcon = true }) => {
//   const config = tagConfig[type];
//   const Icon = config.icon;

//   return (
//     <span
//       className={cn(
//         'inline-flex items-center gap-1 rounded-full font-medium transition-all',
//         config.className,
//         size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
//       )}
//     >
//       {showIcon && <Icon className={size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'} />}
//       <span>{config.label}</span>
//     </span>
//   );
// };

// // PriorityBadge Component
// const PriorityBadge = ({ priority }) => {
//   const config = priorityConfig[priority];

//   return (
//     <div className="flex items-center gap-2">
//       <span className={cn('h-2 w-2 rounded-full animate-pulse', config.dotClassName)} />
//       <span className={cn('text-xs font-medium', config.className)}>{config.label}</span>
//     </div>
//   );
// };

// // CalendarDay Component
// const CalendarDay = ({
//   date,
//   events,
//   isCurrentMonth,
//   isToday: isTodayProp,
//   isSelected,
//   onClick,
//   index,
// }) => {
//   const dayOfWeek = getDay(date);
//   const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

//   // Get unique event types (max 2 to show)
//   const uniqueEvents = events.reduce((acc, event) => {
//     if (!acc.find((e) => e.tagType === event.tagType)) {
//       acc.push(event);
//     }
//     return acc;
//   }, []);

//   const displayEvents = uniqueEvents.slice(0, 2);
//   const moreCount = uniqueEvents.length - 2;

//   return (
//     <button
//       onClick={onClick}
//       className={cn(
//         'group relative flex min-h-[100px] flex-col rounded-xl p-2 text-left transition-all duration-200',
//         'hover:shadow-lg hover:scale-[1.02] hover:z-10',
//         isCurrentMonth ? 'bg-card' : 'bg-muted/30',
//         isSelected && 'ring-2 ring-primary ring-offset-2',
//         isTodayProp && 'bg-primary/5',
//         !isCurrentMonth && 'opacity-40'
//       )}
//       style={{
//         animation: `fadeIn 0.2s ease-out ${index * 0.01}s both`,
//       }}
//     >
//       {/* Date Number */}
//       <div className="flex items-start justify-between">
//         <span
//           className={cn(
//             'flex h-7 w-7 items-center justify-center rounded-lg text-sm font-semibold transition-colors',
//             isTodayProp && 'bg-primary text-primary-foreground',
//             isWeekend && !isTodayProp && 'text-primary/80',
//             !isTodayProp && !isWeekend && 'text-foreground'
//           )}
//         >
//           {format(date, 'd')}
//         </span>
        
//         {events.length > 0 && (
//           <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
//             {events.length}
//           </span>
//         )}
//       </div>

//       {/* Event Tags */}
//       <div className="mt-auto flex flex-col gap-1">
//         {displayEvents.map((event) => (
//           <EventTag key={event.id} type={event.tagType} size="sm" showIcon={false} />
//         ))}
//         {moreCount > 0 && (
//           <span className="text-[10px] text-muted-foreground">+{moreCount} more</span>
//         )}
//       </div>

//       {/* Hover indicator */}
//       <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors group-hover:border-primary/20" />
//     </button>
//   );
// };

// // ActionItem Component
// const ActionItem = ({ action, isCompleted, onToggle }) => {
//   return (
//     <button
//       onClick={onToggle}
//       className={cn(
//         'flex w-full items-start gap-3 rounded-lg p-3 text-left transition-all',
//         isCompleted ? 'bg-secondary/50' : 'bg-background hover:bg-muted/50'
//       )}
//     >
//       {isCompleted ? (
//         <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary-foreground" />
//       ) : (
//         <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
//       )}
//       <div className="flex-1">
//         <p
//           className={cn(
//             'text-sm font-medium',
//             isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
//           )}
//         >
//           {action.title}
//         </p>
//         <p className="text-xs text-muted-foreground">{action.description}</p>
//       </div>
//     </button>
//   );
// };

// // EventDetailPanel Component
// const EventDetailPanel = ({ date, events, onClose }) => {
//   const [expandedEvent, setExpandedEvent] = useState(events[0]?.id || null);
//   const [actionStates, setActionStates] = useState({});
//   const [notes, setNotes] = useState({});

//   const toggleAction = (actionId) => {
//     setActionStates((prev) => ({
//       ...prev,
//       [actionId]: !prev[actionId],
//     }));
//   };

//   const handleNoteChange = (eventId, note) => {
//     setNotes((prev) => ({
//       ...prev,
//       [eventId]: note,
//     }));
//   };

//   return (
//     <div
//       className="w-[400px] shrink-0 rounded-2xl bg-card p-6 shadow-lg"
//       style={{
//         animation: 'slideIn 0.3s ease-out',
//       }}
//     >
//       {/* Header */}
//       <div className="mb-6 flex items-start justify-between">
//         <div>
//           <p className="text-sm font-medium text-muted-foreground">
//             {format(date, 'EEEE')}
//           </p>
//           <h2 className="text-2xl font-bold text-foreground">
//             {format(date, 'MMMM d, yyyy')}
//           </h2>
//         </div>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={onClose}
//           className="h-8 w-8 rounded-lg hover:bg-muted"
//         >
//           <X className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* Events List */}
//       {events.length === 0 ? (
//         <div
//           className="flex flex-col items-center justify-center py-12 text-center"
//           style={{ animation: 'fadeIn 0.3s ease-out' }}
//         >
//           <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
//             <Sparkles className="h-8 w-8 text-muted-foreground" />
//           </div>
//           <h3 className="mb-1 font-semibold text-foreground">No events planned</h3>
//           <p className="text-sm text-muted-foreground">
//             This day is free for regular business
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {events.map((event, index) => (
//             <div
//               key={event.id}
//               className={cn(
//                 'rounded-xl border border-border/50 p-4 transition-all',
//                 expandedEvent === event.id ? 'bg-muted/30' : 'hover:bg-muted/20'
//               )}
//               style={{
//                 animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
//               }}
//             >
//               {/* Event Header */}
//               <button
//                 onClick={() =>
//                   setExpandedEvent(expandedEvent === event.id ? null : event.id)
//                 }
//                 className="flex w-full items-start justify-between text-left"
//               >
//                 <div className="flex-1">
//                   <div className="mb-2 flex items-center gap-2">
//                     <EventTag type={event.tagType} size="md" />
//                     <PriorityBadge priority={event.priority} />
//                   </div>
//                   <h3 className="font-semibold text-foreground">{event.title}</h3>
//                   <p className="mt-1 text-sm text-muted-foreground">
//                     {event.description}
//                   </p>
//                 </div>
//               </button>

//               {/* Expanded Content */}
//               {expandedEvent === event.id && (
//                 <div className="mt-4 space-y-4" style={{ animation: 'expandIn 0.2s ease-out' }}>
//                   {/* Suggested Actions */}
//                   <div>
//                     <div className="mb-2 flex items-center gap-2">
//                       <Lightbulb className="h-4 w-4 text-primary" />
//                       <span className="text-sm font-medium text-foreground">
//                         Suggested Actions
//                       </span>
//                     </div>
//                     <div className="space-y-2">
//                       {event.suggestedActions.map((action) => (
//                         <ActionItem
//                           key={action.id}
//                           action={action}
//                           isCompleted={actionStates[action.id] || false}
//                           onToggle={() => toggleAction(action.id)}
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   {/* Notes */}
//                   <div>
//                     <div className="mb-2 flex items-center gap-2">
//                       <StickyNote className="h-4 w-4 text-primary" />
//                       <span className="text-sm font-medium text-foreground">
//                         Notes & Reminders
//                       </span>
//                     </div>
//                     <Textarea
//                       placeholder="Add your notes here..."
//                       value={notes[event.id] || ''}
//                       onChange={(e) => handleNoteChange(event.id, e.target.value)}
//                       className="min-h-[80px] resize-none rounded-xl border-border/50 bg-background text-sm"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // RetailCalendar Component
// const RetailCalendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedEvents, setSelectedEvents] = useState([]);

//   const events = useMemo(() => {
//     return generateMockEvents(currentDate.getFullYear(), currentDate.getMonth());
//   }, [currentDate]);

//   const calendarDays = useMemo(() => {
//     const monthStart = startOfMonth(currentDate);
//     const monthEnd = endOfMonth(currentDate);
//     const calendarStart = startOfWeek(monthStart);
//     const calendarEnd = endOfWeek(monthEnd);

//     return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
//   }, [currentDate]);

//   const handlePrevMonth = () => {
//     setCurrentDate(subMonths(currentDate, 1));
//     setSelectedDate(null);
//     setSelectedEvents([]);
//   };

//   const handleNextMonth = () => {
//     setCurrentDate(addMonths(currentDate, 1));
//     setSelectedDate(null);
//     setSelectedEvents([]);
//   };

//   const handleDateClick = (date) => {
//     const dayEvents = getEventsForDate(events, date);
//     setSelectedDate(date);
//     setSelectedEvents(dayEvents);
//   };

//   const handleClosePanel = () => {
//     setSelectedDate(null);
//     setSelectedEvents([]);
//   };

//   const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   return (
//     <div className="flex h-full gap-6">
//       {/* Calendar Section */}
//       <div className="flex-1" style={{ transition: 'all 0.3s ease-in-out' }}>
//         {/* Header */}
//         <div className="mb-6 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
//               <CalendarDays className="h-6 w-6 text-primary" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-foreground">
//                 {format(currentDate, 'MMMM yyyy')}
//               </h1>
//               <p className="text-sm text-muted-foreground">
//                 Plan your retail success
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handlePrevMonth}
//               className="h-10 w-10 rounded-xl border-border/50 hover:bg-muted"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </Button>
//             <Button
//               variant="outline"
//               onClick={() => setCurrentDate(new Date())}
//               className="rounded-xl border-border/50 px-4 hover:bg-muted"
//             >
//               Today
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handleNextMonth}
//               className="h-10 w-10 rounded-xl border-border/50 hover:bg-muted"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>

//         {/* Calendar Grid */}
//         <div className="rounded-2xl bg-card p-4 shadow-md">
//           {/* Weekday Headers */}
//           <div className="mb-2 grid grid-cols-7 gap-1">
//             {WEEKDAYS.map((day) => (
//               <div
//                 key={day}
//                 className="py-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"
//               >
//                 {day}
//               </div>
//             ))}
//           </div>

//           {/* Days Grid */}
//           <div className="grid grid-cols-7 gap-1">
//             {calendarDays.map((day, index) => {
//               const dayEvents = getEventsForDate(events, day);
//               const isCurrentMonth = isSameMonth(day, currentDate);
//               const isSelected = selectedDate && isSameDay(day, selectedDate);

//               return (
//                 <CalendarDay
//                   key={day.toISOString()}
//                   date={day}
//                   events={dayEvents}
//                   isCurrentMonth={isCurrentMonth}
//                   isToday={isToday(day)}
//                   isSelected={isSelected || false}
//                   onClick={() => handleDateClick(day)}
//                   index={index}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         {/* Legend */}
//         <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
//           {[
//             { color: 'bg-tag-festival', label: 'Festival' },
//             { color: 'bg-tag-sales', label: 'Sales' },
//             { color: 'bg-tag-social', label: 'Social' },
//             { color: 'bg-tag-weekend', label: 'Weekend' },
//             { color: 'bg-tag-inventory', label: 'Inventory' },
//           ].map(({ color, label }) => (
//             <div key={label} className="flex items-center gap-1.5">
//               <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
//               <span className="text-xs text-muted-foreground">{label}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Detail Panel */}
//       {selectedDate && (
//         <EventDetailPanel
//           date={selectedDate}
//           events={selectedEvents}
//           onClose={handleClosePanel}
//         />
//       )}
//     </div>
//   );
// };

// // QuickStat Component
// const QuickStat = ({ icon: Icon, label, value, color }) => {
//   return (
//     <div className="flex items-center gap-2">
//       <Icon className={`h-4 w-4 ${color}`} />
//       <div>
//         <p className="text-lg font-bold text-foreground">{value}</p>
//         <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
//           {label}
//         </p>
//       </div>
//     </div>
//   );
// };

// // ============================================================================
// // MAIN APP COMPONENT
// // ============================================================================

// const Calender = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }
        
//         body {
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//         }
        
//         :root {
//           --background: 240 10% 3.9%;
//           --foreground: 0 0% 98%;
//           --card: 240 10% 8%;
//           --card-foreground: 0 0% 98%;
//           --primary: 142 76% 36%;
//           --primary-foreground: 144 61% 90%;
//           --secondary: 240 5% 26%;
//           --secondary-foreground: 0 0% 98%;
//           --muted: 240 5% 15%;
//           --muted-foreground: 240 5% 64.9%;
//           --accent: 240 5% 20%;
//           --accent-foreground: 0 0% 98%;
//           --destructive: 0 62.8% 30.6%;
//           --destructive-foreground: 0 0% 98%;
//           --border: 240 5% 20%;
//           --input: 240 5% 20%;
//           --ring: 142 76% 36%;
          
//           --tag-festival: 280 80% 60%;
//           --tag-festival-foreground: 0 0% 100%;
//           --tag-sales: 25 95% 53%;
//           --tag-sales-foreground: 0 0% 100%;
//           --tag-social: 200 80% 55%;
//           --tag-social-foreground: 0 0% 100%;
//           --tag-weekend: 340 75% 55%;
//           --tag-weekend-foreground: 0 0% 100%;
//           --tag-inventory: 45 93% 47%;
//           --tag-inventory-foreground: 0 0% 0%;
//         }
        
//         .bg-background { background-color: hsl(var(--background)); }
//         .bg-foreground { background-color: hsl(var(--foreground)); }
//         .bg-card { background-color: hsl(var(--card)); }
//         .bg-primary { background-color: hsl(var(--primary)); }
//         .bg-primary\\/5 { background-color: hsl(var(--primary) / 0.05); }
//         .bg-primary\\/10 { background-color: hsl(var(--primary) / 0.1); }
//         .bg-secondary { background-color: hsl(var(--secondary)); }
//         .bg-secondary\\/50 { background-color: hsl(var(--secondary) / 0.5); }
//         .bg-muted { background-color: hsl(var(--muted)); }
//         .bg-muted\\/20 { background-color: hsl(var(--muted) / 0.2); }
//         .bg-muted\\/30 { background-color: hsl(var(--muted) / 0.3); }
//         .bg-accent { background-color: hsl(var(--accent)); }
//         .bg-destructive { background-color: hsl(var(--destructive)); }
        
//         .bg-tag-festival { background-color: hsl(var(--tag-festival)); }
//         .bg-tag-sales { background-color: hsl(var(--tag-sales)); }
//         .bg-tag-social { background-color: hsl(var(--tag-social)); }
//         .bg-tag-weekend { background-color: hsl(var(--tag-weekend)); }
//         .bg-tag-inventory { background-color: hsl(var(--tag-inventory)); }
        
//         .text-foreground { color: hsl(var(--foreground)); }
//         .text-primary { color: hsl(var(--primary)); }
//         .text-primary\\/80 { color: hsl(var(--primary) / 0.8); }
//         .text-primary-foreground { color: hsl(var(--primary-foreground)); }
//         .text-secondary-foreground { color: hsl(var(--secondary-foreground)); }
//         .text-muted-foreground { color: hsl(var(--muted-foreground)); }
//         .text-destructive { color: hsl(var(--destructive)); }
        
//         .text-tag-festival-foreground { color: hsl(var(--tag-festival-foreground)); }
//         .text-tag-sales-foreground { color: hsl(var(--tag-sales-foreground)); }
//         .text-tag-social-foreground { color: hsl(var(--tag-social-foreground)); }
//         .text-tag-weekend-foreground { color: hsl(var(--tag-weekend-foreground)); }
//         .text-tag-inventory-foreground { color: hsl(var(--tag-inventory-foreground)); }
        
//         .border-border { border-color: hsl(var(--border)); }
//         .border-border\\/50 { border-color: hsl(var(--border) / 0.5); }
//         .border-primary\\/20 { border-color: hsl(var(--primary) / 0.2); }
        
//         .ring-primary { --tw-ring-color: hsl(var(--primary)); }
//         .ring-offset-2 { --tw-ring-offset-width: 2px; }
        
//         .shadow-soft {
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//         }
        
//         .shadow-card {
//           box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
//         }
        
//         .shadow-lg {
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
//         }
        
//         .shadow-hover {
//           box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
//         }
        
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
        
//         @keyframes slideIn {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
        
//         @keyframes expandIn {
//           from {
//             height: 0;
//             opacity: 0;
//           }
//           to {
//             height: auto;
//             opacity: 1;
//           }
//         }
        
//         .animate-pulse {
//           animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
        
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.5;
//           }
//         }
//       `}</style>
      
//       {/* Top Bar */}
//       <header className="border-b border-border/50 bg-card/50" style={{ backdropFilter: 'blur(8px)' }}>
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-soft">
//               <Store className="h-5 w-5 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="text-lg font-bold text-foreground">RetailPlan</h1>
//               <p className="text-xs text-muted-foreground">Smart Planning Calendar</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             {/* Quick Stats */}
//             <div className="hidden items-center gap-6 md:flex">
//               <QuickStat
//                 icon={Calendar}
//                 label="Events This Month"
//                 value="24"
//                 color="text-primary"
//               />
//               <QuickStat
//                 icon={TrendingUp}
//                 label="Opportunities"
//                 value="12"
//                 color="text-secondary-foreground"
//               />
//             </div>
//             {/* Notification Bell */}
//             <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background transition-colors hover:bg-muted">
//               <Bell className="h-5 w-5 text-muted-foreground" />
//               <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
//                 3
//               </span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="mx-auto max-w-7xl px-6 py-6">
//         <RetailCalendar />
//       </main>
//     </div>
//   );
// };

// export default Calender;

import React, { useState, useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
  getDay,
  addDays,
} from 'date-fns';
import {
  Store,
  TrendingUp,
  Calendar,
  Bell,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  X,
  CheckCircle2,
  Circle,
  Lightbulb,
  StickyNote,
  Sparkles,
  ShoppingBag,
  Tag as TagIcon,
  Users,
  Instagram,
  Package,
} from 'lucide-react';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// ============================================================================
// TYPE DEFINITIONS & CONFIG
// ============================================================================

const tagConfig = {
  festival: {
    label: 'Festival',
    className: 'bg-tag-festival text-tag-festival-foreground',
    icon: Sparkles,
  },
  sales: {
    label: 'Sales',
    className: 'bg-tag-sales text-tag-sales-foreground',
    icon: TagIcon,
  },
  social: {
    label: 'Social',
    className: 'bg-tag-social text-tag-social-foreground',
    icon: Instagram,
  },
  weekend: {
    label: 'Weekend',
    className: 'bg-tag-weekend text-tag-weekend-foreground',
    icon: ShoppingBag,
  },
  inventory: {
    label: 'Inventory',
    className: 'bg-tag-inventory text-tag-inventory-foreground',
    icon: Package,
  },
};

const priorityConfig = {
  high: {
    label: 'High Priority',
    className: 'text-destructive',
    dotClassName: 'bg-destructive',
  },
  medium: {
    label: 'Medium Priority',
    className: 'text-primary',
    dotClassName: 'bg-primary',
  },
  low: {
    label: 'Low Priority',
    className: 'text-muted-foreground',
    dotClassName: 'bg-muted-foreground',
  },
};

// ============================================================================
// DATA GENERATION
// ============================================================================

const createEvent = (
  date,
  title,
  tagType,
  priority,
  description,
  actions
) => ({
  id: `${date.toISOString()}-${title}`,
  date,
  title,
  tagType,
  priority,
  description,
  suggestedActions: actions.map((a, i) => ({
    id: `${date.toISOString()}-${i}`,
    ...a,
    completed: false,
  })),
  notes: '',
});

const generateMockEvents = (year, month) => {
  const events = [];
  const startDate = startOfMonth(new Date(year, month));
  const endDate = endOfMonth(new Date(year, month));
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Add weekend opportunities
  days.forEach((day) => {
    const dayOfWeek = getDay(day);
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      events.push(
        createEvent(
          day,
          'Weekend Rush',
          'weekend',
          'medium',
          'Higher footfall expected. Consider extended hours and extra staff.',
          [
            { title: 'Schedule extra staff', description: 'Ensure adequate coverage for busy hours', icon: 'users' },
            { title: 'Check inventory levels', description: 'Stock up on bestsellers', icon: 'package' },
            { title: 'Plan social post', description: 'Share weekend specials', icon: 'instagram' },
          ]
        )
      );
    }
  });

  // Festival events
  const festivals = [
    { day: 3, title: "Valentine's Week Start", desc: 'Love season begins! Perfect for gift promotions.' },
    { day: 8, title: "International Women's Day", desc: 'Celebrate with special offers for women.' },
    { day: 14, title: "Valentine's Day", desc: 'Peak gifting day - maximize visibility!' },
    { day: 17, title: 'Holi Festival', desc: 'Colors of joy! Great for festive merchandise.' },
    { day: 21, title: 'Spring Equinox', desc: 'New season, new collections launch opportunity.' },
  ];

  festivals.forEach(({ day, title, desc }) => {
    if (day <= days.length) {
      events.push(
        createEvent(
          days[day - 1],
          title,
          'festival',
          'high',
          desc,
          [
            { title: 'Create festive display', description: 'Decorate store with themed elements', icon: 'sparkles' },
            { title: 'Run special discount', description: 'Festival-themed offers', icon: 'percent' },
            { title: 'Social media campaign', description: 'Share festive content', icon: 'share' },
            { title: 'Stock festive items', description: 'Ensure themed products available', icon: 'gift' },
          ]
        )
      );
    }
  });

  // Sales opportunities
  const salesDays = [5, 10, 15, 20, 25];
  salesDays.forEach((day) => {
    if (day <= days.length) {
      events.push(
        createEvent(
          days[day - 1],
          'Flash Sale Day',
          'sales',
          'medium',
          'Perfect day for limited-time offers to boost sales.',
          [
            { title: 'Set discount prices', description: 'Prepare promotional pricing', icon: 'tag' },
            { title: 'Update POS system', description: 'Ensure discounts apply correctly', icon: 'settings' },
            { title: 'Train staff on offers', description: 'Brief team on promotions', icon: 'users' },
          ]
        )
      );
    }
  });

  // Social media days
  const socialDays = [2, 7, 12, 18, 23, 28];
  socialDays.forEach((day) => {
    if (day <= days.length) {
      events.push(
        createEvent(
          days[day - 1],
          'High Engagement Day',
          'social',
          'low',
          'Analytics show higher social media activity. Great for posting!',
          [
            { title: 'Post product showcase', description: 'Share new arrivals or bestsellers', icon: 'camera' },
            { title: 'Go live on Instagram', description: 'Connect with followers', icon: 'video' },
            { title: 'Respond to comments', description: 'Engage with your community', icon: 'message-circle' },
          ]
        )
      );
    }
  });

  // Inventory days
  const inventoryDays = [1, 16];
  inventoryDays.forEach((day) => {
    if (day <= days.length) {
      events.push(
        createEvent(
          days[day - 1],
          'Inventory Review',
          'inventory',
          'medium',
          'Time to check stock levels and reorder bestsellers.',
          [
            { title: 'Count current stock', description: 'Physical inventory check', icon: 'clipboard-list' },
            { title: 'Review sales data', description: 'Identify fast-moving items', icon: 'bar-chart' },
            { title: 'Place reorders', description: 'Restock popular items', icon: 'truck' },
          ]
        )
      );
    }
  });

  return events;
};

const getEventsForDate = (events, date) => {
  return events.filter(
    (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );
};

// ============================================================================
// UI COMPONENTS
// ============================================================================

// Button Component
const Button = ({ children, variant = 'default', size = 'default', className, onClick, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Textarea Component
const Textarea = ({ className, value, onChange, placeholder, ...props }) => {
  return (
    <textarea
      className={cn(
        'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

// EventTag Component
const EventTag = ({ type, size = 'sm', showIcon = true }) => {
  const config = tagConfig[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium transition-all',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
      )}
    >
      {showIcon && <Icon className={size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'} />}
      <span>{config.label}</span>
    </span>
  );
};

// PriorityBadge Component
const PriorityBadge = ({ priority }) => {
  const config = priorityConfig[priority];

  return (
    <div className="flex items-center gap-2">
      <span className={cn('h-2 w-2 rounded-full animate-pulse', config.dotClassName)} />
      <span className={cn('text-xs font-medium', config.className)}>{config.label}</span>
    </div>
  );
};

// CalendarDay Component
const CalendarDay = ({
  date,
  events,
  isCurrentMonth,
  isToday: isTodayProp,
  isSelected,
  onClick,
  index,
}) => {
  const dayOfWeek = getDay(date);
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Get unique event types (max 2 to show)
  const uniqueEvents = events.reduce((acc, event) => {
    if (!acc.find((e) => e.tagType === event.tagType)) {
      acc.push(event);
    }
    return acc;
  }, []);

  const displayEvents = uniqueEvents.slice(0, 2);
  const moreCount = uniqueEvents.length - 2;

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex min-h-[100px] flex-col rounded-xl p-2 text-left transition-all duration-200',
        'hover:shadow-lg hover:scale-[1.02] hover:z-10',
        isCurrentMonth ? 'bg-card' : 'bg-muted/30',
        isSelected && 'ring-2 ring-primary ring-offset-2',
        isTodayProp && 'bg-primary/5',
        !isCurrentMonth && 'opacity-40'
      )}
      style={{
        animation: `fadeIn 0.2s ease-out ${index * 0.01}s both`,
      }}
    >
      {/* Date Number */}
      <div className="flex items-start justify-between">
        <span
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-lg text-sm font-semibold transition-colors',
            isTodayProp && 'bg-primary text-primary-foreground',
            isWeekend && !isTodayProp && 'text-primary/80',
            !isTodayProp && !isWeekend && 'text-foreground'
          )}
        >
          {format(date, 'd')}
        </span>
        
        {events.length > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
            {events.length}
          </span>
        )}
      </div>

      {/* Event Tags */}
      <div className="mt-auto flex flex-col gap-1">
        {displayEvents.map((event) => (
          <EventTag key={event.id} type={event.tagType} size="sm" showIcon={false} />
        ))}
        {moreCount > 0 && (
          <span className="text-[10px] text-muted-foreground">+{moreCount} more</span>
        )}
      </div>

      {/* Hover indicator */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors group-hover:border-primary/20" />
    </button>
  );
};

// ActionItem Component
const ActionItem = ({ action, isCompleted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex w-full items-start gap-3 rounded-lg p-3 text-left transition-all',
        isCompleted ? 'bg-secondary/50' : 'bg-background hover:bg-muted/50'
      )}
    >
      {isCompleted ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary-foreground" />
      ) : (
        <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
      )}
      <div className="flex-1">
        <p
          className={cn(
            'text-sm font-medium',
            isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
          )}
        >
          {action.title}
        </p>
        <p className="text-xs text-muted-foreground">{action.description}</p>
      </div>
    </button>
  );
};

// EventDetailPanel Component
const EventDetailPanel = ({ date, events, onClose }) => {
  const [expandedEvent, setExpandedEvent] = useState(events[0]?.id || null);
  const [actionStates, setActionStates] = useState({});
  const [notes, setNotes] = useState({});

  const toggleAction = (actionId) => {
    setActionStates((prev) => ({
      ...prev,
      [actionId]: !prev[actionId],
    }));
  };

  const handleNoteChange = (eventId, note) => {
    setNotes((prev) => ({
      ...prev,
      [eventId]: note,
    }));
  };

  return (
    <div
      className="w-[400px] shrink-0 rounded-2xl bg-card p-6 shadow-lg"
      style={{
        animation: 'slideIn 0.3s ease-out',
      }}
    >
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {format(date, 'EEEE')}
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            {format(date, 'MMMM d, yyyy')}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-lg hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-12 text-center"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Sparkles className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-1 font-semibold text-foreground">No events planned</h3>
          <p className="text-sm text-muted-foreground">
            This day is free for regular business
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={cn(
                'rounded-xl border border-border/50 p-4 transition-all',
                expandedEvent === event.id ? 'bg-muted/30' : 'hover:bg-muted/20'
              )}
              style={{
                animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Event Header */}
              <button
                onClick={() =>
                  setExpandedEvent(expandedEvent === event.id ? null : event.id)
                }
                className="flex w-full items-start justify-between text-left"
              >
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <EventTag type={event.tagType} size="md" />
                    <PriorityBadge priority={event.priority} />
                  </div>
                  <h3 className="font-semibold text-foreground">{event.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedEvent === event.id && (
                <div className="mt-4 space-y-4" style={{ animation: 'expandIn 0.2s ease-out' }}>
                  {/* Suggested Actions */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Suggested Actions
                      </span>
                    </div>
                    <div className="space-y-2">
                      {event.suggestedActions.map((action) => (
                        <ActionItem
                          key={action.id}
                          action={action}
                          isCompleted={actionStates[action.id] || false}
                          onToggle={() => toggleAction(action.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <StickyNote className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Notes & Reminders
                      </span>
                    </div>
                    <Textarea
                      placeholder="Add your notes here..."
                      value={notes[event.id] || ''}
                      onChange={(e) => handleNoteChange(event.id, e.target.value)}
                      className="min-h-[80px] resize-none rounded-xl border-border/50 bg-background text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// RetailCalendar Component
const RetailCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const events = useMemo(() => {
    return generateMockEvents(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
    setSelectedDate(null);
    setSelectedEvents([]);
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
    setSelectedDate(null);
    setSelectedEvents([]);
  };

  const handleDateClick = (date) => {
    const dayEvents = getEventsForDate(events, date);
    setSelectedDate(date);
    setSelectedEvents(dayEvents);
  };

  const handleClosePanel = () => {
    setSelectedDate(null);
    setSelectedEvents([]);
  };

  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex h-full gap-6">
      {/* Calendar Section */}
      <div className="flex-1" style={{ transition: 'all 0.3s ease-in-out' }}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {format(currentDate, 'MMMM yyyy')}
              </h1>
              <p className="text-sm text-muted-foreground">
                Plan your retail success
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevMonth}
              className="h-10 w-10 rounded-xl border-border/50 hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentDate(new Date())}
              className="rounded-xl border-border/50 px-4 hover:bg-muted"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              className="h-10 w-10 rounded-xl border-border/50 hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="rounded-2xl bg-card p-4 shadow-md">
          {/* Weekday Headers */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const dayEvents = getEventsForDate(events, day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isSelected = selectedDate && isSameDay(day, selectedDate);

              return (
                <CalendarDay
                  key={day.toISOString()}
                  date={day}
                  events={dayEvents}
                  isCurrentMonth={isCurrentMonth}
                  isToday={isToday(day)}
                  isSelected={isSelected || false}
                  onClick={() => handleDateClick(day)}
                  index={index}
                />
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          {[
            { color: 'bg-tag-festival', label: 'Festival' },
            { color: 'bg-tag-sales', label: 'Sales' },
            { color: 'bg-tag-social', label: 'Social' },
            { color: 'bg-tag-weekend', label: 'Weekend' },
            { color: 'bg-tag-inventory', label: 'Inventory' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {selectedDate && (
        <EventDetailPanel
          date={selectedDate}
          events={selectedEvents}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
};

// QuickStat Component
const QuickStat = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-2">
      <Icon className={`h-4 w-4 ${color}`} />
      <div>
        <p className="text-lg font-bold text-foreground">{value}</p>
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

const Calender = () => {
  return (
    <div className="min-h-screen bg-background">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        :root {
          --background: 0 0% 100%;
          --foreground: 222.2 84% 4.9%;
          --card: 0 0% 100%;
          --card-foreground: 222.2 84% 4.9%;
          --primary: 142 76% 36%;
          --primary-foreground: 0 0% 100%;
          --secondary: 210 40% 96.1%;
          --secondary-foreground: 222.2 47.4% 11.2%;
          --muted: 210 40% 96.1%;
          --muted-foreground: 215.4 16.3% 46.9%;
          --accent: 210 40% 96.1%;
          --accent-foreground: 222.2 47.4% 11.2%;
          --destructive: 0 84.2% 60.2%;
          --destructive-foreground: 0 0% 100%;
          --border: 214.3 31.8% 91.4%;
          --input: 214.3 31.8% 91.4%;
          --ring: 142 76% 36%;
          
          --tag-festival: 280 80% 60%;
          --tag-festival-foreground: 0 0% 100%;
          --tag-sales: 25 95% 53%;
          --tag-sales-foreground: 0 0% 100%;
          --tag-social: 200 80% 55%;
          --tag-social-foreground: 0 0% 100%;
          --tag-weekend: 340 75% 55%;
          --tag-weekend-foreground: 0 0% 100%;
          --tag-inventory: 45 93% 47%;
          --tag-inventory-foreground: 0 0% 0%;
        }
        
        .bg-background { background-color: hsl(var(--background)); }
        .bg-foreground { background-color: hsl(var(--foreground)); }
        .bg-card { background-color: hsl(var(--card)); }
        .bg-primary { background-color: hsl(var(--primary)); }
        .bg-primary\\/5 { background-color: hsl(var(--primary) / 0.05); }
        .bg-primary\\/10 { background-color: hsl(var(--primary) / 0.1); }
        .bg-secondary { background-color: hsl(var(--secondary)); }
        .bg-secondary\\/50 { background-color: hsl(var(--secondary) / 0.5); }
        .bg-muted { background-color: hsl(var(--muted)); }
        .bg-muted\\/20 { background-color: hsl(var(--muted) / 0.2); }
        .bg-muted\\/30 { background-color: hsl(var(--muted) / 0.3); }
        .bg-accent { background-color: hsl(var(--accent)); }
        .bg-destructive { background-color: hsl(var(--destructive)); }
        
        .bg-tag-festival { background-color: hsl(var(--tag-festival)); }
        .bg-tag-sales { background-color: hsl(var(--tag-sales)); }
        .bg-tag-social { background-color: hsl(var(--tag-social)); }
        .bg-tag-weekend { background-color: hsl(var(--tag-weekend)); }
        .bg-tag-inventory { background-color: hsl(var(--tag-inventory)); }
        
        .text-foreground { color: hsl(var(--foreground)); }
        .text-primary { color: hsl(var(--primary)); }
        .text-primary\\/80 { color: hsl(var(--primary) / 0.8); }
        .text-primary-foreground { color: hsl(var(--primary-foreground)); }
        .text-secondary-foreground { color: hsl(var(--secondary-foreground)); }
        .text-muted-foreground { color: hsl(var(--muted-foreground)); }
        .text-destructive { color: hsl(var(--destructive)); }
        
        .text-tag-festival-foreground { color: hsl(var(--tag-festival-foreground)); }
        .text-tag-sales-foreground { color: hsl(var(--tag-sales-foreground)); }
        .text-tag-social-foreground { color: hsl(var(--tag-social-foreground)); }
        .text-tag-weekend-foreground { color: hsl(var(--tag-weekend-foreground)); }
        .text-tag-inventory-foreground { color: hsl(var(--tag-inventory-foreground)); }
        
        .border-border { border-color: hsl(var(--border)); }
        .border-border\\/50 { border-color: hsl(var(--border) / 0.5); }
        .border-primary\\/20 { border-color: hsl(var(--primary) / 0.2); }
        
        .ring-primary { --tw-ring-color: hsl(var(--primary)); }
        .ring-offset-2 { --tw-ring-offset-width: 2px; }
        
        .shadow-soft {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .shadow-card {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }
        
        .shadow-lg {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }
        
        .shadow-hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes expandIn {
          from {
            height: 0;
            opacity: 0;
          }
          to {
            height: auto;
            opacity: 1;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
      
      {/* Top Bar */}
      <header className="border-b border-border/50 bg-card/50" style={{ backdropFilter: 'blur(8px)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-soft">
              <Store className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">RetailPlan</h1>
              <p className="text-xs text-muted-foreground">Smart Planning Calendar</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Quick Stats */}
            <div className="hidden items-center gap-6 md:flex">
              <QuickStat
                icon={Calendar}
                label="Events This Month"
                value="24"
                color="text-primary"
              />
              <QuickStat
                icon={TrendingUp}
                label="Opportunities"
                value="12"
                color="text-secondary-foreground"
              />
            </div>
            {/* Notification Bell */}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background transition-colors hover:bg-muted">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        <RetailCalendar />
      </main>
    </div>
  );
};

export default Calender;