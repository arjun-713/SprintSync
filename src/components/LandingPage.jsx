import { Users, Clock, Zap, ArrowRight } from 'lucide-react'

export default function LandingPage({ onNavigate }) {

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="py-6 px-6 border-b-4 border-black bg-[#C8F7DC]">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center">
              <span className="text-white font-black text-xl">S</span>
            </div>
            <span className="text-2xl font-black uppercase">SprintSync</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 text-sm font-black uppercase border-4 border-black bg-white hover:bg-[#FFE5B4] transition-all">
              Products
            </button>
            <button className="px-6 py-3 text-sm font-black uppercase border-4 border-black bg-white hover:bg-[#FFE5B4] transition-all">
              Resources
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 text-sm font-black uppercase text-white bg-black border-4 border-black hover:bg-white hover:text-black transition-all"
            >
              Get started
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#FFE5B4] border-b-4 border-black py-20 md:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-6">
                Plan sprints across time zones
              </h1>
              <p className="text-xl md:text-2xl font-bold mb-10 max-w-3xl mx-auto">
                Unify your global teams with intelligent sprint planning. Coordinate seamlessly, ship faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-3 px-10 py-5 text-lg font-black uppercase text-white bg-black border-4 border-black hover:bg-white hover:text-black transition-all"
                >
                  Get it free
                  <ArrowRight className="w-6 h-6" />
                </button>
                <button className="px-10 py-5 text-lg font-black uppercase border-4 border-black bg-white hover:bg-[#C8F7DC] transition-all">
                  View demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
                Everything you need to ship faster
              </h2>
              <p className="text-xl font-bold max-w-2xl mx-auto">
                Powerful features designed for distributed agile teams
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-[#C8F7DC] border-4 border-black p-8">
                <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center mb-6">
                  <Users className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-3">Global Collaboration</h3>
                <p className="font-bold text-lg leading-relaxed">
                  Seamlessly coordinate across time zones with intelligent scheduling and real-time updates.
                </p>
              </div>
              <div className="bg-[#FFE5B4] border-4 border-black p-8">
                <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center mb-6">
                  <Clock className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-3">Smart Scheduling</h3>
                <p className="font-bold text-lg leading-relaxed">
                  Find optimal meeting windows automatically. No more timezone math headaches.
                </p>
              </div>
              <div className="bg-[#E8E4F3] border-4 border-black p-8">
                <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center mb-6">
                  <Zap className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-3">Instant Insights</h3>
                <p className="font-bold text-lg leading-relaxed">
                  Real-time sprint analytics and progress tracking for data-driven decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#FFB6C1] border-t-4 border-b-4 border-black">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">
              Ready to transform your sprint planning?
            </h2>
            <p className="text-xl font-bold mb-10 max-w-2xl mx-auto">
              Join thousands of teams already using SprintSync to ship better products faster.
            </p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-12 py-5 text-lg font-black uppercase text-white bg-black border-4 border-black hover:bg-white hover:text-black transition-all"
            >
              Start for free
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t-4 border-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-white border-4 border-white flex items-center justify-center">
                <span className="text-black font-black text-lg">S</span>
              </div>
              <span className="text-xl font-black uppercase">SprintSync</span>
            </div>
            <div className="flex gap-8 text-sm font-black uppercase">
              <a href="#" className="hover:text-[#C8F7DC] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#C8F7DC] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#C8F7DC] transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
