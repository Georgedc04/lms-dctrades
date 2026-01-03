export function Roadmap() {
  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 relative">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Your Roadmap to Trading Mastery
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
            A clear, step-by-step path from market basics to professional execution.
          </p>
          
          {/* Handwritten Annotation */}
          <div className="absolute -top-6 right-[10%] hidden lg:block">
            <p className="font-handwritten text-indigo-500 text-xl -rotate-6">
              Takes approx. 3 months
            </p>
            <svg className="w-12 h-12 text-indigo-400 mt-1 ml-4 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Refined Connecting Line */}
          <div className="absolute top-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent hidden md:block" />
          
          <StepCard 
            number="01" 
            title="Initialize Account" 
            desc="Quick sign up with Clerk to get instant access to our learning vault." 
          />
          <StepCard 
            number="02" 
            title="Select Curriculum" 
            desc="Choose from a variety of courses tailored to different market conditions." 
          />
          <StepCard 
            number="03" 
            title="Execute Strategy" 
            desc="Apply learned concepts and track your improvement in real-time." 
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center group relative z-10">
      {/* Step Circle */}
      <div className="h-20 w-20 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-8 group-hover:border-indigo-200 group-hover:shadow-indigo-100/50 transition-all duration-500">
        <span className="text-xl font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
          {number}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-[240px]">
        {desc}
      </p>

      {/* Subtle background glow on hover */}
      <div className="absolute -inset-4 bg-slate-50 opacity-0 group-hover:opacity-100 rounded-3xl -z-10 transition-opacity duration-500" />
    </div>
  );
}