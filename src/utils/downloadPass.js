/**
 * Utility to generate and download an official PNG Booking Pass ticket.
 */
export function downloadPassAsImage({ bookingId, name, date, time, guests }) {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 700;
  const ctx = canvas.getContext('2d');

  // Background - Warm Cream
  ctx.fillStyle = '#FEF3ED';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Card Outer Container with Shadow
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.fillRect(40, 40, 520, 620);
  ctx.shadowColor = 'transparent';

  // Card Top Accent Bar (Terracotta)
  ctx.fillStyle = '#D4603A';
  ctx.fillRect(40, 40, 520, 10);

  // Header Box (Nori Card Dark Background)
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(40, 50, 520, 110);

  // Header Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('THE SUSHI SPOT', 70, 95);

  ctx.fillStyle = '#D4603A';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('OFFICIAL TABLE BOOKING PASS', 70, 122);

  ctx.fillStyle = '#999999';
  ctx.font = '12px sans-serif';
  ctx.fillText('Mylapore, Chennai', 400, 122);

  // Dashed Cut Line Effect
  ctx.strokeStyle = '#E0D0C5';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(40, 185);
  ctx.lineTo(560, 185);
  ctx.stroke();
  ctx.setLineDash([]); // Reset line dash

  // Booking ID Container Box
  ctx.fillStyle = '#FEF3ED';
  ctx.fillRect(70, 205, 460, 70);

  ctx.fillStyle = '#8A7A70';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('BOOKING REFERENCE ID', 90, 230);

  ctx.fillStyle = '#D4603A';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText(`#${bookingId}`, 90, 258);

  // Details List
  const details = [
    { label: 'GUEST NAME', value: name },
    { label: 'DATE', value: date },
    { label: 'TIME', value: time },
    { label: 'PARTY SIZE', value: `${guests} ${guests === 1 || guests === '1' ? 'Guest' : 'Guests'}` },
  ];

  let y = 310;
  details.forEach((item) => {
    ctx.strokeStyle = '#F0E8E2';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(70, y);
    ctx.lineTo(530, y);
    ctx.stroke();

    y += 35;
    ctx.fillStyle = '#8A7A70';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(item.label, 70, y);

    ctx.fillStyle = '#1A1A1A';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(String(item.value), 220, y);

    y += 20;
  });

  // Footer Divider Line
  ctx.strokeStyle = '#E0D0C5';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(70, 580);
  ctx.lineTo(530, 580);
  ctx.stroke();

  // Footer Note
  ctx.fillStyle = '#666666';
  ctx.font = '12px sans-serif';
  ctx.fillText('Please show this pass at the host desk upon arrival.', 70, 610);
  ctx.fillText('Valid for 15 minutes past scheduled slot.', 70, 630);

  // Trigger Instant Image Download
  const link = document.createElement('a');
  link.download = `Sushi_Spot_Booking_Pass_${bookingId}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
