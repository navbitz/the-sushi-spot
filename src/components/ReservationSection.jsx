import { CalendarDays, Users, Clock, ArrowRight, CheckCircle2, Ticket, User, Phone, Loader2, Fish, Star } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function ReservationSection() {
  const [step, setStep] = useState(1); // 1 = party+date, 2 = time+contact
  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dates = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      arr.push({
        id: d.toISOString().split('T')[0],
        dayName: i === 0 ? 'Today' : i === 1 ? 'Tmrw' : d.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        fullDateString: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
      });
    }
    return arr;
  }, []);

  useMemo(() => {
    if (!selectedDate && dates.length > 0) setSelectedDate(dates[0].id);
  }, [dates, selectedDate]);

  const lunchSlots = [
    { time: '12:00 PM', status: 'Available' },
    { time: '12:30 PM', status: 'Available' },
    { time: '1:00 PM', status: 'Prime' },
    { time: '1:30 PM', status: 'Available' },
  ];

  const dinnerSlots = [
    { time: '6:00 PM', status: 'Available' },
    { time: '6:30 PM', status: 'Available' },
    { time: '7:00 PM', status: 'Prime' },
    { time: '7:30 PM', status: 'Almost Full' },
    { time: '8:00 PM', status: 'Available' },
    { time: '8:30 PM', status: 'Available' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !name || !phone) return;
    
    let isValid = true;
    
    if (!/^[a-zA-Z\s]{2,}$/.test(name)) {
      setNameError('Name must contain at least 2 letters and no numbers');
      isValid = false;
    } else {
      setNameError('');
    }
    
    if (!/^\+?[\d\s-]{10,}$/.test(phone)) {
      setPhoneError('Please enter a valid phone number');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!isValid) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSubmitted(true);
    }, 800);
  };

  const getSelectedDateDisplay = () => {
    const match = dates.find(d => d.id === selectedDate);
    return match ? match.fullDateString : '';
  };

  const TimeSlotButton = ({ slot }) => {
    const isSelected = selectedTime === slot.time;
    return (
      <button
        type="button"
        onClick={() => setSelectedTime(slot.time)}
        className={`relative py-3.5 px-3 rounded-xl border text-[12px] font-bold transition-all active:scale-[0.97] ${isSelected
          ? 'bg-[var(--color-dark)] text-white border-[var(--color-dark)] shadow-lg shadow-black/20'
          : 'bg-[var(--color-surface)] border-black/10 dark:border-white/10 text-[var(--color-muted)] hover:border-[var(--color-terracotta)] hover:text-[var(--color-dark)] hover:-translate-y-0.5 hover:shadow-sm'
          }`}
      >
        {slot.time}
        {slot.status === 'Prime' && !isSelected && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full border border-white" title="High Demand" />
        )}
        {slot.status === 'Almost Full' && !isSelected && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full border border-white" title="Almost Full" />
        )}
      </button>
    );
  };

  return (
    <section id="reservation" className="py-20 lg:py-24 transition-colors relative overflow-hidden" style={{ background: 'var(--color-cream)' }}>
      {/* ── Ambient Background Elements ── */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-40 z-0" style={{ background: 'radial-gradient(circle, var(--color-terracotta-pale) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 z-0" style={{ background: 'radial-gradient(circle, var(--color-terracotta-pale) 0%, transparent 70%)' }} />
      
      {/* Subtle Watermark Icons */}
      <Fish className="absolute top-[15%] left-[5%] w-32 h-32 text-[var(--color-terracotta)] opacity-[0.03] pointer-events-none -rotate-12 z-0 hidden lg:block" />
      <Star className="absolute bottom-[20%] right-[5%] w-24 h-24 text-[var(--color-terracotta)] opacity-[0.03] pointer-events-none rotate-45 z-0 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-5 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="section-eyebrow">Book a Table</p>
          <h2 className="text-3xl md:text-4xl font-900 mt-2 text-[var(--color-dark)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Reserve Your Experience
          </h2>
        </div>

        {/* 2-Column Card */}
        <div className="max-w-5xl mx-auto bg-[var(--color-surface)] rounded-[32px] border border-black/5 dark:border-white/5 shadow-2xl flex flex-col lg:flex-row overflow-hidden">

          {/* ── LEFT COLUMN: IMAGE & INFO ── */}
          <div className="relative flex w-full h-64 sm:h-80 lg:h-auto lg:w-[45%] flex-col justify-end p-6 sm:p-10 lg:p-14">
            <img
              src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop"
              alt="Sushi Chef preparing food"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>

            <div className="relative z-10 bg-black/40 backdrop-blur-md border border-white/10 p-4 sm:p-6 rounded-2xl text-white shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <h3 className="text-2xl sm:text-3xl font-900 mb-1 sm:mb-2" style={{ fontFamily: 'var(--font-display)' }}>The Sushi Spot</h3>
              <p className="text-xs sm:text-sm text-white/90 mb-2 sm:mb-6 leading-relaxed">
                Experience authentic Edomae-style sushi. Reserve your spot at our counter for an unforgettable culinary journey.
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: FORM ── */}
          <div className="w-full lg:w-[55%] p-5 sm:p-10 lg:p-14 flex flex-col justify-center bg-[var(--color-surface)] relative">

            {submitted ? (
              /* ── CONFIRMATION ── */
              <div className="text-center w-full max-w-sm mx-auto">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-[var(--color-success)]" />
                </div>
                <h3 className="text-2xl font-900 mb-2 text-[var(--color-dark)]" style={{ fontFamily: 'var(--font-display)' }}>All Set!</h3>
                <p className="text-sm text-[var(--color-muted)] mb-8">Thank you, <strong>{name.split(' ')[0]}</strong>. We look forward to hosting you.</p>

                {/* Booking Pass */}
                <div className="relative bg-[var(--color-surface)] rounded-[20px] border border-black/5 dark:border-white/5 shadow-lg p-6 text-left overflow-hidden">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--color-cream)] border-r border-black/5" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--color-cream)] border-l border-black/5" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[var(--color-cream-dark)] rounded-xl flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-[var(--color-terracotta)]" />
                    </div>
                    <div>
                      <p className="text-[9px] font-900 uppercase tracking-widest text-[var(--color-terracotta)]">Booking Pass</p>
                      <p className="text-xs font-bold text-[var(--color-muted)]">The Sushi Spot — Mylapore</p>
                    </div>
                  </div>
                  <div className="border-t border-dashed border-black/10 pt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[var(--color-muted)]">Date</span>
                      <span className="text-sm font-bold text-[var(--color-dark)]">{getSelectedDateDisplay()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[var(--color-muted)]">Time</span>
                      <span className="text-sm font-bold text-[var(--color-dark)]">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[var(--color-muted)]">Guests</span>
                      <span className="text-sm font-bold text-[var(--color-dark)]">{partySize} {partySize === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[var(--color-muted)]">Name</span>
                      <span className="text-sm font-bold text-[var(--color-dark)]">{name}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { setSubmitted(false); setSelectedTime(''); setStep(1); setName(''); setPhone(''); }}
                  className="mt-6 text-sm font-bold text-[var(--color-muted)] hover:text-[var(--color-dark)] transition-colors underline underline-offset-4"
                >
                  Make another booking
                </button>
              </div>
            ) : (
              <div className="w-full">

                {step === 1 ? (
                  /* ── STEP 1: Party + Date ── */
                  <div className="space-y-6">
                    {/* Party Size */}
                    <div>
                      <label className="flex items-center gap-2 text-[13px] font-900 uppercase tracking-widest text-[var(--color-muted)] mb-3">
                        <Users className="w-4 h-4" /> Guests
                      </label>
                      <div className="flex gap-2 sm:gap-3 flex-wrap pt-2 -mt-2">
                        {[1, 2, 3, 4, 5].map(num => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setPartySize(num)}
                            className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl font-bold text-sm transition-all border-2 active:scale-95 ${partySize === num
                              ? 'btn-accent -translate-y-1'
                              : 'bg-[var(--color-cream-dark)] text-[var(--color-dark)] border-transparent hover:border-[var(--color-terracotta)] hover:-translate-y-0.5 hover:shadow-md'
                              }`}
                          >
                            {num}{num === 5 ? '+' : ''}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div>
                      <label className="flex items-center justify-between text-[13px] font-900 uppercase tracking-widest text-[var(--color-muted)] mb-2">
                        <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Date</span>
                        {selectedDate && <span className="text-[var(--color-terracotta)] normal-case font-semibold text-[13px]">{getSelectedDateDisplay()}</span>}
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 pt-1 pb-2">
                        {dates.map(d => (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => setSelectedDate(d.id)}
                            className={`flex flex-col items-center justify-center py-3 rounded-2xl border-2 transition-all active:scale-95 ${selectedDate === d.id
                              ? 'bg-[var(--color-terracotta)] text-white border-[var(--color-terracotta)] shadow-xl shadow-[var(--color-terracotta)]/30 -translate-y-1'
                              : 'bg-[var(--color-cream-dark)] text-[var(--color-dark)] border-transparent hover:border-[var(--color-terracotta)] hover:-translate-y-0.5 hover:shadow-md'
                              }`}
                          >
                            <span className="text-xs font-800 uppercase mb-0.5 opacity-70">{d.dayName}</span>
                            <span className="text-xl font-900 leading-none">{d.dateNum}</span>
                            <span className="text-xs font-700 uppercase mt-0.5 opacity-60">{d.month}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={!selectedDate}
                      onClick={() => setStep(2)}
                      className="group w-full py-4 mt-2 bg-[var(--color-terracotta)] text-white rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#c95b45] hover:-translate-y-[1px] transition-all shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      Continue <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                ) : (
                  /* ── STEP 2: Time + Contact ── */
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Selected summary text */}
                    <div className="flex items-center justify-between bg-[var(--color-surface)] border border-black/5 dark:border-white/5 p-4 rounded-2xl shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-900 uppercase tracking-widest text-[var(--color-muted)] mb-1">Reservation</span>
                        <span className="text-sm font-bold text-[var(--color-dark)]">{partySize} {partySize === 1 ? 'Guest' : 'Guests'} on {getSelectedDateDisplay()}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-bold text-[var(--color-terracotta)] hover:text-[#c95b45] underline underline-offset-2 transition-colors"
                      >
                        Edit
                      </button>
                    </div>

                    {/* Time */}
                    <div>
                      <label className="flex items-center gap-2 text-[13px] font-900 uppercase tracking-widest text-[var(--color-muted)] mb-3">
                        <Clock className="w-4 h-4" /> Pick a Time
                      </label>
                      <div className="mb-3">
                        <p className="text-[10px] font-800 uppercase tracking-wider text-[var(--color-muted)] mb-2">☀️ Lunch</p>
                        <div className="grid grid-cols-4 gap-2">
                          {lunchSlots.map(slot => <TimeSlotButton key={slot.time} slot={slot} />)}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-800 uppercase tracking-wider text-[var(--color-muted)] mb-2">🌙 Dinner</p>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                          {dinnerSlots.map(slot => <TimeSlotButton key={slot.time} slot={slot} />)}
                        </div>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-900 uppercase tracking-widest text-[var(--color-muted)] mb-2">Name</label>
                        <div className="relative group">
                          <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${nameError ? 'text-red-500' : 'text-[var(--color-muted)] group-focus-within:text-[var(--color-terracotta)]'}`} />
                          <input type="text" required placeholder="John Doe" value={name} 
                            onChange={e => { setName(e.target.value); setNameError(''); }}
                            className={`w-full pl-10 pr-4 py-3.5 bg-[var(--color-cream-dark)] border-2 rounded-2xl outline-none transition-all text-sm font-bold text-[var(--color-dark)] placeholder:font-normal placeholder:text-[var(--color-muted)] ${nameError ? 'border-red-500 focus:bg-[var(--color-surface)] focus:shadow-lg focus:shadow-red-500/10' : 'border-transparent focus:border-[var(--color-terracotta)] focus:bg-[var(--color-surface)] focus:shadow-lg focus:shadow-[var(--color-terracotta)]/10'}`}
                          />
                        </div>
                        {nameError && <p className="text-red-500 text-[10px] font-700 mt-1.5 ml-1">{nameError}</p>}
                      </div>
                      <div>
                        <label className="block text-[13px] font-900 uppercase tracking-widest text-[var(--color-muted)] mb-2">Phone</label>
                        <div className="relative group">
                          <Phone className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${phoneError ? 'text-red-500' : 'text-[var(--color-muted)] group-focus-within:text-[var(--color-terracotta)]'}`} />
                          <input type="tel" required placeholder="+91 99999 00000" value={phone} 
                            onChange={e => { setPhone(e.target.value); setPhoneError(''); }}
                            className={`w-full pl-10 pr-4 py-3.5 bg-[var(--color-cream-dark)] border-2 rounded-2xl outline-none transition-all text-sm font-bold text-[var(--color-dark)] placeholder:font-normal placeholder:text-[var(--color-muted)] ${phoneError ? 'border-red-500 focus:bg-[var(--color-surface)] focus:shadow-lg focus:shadow-red-500/10' : 'border-transparent focus:border-[var(--color-terracotta)] focus:bg-[var(--color-surface)] focus:shadow-lg focus:shadow-[var(--color-terracotta)]/10'}`}
                          />
                        </div>
                        {phoneError && <p className="text-red-500 text-[10px] font-700 mt-1.5 ml-1">{phoneError}</p>}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!selectedTime || !name || !phone || isProcessing}
                      className="group w-full py-4 mt-2 bg-[var(--color-terracotta)] text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#c95b45] hover:-translate-y-[1px] transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                        </>
                      ) : (
                        <>
                          Reserve Table <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
