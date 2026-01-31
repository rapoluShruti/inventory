import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  Play,
  Filter,
  Plus,
  Search,
  MoreHorizontal,
} from "lucide-react";

export default function Landing() {
  const containerRef = useRef(null);

  const flipWords = useMemo(
    () => [
      "increased productivity",
      "improved collaboration",
      "dynamic teams",
      "you",
    ],
    []
  );
  const [wIdx, setWIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setWIdx((p) => (p + 1) % flipWords.length),
      1600
    );
    return () => clearInterval(t);
  }, [flipWords.length]);

  // Sections
  const heroRef = useRef(null);
  const ganttRef = useRef(null);
  const featuresRef = useRef(null);
  const notesRef = useRef(null);

  // Moving Bars
  const barPurple = useRef(null);
  const barOrange = useRef(null);
  const barGreen = useRef(null);
  const barBlue = useRef(null);

  // HERO slots (ONLY TOP widgets)
  const heroSlot1 = useRef(null);
  const heroSlot2 = useRef(null);
  const heroSlot3 = useRef(null);
  const heroSlot4 = useRef(null);

  // Gantt slots
  const ganttSlot1 = useRef(null);
  const ganttSlot2 = useRef(null);
  const ganttSlot3 = useRef(null);
  const ganttSlot4 = useRef(null);

  // Features slots (IMAGES)
  const featuresSlot1 = useRef(null);
  const featuresSlot2 = useRef(null);
  const featuresSlot3 = useRef(null);
  const featuresSlot4 = useRef(null);

  // Notes slots (CUTE SQUARES WITH TEXT)
  const notesSlot1 = useRef(null);
  const notesSlot2 = useRef(null);
  const notesSlot3 = useRef(null);
  const notesSlot4 = useRef(null);

  useEffect(() => {
    const bars = [
      {
        bar: barPurple.current,
        slots: [heroSlot1, ganttSlot1, featuresSlot1, notesSlot1],
      },
      {
        bar: barOrange.current,
        slots: [heroSlot2, ganttSlot2, featuresSlot2, notesSlot2],
      },
      {
        bar: barGreen.current,
        slots: [heroSlot3, ganttSlot3, featuresSlot3, notesSlot3],
      },
      {
        bar: barBlue.current,
        slots: [heroSlot4, ganttSlot4, featuresSlot4, notesSlot4],
      },
    ];

    const sections = [heroRef, ganttRef, featuresRef, notesRef];

    const shapeStyles = [
      { borderRadius: "999px" }, // HERO - pill
      { borderRadius: "14px" }, // GANTT
      { borderRadius: "18px" }, // FEATURES - image blocks
      { borderRadius: "16px" }, // NOTES - cute square badge
    ];

    const applyToSlot = (bar, slot, sectionIndex) => {
      if (!slot || !containerRef.current) return;

      const slotRect = slot.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      let left = slotRect.left - containerRect.left;
      let top = slotRect.top - containerRect.top + containerRef.current.scrollTop;

      let width = slotRect.width;
      let height = slotRect.height;

      // ✅ Notes => force square always
      if (sectionIndex === 3) {
        const s = Math.min(width, height);
        width = s;
        height = s;
      }

      bar.style.left = `${left}px`;
      bar.style.top = `${top}px`;
      bar.style.width = `${width}px`;
      bar.style.height = `${height}px`;
      bar.style.borderRadius = shapeStyles[sectionIndex].borderRadius;
    };

    const moveBarsToSection = (sectionIndex) => {
      bars.forEach(({ bar, slots }) => {
        const slot = slots[sectionIndex]?.current;
        if (!bar || !slot) return;
        applyToSlot(bar, slot, sectionIndex);
      });
    };

    const initBars = () => {
      bars.forEach(({ bar, slots }) => {
        const slot = slots[0]?.current;
        if (!bar || !slot) return;

        bar.style.position = "absolute";
        bar.style.pointerEvents = "none";

        // ✅ always above content
        bar.style.zIndex = "9999";

        bar.style.transition =
          "all 0.85s cubic-bezier(0.4, 0, 0.2, 1)";
        bar.style.willChange = "left, top, width, height";

        applyToSlot(bar, slot, 0);
      });
    };

    const getActiveSectionIndex = () => {
      if (!containerRef.current) return 0;

      const scrollY = containerRef.current.scrollTop;
      const viewportHeight = containerRef.current.clientHeight;
      const mid = scrollY + viewportHeight / 2;

      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i]?.current;
        if (!sec) continue;

        const rect = sec.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const top = rect.top - containerRect.top + scrollY;
        const bottom = top + rect.height;

        if (mid >= top && mid <= bottom) return i;
      }
      return 0;
    };

    const handleScroll = () => {
      const idx = getActiveSectionIndex();
      moveBarsToSection(idx);
    };

    const handleResize = () => {
      handleScroll();
    };

    const t = setTimeout(() => {
      initBars();
      handleScroll();
    }, 120);

    const container = containerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(t);
      if (container) container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-white h-screen overflow-y-auto"
    >
      {/* moving bars */}
      <div ref={barPurple} className="moving-bar bar-purple" />
      <div ref={barOrange} className="moving-bar bar-orange" />
      <div ref={barGreen} className="moving-bar bar-green" />
      <div ref={barBlue} className="moving-bar bar-blue" />

      <style>{`
      .zoho-grid {
        background-image:
        linear-gradient(to right, rgba(15, 23, 42, 0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(15, 23, 42, 0.06) 1px, transparent 1px);
        background-size: 160px 160px;
      }

      .moving-bar {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0.95;
        box-shadow: 0 18px 50px -16px rgba(0,0,0,0.35);
        mix-blend-mode: multiply;
      }

      .bar-purple {
        background: linear-gradient(90deg, rgba(168,85,247,0.95), rgba(168,85,247,0.18));
        overflow: hidden;
      }
      .bar-purple::before{
        content:"";
        position:absolute;
        inset:0;
        background-image: radial-gradient(rgba(255,255,255,0.4) 1.4px, transparent 1.4px);
        background-size: 12px 12px;
        opacity:0.7;
      }

      .bar-orange {
        background: linear-gradient(90deg, rgba(249,115,22,0.95), rgba(249,115,22,0.18));
        overflow: hidden;
      }
      .bar-orange::before{
        content:"";
        position:absolute;
        inset:0;
        background-image: repeating-linear-gradient(
        135deg,
        rgba(255,255,255,0.42) 0px,
        rgba(255,255,255,0.42) 7px,
        transparent 7px,
        transparent 14px
        );
        opacity:0.62;
      }

      .bar-green {
        background: linear-gradient(90deg, rgba(34,197,94,0.95), rgba(34,197,94,0.18));
        overflow: hidden;
      }
      .bar-green::before{
        content:"";
        position:absolute;
        inset:0;
        background-image: repeating-linear-gradient(
        90deg,
        rgba(255,255,255,0.4) 0px,
        rgba(255,255,255,0.4) 10px,
        transparent 10px,
        transparent 18px
        );
        opacity:0.55;
      }

      .bar-blue {
        background: linear-gradient(90deg, rgba(59,130,246,0.95), rgba(59,130,246,0.18));
        overflow: hidden;
      }
      .bar-blue::before{
        content:"";
        position:absolute;
        inset:-20px;
        background:
        radial-gradient(circle at 20px 20px, rgba(255,255,255,0.45) 2px, transparent 3px),
        radial-gradient(circle at 50px 50px, rgba(255,255,255,0.35) 2px, transparent 3px);
        opacity:0.45;
        transform: rotate(8deg);
      }

      @keyframes floaty {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      .floaty { animation: floaty 2.7s ease-in-out infinite; }
      .floaty2 { animation: floaty 2.7s ease-in-out infinite; animation-delay: .15s; }
      .floaty3 { animation: floaty 2.7s ease-in-out infinite; animation-delay: .30s; }
      .floaty4 { animation: floaty 2.7s ease-in-out infinite; animation-delay: .45s; }
      `}</style>

      <div className="relative">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 zoho-grid" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#d9fff6] via-[#dcecff] to-[#ffe6ef] opacity-95" />

        <div className="relative z-20 mx-auto max-w-7xl px-6 pt-6 pb-20">
        <div className="text-center mt-14">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05]">
          Construction management
          <br />
          software built for
          <br />
          <span className="text-blue-600">{flipWords[wIdx]}</span>
          </h1>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-8 text-lg font-semibold text-slate-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-slate-900" />
            Plan your projects
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-slate-900" />
            Track work efficiently
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-slate-900" />
            All your team, one platform
          </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-red-600 text-white font-bold px-12 py-4 rounded-md shadow text-lg">
            SIGN UP NOW
          </button>
          <button className="w-full sm:w-auto border border-slate-900/40 bg-white/50 backdrop-blur font-bold px-12 py-4 rounded-md inline-flex items-center justify-center gap-2 text-lg">
            <Play size={18} />
            WATCH VIDEO
          </button>
          </div>

        
          <p className="mt-3 text-base text-slate-700">
          "An outstanding service for project management, packs more
          features than many others."
          </p>
        </div>

        {/* ✅ ONLY ON HERO */}
        <div className="relative mt-14 min-h-[500px] hidden lg:block">
          <div className="absolute left-0 top-0 floaty">
          <HeroWidget
            role="Project Manager"
            pillColor="bg-purple-200"
            slotRef={heroSlot1}
            inner={<StatusDonut />}
          />
          </div>

          <div className="absolute right-0 top-20 floaty2">
          <HeroWidget
            role="Supervisor"
            pillColor="bg-orange-200"
            slotRef={heroSlot2}
            inner={<TaskProgressCard />}
          />
          </div>

          <div className="absolute left-0 bottom-0 floaty3">
          <HeroWidget
            role="Site Engineer"
            pillColor="bg-green-200"
            slotRef={heroSlot3}
            inner={<ChatWidget />}
            wide
          />
          </div>

          <div className="absolute right-10 bottom-0 floaty4">
          <HeroWidget
            role="Owner"
            pillColor="bg-blue-200"
            slotRef={heroSlot4}
            inner={<ReviewWidget />}
            compact
          />
          </div>
        </div>
        </div>
      </section>

      {/* GANTT */}
      <section ref={ganttRef} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 zoho-grid" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e7f0ff] via-white to-[#ffece7] opacity-70" />

        <div className="relative z-20 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[330px_1fr] gap-10 items-start">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-[#0b2a66]">
          <div className="px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3 text-white">
            <div className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center">
              <div className="h-4 w-4 rounded bg-gradient-to-br from-blue-400 to-purple-400" />
            </div>
            <p className="font-black text-lg">Projects</p>
            </div>
          </div>

          <div className="px-4 py-4 space-y-2 text-white/90 text-sm">
            <SideItem label="Home" active />
            <SideItem label="Feed" />
            <SideItem label="Discuss" />
            <SideItem label="Reports" />
            <SideItem label="Calendar" />
            <SideItem label="Projects" />
          </div>

          <div className="px-4 py-5 border-t border-white/10 text-white/85 text-sm">
            <p className="font-bold mb-3">Work Overview</p>
            <div className="space-y-2">
            <SideItem label="Tasks" />
            <SideItem label="Bugs" />
            <SideItem label="Milestones" />
            <SideItem label="Timesheets" />
            </div>
          </div>

          <div className="px-4 py-4 border-t border-white/10">
            <p className="text-xs text-white/70 font-bold mb-2">
            Recent Projects
            </p>
            <div className="text-sm text-white/90 space-y-1">
            <p className="hover:text-white cursor-pointer">
              Skyline Residences
            </p>
            <p className="hover:text-white cursor-pointer">
              Projects Marketing
            </p>
            </div>
          </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between">
            <div>
            <p className="font-black text-slate-900 text-lg">
              PR-001{" "}
              <span className="font-black">Zylker solutions</span>
            </p>

            <div className="mt-2 flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
              <button className="hover:text-slate-900">Dashboard</button>
              <button className="text-blue-600 font-black">Tasks</button>
              <button className="hover:text-slate-900">Task List</button>
              <button className="hover:text-slate-900">Issues</button>
              <button className="hover:text-slate-900">Milestones</button>
              <button className="hover:text-slate-900">Timesheet</button>
              <button className="hover:text-slate-900">Reports</button>
              <button className="hover:text-slate-900">Finance</button>
            </div>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
            <button className="p-2 rounded-md hover:bg-slate-100">
              <Plus size={18} />
            </button>
            <button className="p-2 rounded-md hover:bg-slate-100">
              <Search size={18} />
            </button>
            <button className="p-2 rounded-md hover:bg-slate-100">
              <MoreHorizontal size={18} />
            </button>
            </div>
          </div>

          <div className="px-6 py-3 border-b border-slate-200 flex items-center justify-between">
            <button className="text-sm font-bold text-blue-600 hover:underline">
            All Projects
            </button>

            <div className="flex items-center gap-3">
            <button className="text-sm font-bold px-4 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50">
              Gantt
            </button>
            <button className="text-sm font-bold px-4 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50">
              Automation
            </button>
            <button className="text-sm font-black px-4 py-2 rounded-md bg-blue-600 text-white shadow">
              Add task
            </button>
            <button className="p-2 rounded-md border border-slate-200 hover:bg-slate-50">
              <Filter size={18} />
            </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-[240px_1fr] gap-4">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 font-bold text-slate-800 text-sm">
              Task
              </div>
              <div className="divide-y divide-slate-200 text-sm">
              <TaskRow code="ZS-T102" title="Project Planning" />
              <TaskRow code="ZS-T103" title="Design" />
              <TaskRow code="ZS-T104" title="Development" />
              <TaskRow code="ZS-T105" title="Review" />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 text-xs text-slate-500 font-semibold">
              JAN '2024
              </div>

              <div className="p-4 space-y-5">
              <div
                ref={ganttSlot1}
                className="h-10 rounded-lg bg-slate-100/50"
              />
              <div
                ref={ganttSlot2}
                className="h-10 rounded-lg bg-slate-100/50 ml-[15%] w-[85%]"
              />
              <div
                ref={ganttSlot3}
                className="h-10 rounded-lg bg-slate-100/50 ml-[30%] w-[70%]"
              />
              <div
                ref={ganttSlot4}
                className="h-10 rounded-lg bg-slate-100/50 ml-[20%] w-[80%]"
              />
              </div>
            </div>
            </div>

            <div className="mt-10 max-w-xl">
            <h2 className="text-5xl font-black text-slate-900 leading-tight">
              See the big picture
              <br />
              with Gantt charts
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Use Gantt charts to build your project plan and track your
              task schedule.
            </p>
            </div>
          </div>
          </div>
        </div>
        </div>
      </section>

      {/* FEATURES (bars become image blocks here) */}
      <section ref={featuresRef} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 zoho-grid" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 opacity-80" />

        <div className="relative z-20 mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-slate-900 mb-4">
          Powerful features for your team
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Everything you need to manage projects, track progress, and
          collaborate effectively
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureImageCard
          slotRef={featuresSlot1}
          title="Analytics"
          img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=60"
          />
          <FeatureImageCard
          slotRef={featuresSlot2}
          title="Multilingual"
          img="https://images.unsplash.com/photo-1706403615881-d83dc2067c5d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <FeatureImageCard
          slotRef={featuresSlot3}
          title="Chat-Bot"
          img="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=60"
          />
          <FeatureImageCard
          slotRef={featuresSlot4}
          title="Automation"
          img="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=60"
          />
        </div>
        </div>
      </section>

      {/* NOTES (cute squares with text like Review) */}
      <section ref={notesRef} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 zoho-grid" />
        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-50/70 via-white to-pink-50/70" />

        <div className="relative z-20 mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-slate-900 mb-4">
          Digitizing construction workflows
          </h2>
          <p className="text-lg text-slate-600">
          
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 max-w-4xl mx-auto place-items-center">
        <SquareBadge slotRef={notesSlot1} label="Fewer delays, better builds." />
<SquareBadge slotRef={notesSlot2} label="Where construction meets clarity." />
<SquareBadge slotRef={notesSlot3} label="Finally, construction software that makes sense." />
<SquareBadge slotRef={notesSlot4} label="Project management that builds success" />

        </div>
        </div>
      </section>

      <div className="h-20" />
      </div>
    </div>
    );
}

