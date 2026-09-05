import { X, CalendarDays, Clock, Users, CheckCircle2, Download } from 'lucide-react';
import { useState } from 'react';
import { downloadPassAsImage } from '../utils/downloadPass';
import FocusLock from 'react-focus-lock';
import Barcode from './Barcode';

export default function ReservationModal({ isOpen, onClose }) {
  const [step, setStep] = useState('form'); // 'form' or 'receipt'
  const [bookingId, setBookingId] = useState('');
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.name) return;
    
    // Generate Booking ID
    setBookingId(`RES-${Math.floor(1000 + Math.random() * 9000)}`);
    setStep('receipt');
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ date: '', time: '', guests: '2', name: '' });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-300"
        onClick={handleClose}
      />
      
      <FocusLock returnFocus>
      {/* Modal */}
      <div className="relative bg-[var(--color-surface)] w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden anim-bounce-in">
        
        {/* Header */}
        <div className="bg-[var(--color-nori-card)] text-white px-6 py-5 relative flex justify-between items-center">
          <div>
            <h2 id="reservation-title" className="text-[18px] font-800">Reserve a Table</h2>
            <p className="text-[12px] font-600 text-stone-400">The Sushi Spot · Mylapore</p>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
            <div>
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe" 
                className="form-field" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Date</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="form-field pl-9" 
                  />
                </div>
              </div>
              
              <div>
                <label className="form-label">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <select 
                    required
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className="form-field pl-9"
                  >
                    <option value="" disabled>Select</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="form-label">Number of Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <select 
                  required
                  value={formData.guests}
                  onChange={e => setFormData({...formData, guests: e.target.value})}
                  className="form-field pl-9"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5+ People</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full justify-center mt-2 py-3">
              Confirm Reservation
            </button>
          </form>
        ) : (
          /* Receipt View */
          <div className="p-6 sm:p-7 text-center flex flex-col items-center max-h-[85vh] overflow-y-auto">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-3 ring-8 ring-emerald-500/5">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-900 mb-0.5" style={{ color: 'var(--color-brown)' }}>
              Booking Confirmed!
            </h3>
            <p className="text-[12px] sm:text-[13px] mb-5 font-500" style={{ color: 'var(--color-muted)' }}>
              We look forward to hosting you, <span className="font-700">{formData.name.split(' ')[0]}</span>.
            </p>

            {/* VIP Boarding Pass Ticket Graphic */}
            <div className="w-full bg-white dark:bg-[#221f1c] border border-stone-200 dark:border-stone-700/60 rounded-2xl shadow-lg overflow-hidden relative text-left">
              
              {/* Pass Header */}
              <div className="bg-stone-900 text-white p-4 relative overflow-hidden flex justify-between items-center">
                {/* Kanji Watermark */}
                <span className="absolute -right-2 -bottom-4 text-white/5 text-6xl font-serif select-none pointer-events-none">
                  鮨
                </span>
                
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta)] inline-block animate-pulse" />
                    <span className="text-[10px] font-800 tracking-wider text-[var(--color-terracotta)] uppercase">
                      Official Dining Pass
                    </span>
                  </div>
                  <h4 className="font-display font-800 text-[16px] tracking-tight">The Sushi Spot</h4>
                  <p className="text-[10px] text-stone-400 font-500">Mylapore, Chennai</p>
                </div>

                <div className="bg-[var(--color-terracotta)]/20 border border-[var(--color-terracotta)]/40 px-2.5 py-1 rounded-full text-right">
                  <span className="text-[10px] font-800 text-[#FF9D7E] uppercase tracking-wider block">★ VIP PASS</span>
                </div>
              </div>

              {/* Dashed Perforation with Side Cutout Notches */}
              <div className="relative h-6 bg-[var(--color-cream-dark)] dark:bg-[#1a1715] flex items-center justify-center">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[var(--color-surface)] rounded-full border-r border-stone-300 dark:border-stone-700" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[var(--color-surface)] rounded-full border-l border-stone-300 dark:border-stone-700" />
                <div className="w-full border-b-2 border-dashed border-stone-300 dark:border-stone-700 mx-5" />
              </div>

              {/* Pass Body Content */}
              <div className="p-4 sm:p-5 flex flex-col gap-4 bg-white dark:bg-[#221f1c]">
                
                {/* Booking ID Banner */}
                <div className="bg-[var(--color-terracotta-pale)] dark:bg-[var(--color-terracotta)]/10 border border-[var(--color-terracotta)]/20 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] font-800 uppercase tracking-widest text-[var(--color-muted)]">Reservation Ref</span>
                    <span className="text-[18px] font-900 tracking-wider font-mono text-[var(--color-terracotta)]">#{bookingId}</span>
                  </div>
                  <span className="bg-emerald-600 text-white text-[10px] font-800 px-2.5 py-1 rounded-full shadow-sm">
                    ✓ CONFIRMED
                  </span>
                </div>

                {/* 2-Column Data Grid */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="bg-stone-50 dark:bg-stone-800/40 p-2.5 rounded-lg border border-stone-100 dark:border-stone-800">
                    <span className="block text-[10px] font-700 uppercase text-[var(--color-muted)] mb-0.5">Guest Name</span>
                    <span className="block text-[13px] font-800 truncate" style={{ color: 'var(--color-brown)' }}>{formData.name}</span>
                  </div>
                  
                  <div className="bg-stone-50 dark:bg-stone-800/40 p-2.5 rounded-lg border border-stone-100 dark:border-stone-800">
                    <span className="block text-[10px] font-700 uppercase text-[var(--color-muted)] mb-0.5">Party Size</span>
                    <span className="block text-[13px] font-800" style={{ color: 'var(--color-brown)' }}>{formData.guests} {Number(formData.guests) === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                  
                  <div className="bg-stone-50 dark:bg-stone-800/40 p-2.5 rounded-lg border border-stone-100 dark:border-stone-800">
                    <span className="block text-[10px] font-700 uppercase text-[var(--color-muted)] mb-0.5">Date</span>
                    <span className="block text-[13px] font-800" style={{ color: 'var(--color-brown)' }}>{formData.date}</span>
                  </div>
                  
                  <div className="bg-stone-50 dark:bg-stone-800/40 p-2.5 rounded-lg border border-stone-100 dark:border-stone-800">
                    <span className="block text-[10px] font-700 uppercase text-[var(--color-muted)] mb-0.5">Time</span>
                    <span className="block text-[13px] font-800" style={{ color: 'var(--color-brown)' }}>{formData.time}</span>
                  </div>
                </div>

                {/* Simulated Barcode */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex flex-col items-center gap-1">
                  <div className="h-8 w-full flex items-center justify-center overflow-hidden opacity-75 text-stone-800 dark:text-stone-200">
                    <Barcode value={bookingId} width={1.8} height={32} className="w-full object-cover" />
                  </div>
                  <span className="text-[9px] font-mono text-[var(--color-muted)] tracking-widest">
                    * {bookingId} * VALIDATION CODE
                  </span>
                </div>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full mt-5">
              <button 
                onClick={() => downloadPassAsImage({
                  bookingId,
                  name: formData.name,
                  date: formData.date,
                  time: formData.time,
                  guests: formData.guests
                })}
                className="btn-accent flex-1 justify-center py-3 flex items-center gap-2 text-[13px] shadow-lg shadow-[var(--color-terracotta)]/20 active:scale-[0.98] transition-transform"
              >
                <Download className="w-4 h-4" /> Download Pass (PNG)
              </button>
              <button onClick={handleClose} className="btn-outline flex-1 justify-center py-3 text-[13px]">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      </FocusLock>
    </div>
  );
}
