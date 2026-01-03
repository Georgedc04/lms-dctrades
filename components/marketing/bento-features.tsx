import { PlayCircle, BarChart3, ShieldCheck, GraduationCap } from "lucide-react";

export function BentoFeatures() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Main Feature - Structured Curriculum */}
        <div className="md:col-span-2 bg-slate-900 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden group border border-slate-800">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
                <PlayCircle className="h-5 w-5 text-indigo-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">
                Structured Video Curriculum
              </h3>
              <p className="text-slate-400 text-sm md:text-base max-w-sm leading-relaxed">
                Our courses are broken down into logical modules, providing a step-by-step path from basics to advanced execution.
              </p>
            </div>
            
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-800" />
                ))}
              </div>
              <span className="text-xs md:text-sm font-medium text-slate-400">
                Join 2,400+ active students
              </span>
            </div>
          </div>
          {/* Subtle radial glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
        </div>

        {/* Small Feature - Progress */}
        <div className="bg-indigo-600 rounded-[2rem] p-8 text-white flex flex-col justify-between hover:bg-indigo-700 transition-all duration-300 group">
          <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
            <BarChart3 className="h-5 w-5 text-indigo-100" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-2 tracking-tight text-white">Progress Tracking</h3>
            <p className="text-indigo-100/80 text-sm leading-relaxed">
              Visual metrics to monitor your journey toward market mastery.
            </p>
          </div>
        </div>

        {/* Small Feature - Secure */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 flex flex-col justify-between hover:border-indigo-300 transition-all duration-300">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 tracking-tight">Secure Access</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Enterprise-grade security powered by Clerk for your peace of mind.
            </p>
          </div>
        </div>

        {/* Medium Feature - Certification */}
        <div className="md:col-span-2 bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-200 flex items-center justify-between group overflow-hidden relative">
          <div className="max-w-xs relative z-10">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center mb-6">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight">Certified Learning</h3>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Complete modules and receive a verified certification of completion from our mentors.
            </p>
          </div>
          
          {/* Decorative Card Mockup with Handwriting */}
          <div className="hidden sm:block relative">
            <div className="h-36 w-52 bg-white rounded-xl border border-slate-200 rotate-6 translate-x-6 group-hover:rotate-0 group-hover:translate-x-0 transition-all duration-500 shadow-2xl flex flex-col p-4">
               {/* Certificate Title Skeleton */}
               <div className="space-y-1 mb-4">
                  <div className="h-1 w-8 bg-slate-100 rounded" />
                  <div className="h-1.5 w-full bg-slate-100 rounded" />
               </div>

               {/* Student Name - Handwritten */}
               <div className="mt-auto">
                 <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">Student Name</p>
                 <p className="text-xl text-indigo-600 font-handwritten leading-none -rotate-2">
                   Alex Rivera
                 </p>
               </div>

               {/* Signature & Seal */}
               <div className="flex items-end justify-between mt-3">
                  <div className="space-y-1">
                    <div className="h-[1px] w-12 bg-slate-200" />
                    <p className="text-[7px] text-slate-400 font-handwritten">Course Director</p>
                  </div>
                  <div className="h-7 w-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-indigo-500 opacity-10 animate-pulse" />
                  </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}