/* ---------------------------- Components ---------------------------- */

function HeroWidget({
  role,
  pillColor,
  inner,
  wide = false,
  compact = false,
  slotRef,
}) {
  return (
    <div
      className={`relative ${
        wide ? "w-[420px]" : compact ? "w-[320px]" : "w-[360px]"
      }`}
    >
      <div
        ref={slotRef}
        className={`h-10 ${pillColor} rounded-full flex items-center gap-3 px-3 shadow-lg relative z-10`}
      >
        <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center text-xs font-black text-slate-700">
          🙂
        </div>
        <p className="text-sm font-bold text-slate-700">{role}</p>
      </div>

      <div className="mt-2 rounded-xl border border-slate-200 bg-white shadow-xl p-4">
        {inner}
      </div>
    </div>
  );
}

function StatusDonut() {
  return (
    <div>
      <p className="font-bold text-slate-900 text-sm mb-3">
        Team project status report
      </p>
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full border-[10px] border-slate-200 relative">
          <div className="absolute inset-0 rounded-full border-[10px] border-blue-500 border-t-transparent border-r-transparent" />
        </div>

        <div className="text-xs text-slate-600 space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            Active
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            In Progress
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Completed
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskProgressCard() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-bold text-slate-900 text-sm">Task progress</p>
        <p className="text-xs text-slate-500 mt-1">Martin Young</p>
        <p className="text-xs text-slate-500">02/01/2024 to 14/01/2024</p>
        <p className="text-xs font-bold text-red-500 mt-2">
          02 day(s) behind schedule
        </p>
      </div>

      <div className="h-14 w-14 rounded-full border-[8px] border-slate-200 relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-[8px] border-blue-500 border-t-transparent border-r-transparent" />
        <p className="text-xs font-black text-blue-600">21%</p>
      </div>
    </div>
  );
}

