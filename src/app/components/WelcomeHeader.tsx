export function WelcomeHeader() {
  return (
    <div className="bg-gradient-to-r from-[#C9A86A] to-[#B89860] rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-4">Welcome to Basket Analysis Dashboard</h1>
          <div className="flex gap-3">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              View Dataset
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Run Analysis
            </button>
          </div>
        </div>
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/40 to-white/20 flex items-center justify-center text-2xl font-bold">
            G2
          </div>
        </div>
      </div>
    </div>
  );
}
