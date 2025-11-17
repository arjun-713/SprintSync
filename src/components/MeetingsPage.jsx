import { useState } from 'react'
import { Video, Clock, Users, Calendar, Plus, Edit2, Trash2, Search, Bell, User } from 'lucide-react'
import Sidebar from './Sidebar'

const suggestedTimes = [
  {
    id: 1,
    time: '14:00',
    timezone: 'UTC',
    localTimes: {
      india: '19:30 IST',
      germany: '15:00 CET',
      us: '06:00 PST'
    },
    score: 95,
    reason: 'Best overlap - All teams in working hours'
  },
  {
    id: 2,
    time: '13:00',
    timezone: 'UTC',
    localTimes: {
      india: '18:30 IST',
      germany: '14:00 CET',
      us: '05:00 PST'
    },
    score: 75,
    reason: 'Good for India & Germany, early for US'
  },
  {
    id: 3,
    time: '15:00',
    timezone: 'UTC',
    localTimes: {
      india: '20:30 IST',
      germany: '16:00 CET',
      us: '07:00 PST'
    },
    score: 85,
    reason: 'Late for India, good for Germany & US'
  }
]

const initialMeetings = [
  {
    id: 1,
    title: 'Sprint Planning',
    date: '2024-01-15',
    time: '14:00 UTC',
    duration: '60 min',
    attendees: ['India Team', 'Germany Team', 'US Team'],
    agenda: [
      'Review previous sprint',
      'Discuss sprint goals',
      'Task allocation',
      'Q&A session'
    ],
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Daily Standup',
    date: '2024-01-10',
    time: '14:00 UTC',
    duration: '15 min',
    attendees: ['All Teams'],
    agenda: [
      'What did you do yesterday?',
      'What will you do today?',
      'Any blockers?'
    ],
    status: 'recurring'
  },
  {
    id: 3,
    title: 'Sprint Retrospective',
    date: '2024-01-08',
    time: '14:00 UTC',
    duration: '90 min',
    attendees: ['India Team', 'Germany Team', 'US Team'],
    agenda: [
      'What went well?',
      'What could be improved?',
      'Action items for next sprint'
    ],
    status: 'completed'
  }
]

