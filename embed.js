/**
 * VietQR Embed - 1-Line Floating Payment & Donation Button for any Website
 * Usage: <script src="https://huyhoang2k5.github.io/vietqr-widget/embed.js" data-bank="tpbank" data-account="20058999999" data-amount="50000" data-memo="DONATE"></script>
 */
(function () {
  'use strict';

  const script = document.currentScript;
  if (!script) return;

  const bank = script.getAttribute('data-bank') || 'tpbank';
  const account = script.getAttribute('data-account') || '20058999999';
  const amount = script.getAttribute('data-amount') || '';
  const memo = script.getAttribute('data-memo') || 'DONATE';
  const title = script.getAttribute('data-title') || '⚡ Ủng hộ / Thanh toán VietQR';

  const BANK_BINS = {
    'tpbank': '970423',
    'vietcombank': '970436',
    'mbbank': '970422',
    'techcombank': '970407',
    'acb': '970416',
    'bidv': '970418',
    'vietinbank': '970415',
    'vpbank': '970432'
  };

  const bin = BANK_BINS[bank.toLowerCase()] || bank;
  let qrUrl = `https://img.vietqr.io/image/${bin}-${account}-compact2.png`;
  const params = [];
  if (amount) params.push(`amount=${amount}`);
  if (memo) params.push(`addInfo=${encodeURIComponent(memo)}`);
  if (params.length > 0) qrUrl += '?' + params.join('&');

  // Inject Button Styles & Elements
  const style = document.createElement('style');
  style.innerHTML = `
    .vietqr-float-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #0284c7, #2563eb);
      color: white;
      padding: 12px 18px;
      border-radius: 999px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      font-weight: 700;
      box-shadow: 0 4px 20px rgba(2, 132, 199, 0.4);
      cursor: pointer;
      z-index: 999999;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .vietqr-float-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(2, 132, 199, 0.6);
    }
    .vietqr-modal-overlay {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(4px);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 1000000;
    }
    .vietqr-modal-box {
      background: #1e293b;
      color: #f8fafc;
      padding: 24px;
      border-radius: 20px;
      text-align: center;
      max-width: 320px;
      width: 90%;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.1);
      position: relative;
    }
    .vietqr-close-btn {
      position: absolute;
      top: 12px; right: 14px;
      background: none; border: none;
      color: #94a3b8; font-size: 20px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const btn = document.createElement('div');
  btn.className = 'vietqr-float-btn';
  btn.innerHTML = title;

  const modal = document.createElement('div');
  modal.className = 'vietqr-modal-overlay';
  modal.innerHTML = `
    <div class="vietqr-modal-box">
      <button class="vietqr-close-btn">&times;</button>
      <h3 style="margin-bottom:6px; font-size:16px;">Quét Mã VietQR Chuyển Khoản</h3>
      <p style="font-size:12px; color:#94a3b8; margin-bottom:12px;">Hỗ trợ mọi App ngân hàng & Momo</p>
      <img src="${qrUrl}" alt="VietQR" style="width:220px; height:220px; border-radius:12px; margin-bottom:12px;" />
      ${memo ? `<p style="font-size:12px; color:#cbd5e1; margin-bottom:8px;">Nội dung: <strong>${memo}</strong></p>` : ''}
      <p style="font-size:10px; color:#64748b;">
        Powered by <a href="https://huyhoang2k5.github.io/vietqr-widget/" target="_blank" style="color:#38bdf8; text-decoration:none;">VietQR Widget</a>
      </p>
    </div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(modal);

  btn.addEventListener('click', () => modal.style.display = 'flex');
  modal.querySelector('.vietqr-close-btn').addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
})();