function ChatWidget() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="font-bold text-slate-900 text-sm">App integration</p>
        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
          AI
        </span>
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
        Dear <span className="text-blue-600 font-bold">@team</span> please look
        into this issue #3671
      </div>
      <p className="mt-2 text-[10px] text-slate-400">11:32 am</p>
    </div>
  );
}

function ReviewWidget() {
  return (
    <div>
      <p className="font-bold text-slate-900 text-sm mb-3">Review</p>
      <div className="h-9 rounded-lg bg-slate-200" />
    </div>
  );
}

function SideItem({ label, active }) {
  return (
    <button
      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition ${
        active ? "bg-white/15 text-white" : "text-white/85 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function TaskRow({ code, title }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between">
      <p className="text-xs font-bold text-slate-500">{code}</p>
      <p className="text-sm font-semibold text-slate-800">{title}</p>
    </div>
  );
}

/* ✅ Features: Image cards (bars lock here) */
function FeatureImageCard({ slotRef, title, img }) {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-40 w-full overflow-hidden">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* slot where bar converts into image highlight */}
      <div ref={slotRef} className="mx-5 mt-5 h-12 rounded-2xl bg-slate-100" />

      <div className="px-5 pt-4 pb-6">
        <h3 className="font-black text-slate-900 text-lg">{title}</h3>
        <p className="text-sm text-slate-600 mt-2">
          Beautiful UI blocks 
        </p>
      </div>
    </div>
  );
}