export default function MeetingsPage({ onNavigate, activeNav }) {
  const [meetings, setMeetings] = useState(initialMeetings)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedTime, setSelectedTime] = useState(null)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    duration: '60',
    attendees: [],
    agenda: [''],
    primaryRegions: []
  })
  const [suggestedTimesForRegions, setSuggestedTimesForRegions] = useState([])

  const getStatusColor = (status) => {
    if (status === 'completed') return 'bg-[#C8F7DC]'
    if (status === 'upcoming') return 'bg-[#FFE5B4]'
    return 'bg-[#E8E4F3]'
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-[#C8F7DC]'
    if (score >= 75) return 'bg-[#FFE5B4]'
    return 'bg-[#FFB6C1]'
  }

  const isWithinMeetingTime = (meeting) => {
    // Check if current time is within 15 minutes of meeting time
    const now = new Date()
    const meetingDate = new Date(meeting.date + ' ' + meeting.time.split(' ')[0])
    const timeDiff = Math.abs(now - meetingDate) / (1000 * 60) // difference in minutes
    return timeDiff <= 15
  }

  const handleStartMeeting = (meeting) => {
    if (!isWithinMeetingTime(meeting) && meeting.status === 'upcoming') {
      setSelectedMeeting(meeting)
      setShowWarningModal(true)
    } else {
      startGoogleMeet(meeting)
    }
  }

  const startGoogleMeet = (meeting) => {
    // Generate a Google Meet link
    // In production, you would integrate with Google Calendar API
    const meetingTitle = encodeURIComponent(meeting.title)
    const googleMeetUrl = `https://meet.google.com/new`
    window.open(googleMeetUrl, '_blank')
    setShowWarningModal(false)
  }

  const calculateComfortLevel = (hour, region) => {
    // Working hours: 9 AM - 6 PM = 100%
    // 8 AM or 7 PM = 75%
    // 7 AM or 8 PM = 50%
    // 6 AM or 9 PM = 25%
    // Outside = 0%
    if (hour >= 9 && hour <= 18) return 100
    if (hour === 8 || hour === 19) return 75
    if (hour === 7 || hour === 20) return 50
    if (hour === 6 || hour === 21) return 25
    return 0
  }

  const getLocalHour = (utcHour, region) => {
    // Convert UTC to local time
    const offsets = {
      india: 5.5,
      germany: 1,
      us: -8
    }
    let localHour = utcHour + offsets[region]
    if (localHour >= 24) localHour -= 24
    if (localHour < 0) localHour += 24
    return Math.floor(localHour)
  }

  const calculateTimeComfort = (utcHour) => {
    return {
      india: calculateComfortLevel(getLocalHour(utcHour, 'india'), 'india'),
      germany: calculateComfortLevel(getLocalHour(utcHour, 'germany'), 'germany'),
      us: calculateComfortLevel(getLocalHour(utcHour, 'us'), 'us')
    }
  }

  const generateSmartSuggestions = (primaryRegions) => {
    if (primaryRegions.length === 0) return []

    const suggestions = []
    
    // Check all hours from 0-23 UTC
    for (let hour = 0; hour < 24; hour++) {
      const comfort = calculateTimeComfort(hour)
      
      // Calculate average comfort for selected regions
      let totalComfort = 0
      let count = 0
      
      primaryRegions.forEach(region => {
        totalComfort += comfort[region.toLowerCase()]
        count++
      })
      
      const avgComfort = count > 0 ? totalComfort / count : 0
      
      // Only suggest times with good comfort levels
      if (avgComfort >= 50) {
        suggestions.push({
          utcHour: hour,
          time: `${hour.toString().padStart(2, '0')}:00 UTC`,
          comfort,
          avgComfort: Math.round(avgComfort),
          localTimes: {
            india: `${getLocalHour(hour, 'india').toString().padStart(2, '0')}:00 IST`,
            germany: `${getLocalHour(hour, 'germany').toString().padStart(2, '0')}:00 CET`,
            us: `${getLocalHour(hour, 'us').toString().padStart(2, '0')}:00 PST`
          }
        })
      }
    }
    
    // Sort by average comfort level
    return suggestions.sort((a, b) => b.avgComfort - a.avgComfort).slice(0, 5)
  }

  const handleRegionToggle = (region) => {
    const newRegions = newMeeting.primaryRegions.includes(region)
      ? newMeeting.primaryRegions.filter(r => r !== region)
      : [...newMeeting.primaryRegions, region]
    
    setNewMeeting({ ...newMeeting, primaryRegions: newRegions })
    
    if (newRegions.length > 0) {
      setSuggestedTimesForRegions(generateSmartSuggestions(newRegions))
    } else {
      setSuggestedTimesForRegions([])
    }
  }

  const handleAddMeeting = () => {
    if (!newMeeting.title || !newMeeting.date || !newMeeting.time) {
      alert('Please fill in all required fields')
      return
    }

    const meeting = {
      id: Date.now(),
      title: newMeeting.title,
      date: newMeeting.date,
      time: newMeeting.time,
      duration: `${newMeeting.duration} min`,
      attendees: newMeeting.attendees.length > 0 ? newMeeting.attendees : ['All Teams'],
      agenda: newMeeting.agenda.filter(item => item.trim() !== ''),
      status: 'upcoming'
    }

    setMeetings([...meetings, meeting])
    setShowAddModal(false)
    setNewMeeting({
      title: '',
      date: '',
      time: '',
      duration: '60',
      attendees: [],
      agenda: [''],
      primaryRegions: []
    })
    setSuggestedTimesForRegions([])
  }

  const getComfortColor = (comfort) => {
    if (comfort >= 90) return 'bg-[#C8F7DC]'
    if (comfort >= 75) return 'bg-[#FFE5B4]'
    if (comfort >= 50) return 'bg-[#E8E4F3]'
    return 'bg-[#FFB6C1]'
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="bg-white border-b-4 border-black px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <h1 className="text-2xl font-black uppercase tracking-tight">MEETINGS</h1>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search meetings..."
                  className="w-full pl-12 pr-4 py-3 border-4 border-black focus:outline-none font-bold"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-12 h-12 border-4 border-black bg-white hover:bg-[#FFE5B4] flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 border-4 border-black bg-white hover:bg-[#FFE5B4] flex items-center justify-center">
                <User className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 bg-black border-4 border-black"></div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Suggested Meeting Times */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black uppercase">Suggested Meeting Times</h2>
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6" />
                <span className="font-black uppercase text-sm">Optimal for all time zones</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {suggestedTimes.map((slot) => (
                <div
                  key={slot.id}
                  className={`bg-white border-4 border-black p-6 hover:bg-[#E8E4F3] transition-all cursor-pointer ${
                    selectedTime === slot.id ? 'bg-[#C8F7DC]' : ''
                  }`}
                  onClick={() => setSelectedTime(slot.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-black">{slot.time}</p>
                        <p className="text-xs font-bold uppercase">{slot.timezone}</p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 border-4 border-black font-black ${getScoreColor(slot.score)}`}>
                      {slot.score}%
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between border-t-4 border-black pt-2">
                      <span className="text-xs font-black uppercase">🇮🇳 India:</span>
                      <span className="font-bold">{slot.localTimes.india}</span>
                    </div>
                    <div className="flex items-center justify-between border-t-4 border-black pt-2">
                      <span className="text-xs font-black uppercase">🇩🇪 Germany:</span>
                      <span className="font-bold">{slot.localTimes.germany}</span>
                    </div>
                    <div className="flex items-center justify-between border-t-4 border-black pt-2">
                      <span className="text-xs font-black uppercase">🇺🇸 US:</span>
                      <span className="font-bold">{slot.localTimes.us}</span>
                    </div>
                  </div>

                  <div className="border-t-4 border-black pt-3">
                    <p className="text-sm font-bold">{slot.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meeting Agendas */}
          <div className="bg-white border-4 border-black p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black uppercase">Meeting Agendas</h2>
              <button
                onClick={() => {
                  setShowAddModal(true)
                  setNewMeeting({
                    title: '',
                    date: '',
                    time: '',
                    duration: '60',
                    attendees: [],
                    agenda: [''],
                    primaryRegions: []
                  })
                }}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all font-black uppercase"
              >
                <Plus className="w-5 h-5" />
                Schedule Meeting
              </button>
            </div>

            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="bg-white border-4 border-black p-6 hover:bg-[#F5F5F5] transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 bg-black border-4 border-black flex items-center justify-center flex-shrink-0">
                        <Video className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-black uppercase">{meeting.title}</h3>
                          <span className={`text-xs px-3 py-1 border-4 border-black font-black uppercase ${getStatusColor(meeting.status)}`}>
                            {meeting.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 text-sm font-bold">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{meeting.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{meeting.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{meeting.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {meeting.status !== 'completed' && (
                        <button
                          onClick={() => handleStartMeeting(meeting)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#C8F7DC] border-4 border-black hover:bg-black hover:text-white transition-all font-black uppercase text-sm"
                        >
                          <Video className="w-4 h-4" />
                          Start
                        </button>
                      )}
                      <button className="w-10 h-10 border-4 border-black bg-white hover:bg-[#FFE5B4] flex items-center justify-center transition-all">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 border-4 border-black bg-white hover:bg-[#FFB6C1] flex items-center justify-center transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-black uppercase mb-3 border-b-4 border-black pb-2">Attendees</h4>
                      <div className="flex flex-wrap gap-2">
                        {meeting.attendees.map((attendee, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-2 bg-[#E8E4F3] border-4 border-black font-bold text-sm"
                          >
                            {attendee}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase mb-3 border-b-4 border-black pb-2">Agenda</h4>
                      <ul className="space-y-2">
                        {meeting.agenda.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="font-black">{idx + 1}.</span>
                            <span className="font-bold">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Meeting Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 overflow-y-auto p-4">
            <div className="bg-[#FFE5B4] border-4 border-black p-6 md:p-8 max-w-4xl w-full my-4">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-3xl font-black uppercase">Schedule Meeting</h2>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setSuggestedTimesForRegions([])
                  }}
                  className="w-10 h-10 border-4 border-black bg-white hover:bg-black hover:text-white transition-all flex items-center justify-center flex-shrink-0"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 md:space-y-6">
                {/* Meeting Title */}
                <div>
                  <label className="block text-xs font-black uppercase mb-2">Meeting Title *</label>
                  <input
                    type="text"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                    placeholder="e.g., Sprint Planning"
                    className="w-full px-4 py-3 border-4 border-black focus:outline-none font-bold"
                  />
                </div>

                {/* Primary Regions */}
                <div className="bg-white border-4 border-black p-4 md:p-6">
                  <label className="block text-xs font-black uppercase mb-2 md:mb-3">
                    Primary Regions (Optional - for smart time suggestions)
                  </label>
                  <p className="text-xs md:text-sm font-bold mb-3 md:mb-4">Select the main teams attending this meeting:</p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {['India', 'Germany', 'US'].map((region) => (
                      <button
                        key={region}
                        onClick={() => handleRegionToggle(region)}
                        className={`px-4 md:px-6 py-2 md:py-3 border-4 border-black font-black uppercase text-sm md:text-base transition-all ${
                          newMeeting.primaryRegions.includes(region)
                            ? 'bg-black text-white'
                            : 'bg-white hover:bg-[#C8F7DC]'
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Smart Time Suggestions */}
                {suggestedTimesForRegions.length > 0 && (
                  <div className="bg-white border-4 border-black p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-black uppercase mb-4">
                      ⭐ Suggested Times for Selected Regions
                    </h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      {suggestedTimesForRegions.map((suggestion, idx) => (
                        <div
                          key={idx}
                          onClick={() => setNewMeeting({ ...newMeeting, time: suggestion.time })}
                          className={`border-4 border-black p-3 md:p-4 cursor-pointer transition-all ${
                            newMeeting.time === suggestion.time ? 'bg-[#C8F7DC]' : 'bg-white hover:bg-[#E8E4F3]'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                            <span className="text-base md:text-lg font-black">{suggestion.time}</span>
                            <span className={`px-3 py-1 border-4 border-black font-black text-xs md:text-sm w-fit ${getComfortColor(suggestion.avgComfort)}`}>
                              {suggestion.avgComfort}% Match
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <p className="text-xs font-black uppercase mb-1">🇮🇳 India</p>
                              <p className="font-bold text-xs md:text-sm mb-1">{suggestion.localTimes.india}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-white border-2 border-black h-3">
                                  <div
                                    className={`h-full ${getComfortColor(suggestion.comfort.india)}`}
                                    style={{ width: `${suggestion.comfort.india}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-black whitespace-nowrap">{suggestion.comfort.india}%</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase mb-1">🇩🇪 Germany</p>
                              <p className="font-bold text-xs md:text-sm mb-1">{suggestion.localTimes.germany}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-white border-2 border-black h-3">
                                  <div
                                    className={`h-full ${getComfortColor(suggestion.comfort.germany)}`}
                                    style={{ width: `${suggestion.comfort.germany}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-black whitespace-nowrap">{suggestion.comfort.germany}%</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase mb-1">🇺🇸 US</p>
                              <p className="font-bold text-xs md:text-sm mb-1">{suggestion.localTimes.us}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-white border-2 border-black h-3">
                                  <div
                                    className={`h-full ${getComfortColor(suggestion.comfort.us)}`}
                                    style={{ width: `${suggestion.comfort.us}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-black whitespace-nowrap">{suggestion.comfort.us}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date and Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase mb-2">Date *</label>
                    <input
                      type="date"
                      value={newMeeting.date}
                      onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-4 border-black focus:outline-none font-bold text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase mb-2">Time (UTC) *</label>
                    <input
                      type="text"
                      value={newMeeting.time}
                      onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                      placeholder="14:00 UTC"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-4 border-black focus:outline-none font-bold text-sm md:text-base"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-black uppercase mb-2">Duration (minutes)</label>
                  <select
                    value={newMeeting.duration}
                    onChange={(e) => setNewMeeting({ ...newMeeting, duration: e.target.value })}
                    className="w-full px-4 py-3 border-4 border-black focus:outline-none font-bold bg-white"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">120 minutes</option>
                  </select>
                </div>

                {/* Agenda Items */}
                <div>
                  <label className="block text-xs font-black uppercase mb-2">Agenda Items</label>
                  {newMeeting.agenda.map((item, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newAgenda = [...newMeeting.agenda]
                          newAgenda[idx] = e.target.value
                          setNewMeeting({ ...newMeeting, agenda: newAgenda })
                        }}
                        placeholder={`Agenda item ${idx + 1}`}
                        className="flex-1 px-4 py-3 border-4 border-black focus:outline-none font-bold"
                      />
                      {idx === newMeeting.agenda.length - 1 && (
                        <button
                          onClick={() => setNewMeeting({ ...newMeeting, agenda: [...newMeeting.agenda, ''] })}
                          className="w-12 h-12 border-4 border-black bg-white hover:bg-[#C8F7DC] flex items-center justify-center font-black text-xl"
                        >
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setSuggestedTimesForRegions([])
                    }}
                    className="flex-1 px-4 md:px-6 py-2 md:py-3 border-4 border-black bg-white hover:bg-[#E8E4F3] transition-all font-black uppercase text-sm md:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMeeting}
                    className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all font-black uppercase text-sm md:text-base"
                  >
                    Schedule Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Warning Modal */}
        {showWarningModal && selectedMeeting && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[#FFB6C1] border-4 border-black p-8 max-w-lg w-full mx-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase">Meeting Time Warning</h2>
                  <p className="text-sm font-bold uppercase mt-1">Not scheduled for now</p>
                </div>
              </div>

              <div className="bg-white border-4 border-black p-4 mb-6">
                <p className="font-bold text-lg mb-3">
                  This meeting is scheduled for:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-black">{selectedMeeting.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-black">{selectedMeeting.time}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border-4 border-black p-4 mb-6">
                <p className="font-bold">
                  ⚠️ You're starting this meeting outside the scheduled time. 
                  Participants may not be available.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowWarningModal(false)}
                  className="flex-1 px-6 py-3 border-4 border-black bg-white hover:bg-[#E8E4F3] transition-all font-black uppercase"
                >
                  Cancel
                </button>
                <button
                  onClick={() => startGoogleMeet(selectedMeeting)}
                  className="flex-1 px-6 py-3 bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all font-black uppercase"
                >
                  Start Anyway
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
