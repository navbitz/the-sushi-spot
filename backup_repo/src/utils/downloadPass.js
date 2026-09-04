/**
 * Utility to generate and download an ultra-premium, high-resolution PNG Booking Pass ticket.
 */
export function downloadPassAsImage({ bookingId, name, date, time, guests }) {
  const canvas = document.createElement('canvas');
  // High-DPI scale (800x1080) for ultra crisp rendering
  const width = 800;
  const height = 1080;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Helper: Rounded Rectangle
  function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  // 1. Overall Outer Canvas Background (Soft Warm Neutral)
  ctx.fillStyle = '#F4EFEA';
  ctx.fillRect(0, 0, width, height);

  // 2. Main Ticket Card Container with Soft Shadow & Rounded Corners
  const px = 50;
  const py = 50;
  const pw = 700;
  const ph = 980;
  const pr = 28;

  ctx.save();
  ctx.shadowColor = 'rgba(28, 25, 23, 0.12)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 16;
  ctx.fillStyle = '#FFFFFF';
  roundedRect(px, py, pw, ph, pr);
  ctx.fill();
  ctx.restore();

  // Subtle Card Outer Border
  ctx.strokeStyle = 'rgba(224, 83, 38, 0.18)';
  ctx.lineWidth = 2;
  roundedRect(px, py, pw, ph, pr);
  ctx.stroke();

  // 3. Header Section (Nori Dark Gradient Header)
  const headerHeight = 220;
  ctx.save();
  // Clip header to top rounded corners of card
  roundedRect(px, py, pw, headerHeight, pr);
  ctx.clip();

  const grad = ctx.createLinearGradient(px, py, px + pw, py + headerHeight);
  grad.addColorStop(0, '#181513');
  grad.addColorStop(1, '#2B2420');
  ctx.fillStyle = grad;
  ctx.fillRect(px, py, pw, headerHeight);

  // Top Edge Terracotta Accent Ribbon
  ctx.fillStyle = '#E05326';
  ctx.fillRect(px, py, pw, 8);

  // Decorative Background Kanji Watermark ("鮨" - Sushi)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.font = 'bold 150px serif';
  ctx.fillText('鮨', px + pw - 160, py + 160);

  // Brand Name & Subtitle
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 32px "Playfair Display", Georgia, serif';
  ctx.fillText('THE SUSHI SPOT', px + 40, py + 75);

  ctx.fillStyle = '#E05326';
  ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('HANDCRAFTED EDOMAE SUSHI · MYLAPORE', px + 40, py + 105);

  // VIP Badge Pill (Top Right)
  const badgeX = px + pw - 210;
  const badgeY = py + 52;
  const badgeW = 170;
  const badgeH = 34;
  ctx.fillStyle = 'rgba(224, 83, 38, 0.18)';
  roundedRect(badgeX, badgeY, badgeW, badgeH, 17);
  ctx.fill();
  ctx.strokeStyle = '#E05326';
  ctx.lineWidth = 1;
  roundedRect(badgeX, badgeY, badgeW, badgeH, 17);
  ctx.stroke();

  ctx.fillStyle = '#FF9D7E';
  ctx.font = '800 11px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('★ VIP RESERVATION', badgeX + badgeW / 2, badgeY + 21);
  ctx.textAlign = 'left';

  // Subtitle info line in Header
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '500 13px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('Official Dining Pass · Confirmed Guest', px + 40, py + 175);

  ctx.restore();

  // 4. Ticket Cut Out Notches & Perforation Line (Y = py + headerHeight + 25)
  const perfY = py + headerHeight + 35;

  // Notch Circles (Left and Right)
  const notchRadius = 18;
  ctx.fillStyle = '#F4EFEA';
  ctx.beginPath();
  ctx.arc(px, perfY, notchRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(px + pw, perfY, notchRadius, 0, Math.PI * 2);
  ctx.fill();

  // Dashed Cut Line
  ctx.strokeStyle = '#E2D7CE';
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.moveTo(px + notchRadius + 10, perfY);
  ctx.lineTo(px + pw - notchRadius - 10, perfY);
  ctx.stroke();
  ctx.setLineDash([]);

  // 5. Booking Reference Hero Box
  const refY = perfY + 35;
  const refW = pw - 80;
  const refH = 95;
  const refX = px + 40;

  ctx.fillStyle = '#FFF5F0';
  roundedRect(refX, refY, refW, refH, 18);
  ctx.fill();
  ctx.strokeStyle = 'rgba(224, 83, 38, 0.25)';
  ctx.lineWidth = 1.5;
  roundedRect(refX, refY, refW, refH, 18);
  ctx.stroke();

  ctx.fillStyle = '#8A7A70';
  ctx.font = '800 11px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('RESERVATION REFERENCE CODE', refX + 24, refY + 34);

  ctx.fillStyle = '#E05326';
  ctx.font = '900 32px -apple-system, BlinkMacSystemFont, monospace';
  ctx.fillText(`#${bookingId}`, refX + 24, refY + 72);

  // Status Badge inside Hero Box
  const statusX = refX + refW - 140;
  const statusY = refY + 28;
  ctx.fillStyle = '#16a34a';
  roundedRect(statusX, statusY, 116, 38, 19);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✓ CONFIRMED', statusX + 58, statusY + 24);
  ctx.textAlign = 'left';

  // 6. Reservation Details Grid (2 columns x 2 rows)
  const gridY = refY + refH + 45;

  const details = [
    { label: 'GUEST NAME', value: name, icon: '👤' },
    { label: 'PARTY SIZE', value: `${guests} ${Number(guests) === 1 ? 'Guest' : 'Guests'}`, icon: '👥' },
    { label: 'RESERVATION DATE', value: date, icon: '📅' },
    { label: 'TIME SLOT', value: time, icon: '⏰' },
  ];

  const colW = (pw - 120) / 2;
  const rowH = 90;

  details.forEach((item, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = px + 40 + col * (colW + 40);
    const y = gridY + row * rowH;

    // Label
    ctx.fillStyle = '#9C8C82';
    ctx.font = '700 11px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${item.icon}  ${item.label}`, x, y);

    // Value
    ctx.fillStyle = '#1C1917';
    ctx.font = '800 18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(String(item.value), x, y + 30);

    // Light divider line under each row
    ctx.strokeStyle = '#F0E7DF';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + 48);
    ctx.lineTo(x + colW, y + 48);
    ctx.stroke();
  });

  // Location & Seating Row
  const locY = gridY + 2 * rowH + 10;
  ctx.fillStyle = '#9C8C82';
  ctx.font = '700 11px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('📍  LOCATION & SEATING', px + 40, locY);

  ctx.fillStyle = '#1C1917';
  ctx.font = '800 16px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('The Sushi Spot · Main Dining Counter, Mylapore', px + 40, locY + 28);

  ctx.strokeStyle = '#F0E7DF';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(px + 40, locY + 46);
  ctx.lineTo(px + pw - 40, locY + 46);
  ctx.stroke();

  // 7. Security Barcode & QR Code Graphic Area
  const barcodeY = locY + 70;

  // Procedural Barcode rendering
  ctx.fillStyle = '#1C1917';
  const barStartX = px + 40;
  const barW = pw - 80;
  const barH = 65;

  // Generate deterministic pattern based on bookingId
  let seed = 0;
  for (let i = 0; i < bookingId.length; i++) {
    seed += bookingId.charCodeAt(i);
  }

  ctx.fillStyle = 'rgba(28, 25, 23, 0.9)';
  let currentX = barStartX + 20;
  const endX = barStartX + barW - 20;

  while (currentX < endX) {
    seed = (seed * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    const lineWidth = rnd > 0.6 ? 4 : rnd > 0.3 ? 2 : 1;
    const gap = (rnd * 3 + 1) | 0;

    ctx.fillRect(currentX, barcodeY, lineWidth, barH);
    currentX += lineWidth + gap;
  }

  // Barcode label below
  ctx.fillStyle = '#8A7A70';
  ctx.font = '600 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`* ${bookingId} * VALIDATION CODE`, px + pw / 2, barcodeY + barH + 18);
  ctx.textAlign = 'left';

  // 8. Footer Instructions & Terms
  const footerY = barcodeY + barH + 42;
  ctx.fillStyle = '#786C65';
  ctx.font = '500 12px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('• Please present this pass at the host desk upon arrival.', px + 40, footerY);
  ctx.fillText('• Table held for up to 15 minutes past your reserved time slot.', px + 40, footerY + 20);

  // Trigger Instant Image Download
  const link = document.createElement('a');
  link.download = `Sushi_Spot_Pass_${bookingId}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
