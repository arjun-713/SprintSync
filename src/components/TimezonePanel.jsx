import { useState, useEffect } from 'react'
import { Clock, Globe } from 'lucide-react'

const timezones = [
  { region: "US", color: "blue", start: 8, end: 16, timezone: "EST", flag: "🇺🇸" },
  { region: "India", color: "green", start: 18, end: 26, timezone: "IST", flag: "🇮🇳" },
  { region: "Germany", color: "orange", start: 14, end: 22, timezone: "CET", flag: "🇩🇪" }
]

export default function TimezonePanel() {
  const [currentTime, setCurrentTime] = useState(12)
  const [overlapWindow, setOverlapWindow] = useState(null)

  useEffect(() => {
    // Calculate overlap
    const overlap = calculateOverlap()
    setOverlapWindow(overlap)
  }, [currentTime])

  const calculateOverlap = () => {
    // Find overlapping hours
    let overlapStart = Math.max(timezones[0].start, timezones[1].start, timezones[2].start)
    let overlapEnd = Math.min(timezones[0].end, timezones[1].end, timezones[2].end)
    
    if (overlapEnd > overlapStart) {
      return {
        start: `${overlapStart % 24}:00`,
        end: `${overlapEnd % 24}:00`,
        duration: overlapEnd - overlapStart
      }
    }
    return null
  }

  const isInWorkHours = (tz, hour) => {
    return hour >= tz.start && hour < tz.end
  }

  const isOverlapHour = (hour) => {
    return timezones.every(tz => isInWorkHours(tz, hour))
  }

  const getColorForRegion = (region) => {
    if (region === 'US') return '#0052CC'
    if (region === 'India') return '#36B37E'
    return '#FFAB00'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-5">
        <Globe className="w-5 h-5 text-[#0052CC]" />
        <h2 className="font-bold text-[#172B4D]">Team Availability</h2>
      </div>

      {/* Timeline Bars */}
      <div className="space-y-5 mb-6">
        {timezones.map((tz) => (
          <div key={tz.region}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{tz.flag}</span>
              <span className="text-sm font-bold text-[#172B4D]">{tz.region}</span>
              <span className="text-xs text-[#42526E] font-semibold">({tz.timezone})</span>
            </div>
            <div className="relative h-10 bg-[#F4F5F7] rounded-lg overflow-hidden border border-[#DFE1E6]">
              {/* Work hours bar */}
              <div
                className="absolute h-full opacity-40 transition-all duration-300"
                style={{
                  backgroundColor: getColorForRegion(tz.region),
                  left: `${(tz.start / 24) * 100}%`,
                  width: `${((tz.end - tz.start) / 24) * 100}%`
                }}
              ></div>
              {/* Overlap glow */}
              {Array.from({ length: 24 }).map((_, hour) => (
                isOverlapHour(hour) && isInWorkHours(tz, hour) && (
                  <div
                    key={hour}
                    className="absolute h-full bg-[#36B37E] opacity-60 animate-pulse"
                    style={{
                      left: `${(hour / 24) * 100}%`,
                      width: `${(1 / 24) * 100}%`
                    }}
                  ></div>
                )
              ))}
              {/* Current time indicator */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#FF5630] transition-all duration-300 z-10"
                style={{ left: `${(currentTime / 24) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Time Slider */}
      <div className="mb-5">
        <label className="block text-sm font-bold text-[#172B4D] mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#42526E]" />
          Time: {currentTime}:00
        </label>
        <input
          type="range"
          min="0"
          max="23"
          value={currentTime}
          onChange={(e) => setCurrentTime(parseInt(e.target.value))}
          className="w-full h-2 bg-[#DFE1E6] rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Overlap Window Display */}
      {overlapWindow && overlapWindow.duration > 0 && (
        <div className="bg-[#E3FCEF] border-2 border-[#36B37E] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-[#36B37E] rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-[#00875A]">Best Meeting Time</span>
          </div>
          <p className="text-xl font-bold text-[#00875A]">
            {overlapWindow.start} - {overlapWindow.end}
          </p>
          <p className="text-xs text-[#00875A] mt-1 font-semibold">
            {overlapWindow.duration} hours overlap
          </p>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #0052CC;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #0052CC;
          cursor: pointer;
          border-radius: 50%;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}
