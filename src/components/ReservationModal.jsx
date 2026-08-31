import { X, CalendarDays, Clock, Users, CheckCircle2, Download } from 'lucide-react';
import { useState } from 'react';
import { downloadPassAsImage } from '../utils/downloadPass';

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
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-900 mb-1" style={{ color: 'var(--color-brown)' }}>
              Booking Confirmed!
            </h3>
            <p className="text-[14px] mb-6" style={{ color: 'var(--color-muted)' }}>
              We look forward to hosting you, {formData.name.split(' ')[0]}.
            </p>

            {/* Ticket Graphic */}
            <div className="w-full bg-[var(--color-cream)] border-2 border-dashed border-[rgba(212,96,58,0.3)] rounded-xl p-5 relative">
              {/* Notches */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--color-surface)] rounded-full" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--color-surface)] rounded-full" />
              
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-[rgba(212,96,58,0.1)] pb-3">
                  <span className="text-[12px] font-700 uppercase" style={{ color: 'var(--color-muted)' }}>Booking ID</span>
                  <span className="text-[16px] font-900 tracking-wider" style={{ color: 'var(--color-terracotta)' }}>#{bookingId}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-left pt-1">
                  <div>
                    <span className="block text-[11px] font-700 uppercase mb-0.5" style={{ color: 'var(--color-muted)' }}>Date</span>
                    <span className="block text-[14px] font-800" style={{ color: 'var(--color-brown)' }}>{formData.date}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-700 uppercase mb-0.5" style={{ color: 'var(--color-muted)' }}>Time</span>
                    <span className="block text-[14px] font-800" style={{ color: 'var(--color-brown)' }}>{formData.time}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-[11px] font-700 uppercase mb-0.5" style={{ color: 'var(--color-muted)' }}>Guests</span>
                    <span className="block text-[14px] font-800" style={{ color: 'var(--color-brown)' }}>{formData.guests} People</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full mt-6">
              <button 
                onClick={() => downloadPassAsImage({
                  bookingId,
                  name: formData.name,
                  date: formData.date,
                  time: formData.time,
                  guests: formData.guests
                })}
                className="btn-accent flex-1 justify-center py-2.5 flex items-center gap-2 text-[13px]"
              >
                <Download className="w-4 h-4" /> Download Pass
              </button>
              <button onClick={handleClose} className="btn-outline flex-1 justify-center py-2.5 text-[13px]">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