/* ✅ Notes: small cute square with text "Review" written on it */
function SquareBadge({ slotRef, label }) {
  return (
    <div className="relative flex justify-center">
      <div
        ref={slotRef}
        className="
          relative
          w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48
          flex items-center justify-center
          rounded-2xl
          bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300
          shadow-[0_16px_40px_rgba(0,0,0,0.22)]
          rotate-[-2deg]
          hover:rotate-0 hover:scale-105
          transition-all duration-300
        "
      >
        {/* Tape */}
        <div className="
          absolute -top-4 left-1/2 -translate-x-1/2
          w-12 h-4
          bg-white/70
          border border-black/10
          rounded-sm
          shadow
        " />

        {/* Text */}
        <p className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 text-center px-3">
          {label}
        </p>

        {/* Folded corner */}
        <div className="
          absolute bottom-0 right-0
          w-6 h-6
          bg-gradient-to-br from-yellow-200 to-yellow-400
          clip-path-[polygon(0_100%,100%_0,100%_100%)]
        " />
      </div>
    </div>
  );
}


function FloatingComment({ text, position = "top-right", delay = 0 }) {
  const positions = {
    "top-right": "-top-4 -right-5",
    "top-left": "-top-4 -left-5",
    "bottom-right": "-bottom-4 -right-5",
    "bottom-left": "-bottom-4 -left-5",
  };

  return (
    <div
      className={`
        absolute ${positions[position]}
        bg-white/90 backdrop-blur
        border border-slate-200
        px-3 py-1.5
        rounded-full
        shadow-md
        text-xs font-semibold text-slate-700
        animate-[float_3s_ease-in-out_infinite]
      `}
      style={{ animationDelay: `${delay}s` }}
    >
      {text}
    </div>
  );
}