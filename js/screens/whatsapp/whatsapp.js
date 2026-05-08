import AC_SCREENS from '../../screens-init.js';

Object.assign(AC_SCREENS, {

whatsapp() {
  const botNumber = window.AC_CONFIG?.WHATSAPP_NUMBER || '+234 XXX XXX XXXX';
  const waLink    = `https://wa.me/${botNumber.replace(/\D/g,'')}?text=help`;

  const commands = [
    { cmd: 'price hybrid maize seeds', desc: 'Get current prices for any agricultural input' },
    { cmd: 'track AGR-2026-001234',    desc: 'Track your order status by order number'       },
    { cmd: 'balance',                  desc: 'Check your AgroConnect wallet balance'          },
    { cmd: 'help',                     desc: 'Show the full command menu'                     },
  ];

  return `
  <div class="animate-fadeIn" style="max-width:600px;margin:0 auto;padding:24px 24px 48px;">

    <!-- HERO -->
    <div style="background:linear-gradient(135deg,#25D366 0%,#128C7E 100%);border-radius:var(--radius-xl);padding:36px 32px;margin-bottom:28px;text-align:center;position:relative;overflow:hidden;">
      <div style="position:absolute;right:-30px;top:-30px;width:160px;height:160px;background:rgba(255,255,255,0.07);border-radius:50%;"></div>
      <div style="font-size:56px;margin-bottom:16px;">💬</div>
      <h1 style="color:white;font-size:var(--text-2xl);font-weight:700;margin-bottom:8px;">AgroConnect on WhatsApp</h1>
      <p style="color:rgba(255,255,255,0.85);font-size:var(--text-sm);max-width:380px;margin:0 auto 24px;">
        Check input prices, track orders, and manage your wallet — without opening the app. Works on any phone.
      </p>
      <a href="${waLink}" target="_blank" rel="noopener"
        style="display:inline-block;background:white;color:#128C7E;font-size:var(--text-base);font-weight:700;
               padding:13px 32px;border-radius:var(--radius-full);text-decoration:none;">
        Open WhatsApp Chat →
      </a>
    </div>

    <!-- BOT NUMBER -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:20px 24px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
      <div>
        <div style="font-size:var(--text-xs);color:var(--gray-400);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px;">Bot Number</div>
        <div style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);">${botNumber}</div>
      </div>
      <button onclick="navigator.clipboard?.writeText('${botNumber}').then(()=>showToast('Number copied','success'))"
        style="padding:9px 18px;background:var(--gray-100);color:var(--gray-700);border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:600;font-family:var(--font);cursor:pointer;">
        Copy
      </button>
    </div>

    <!-- COMMANDS -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;margin-bottom:20px;">
      <div style="padding:16px 20px;border-bottom:1px solid var(--gray-100);">
        <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin:0;">What you can do</h3>
      </div>
      ${commands.map((c, i) => `
        <div style="padding:16px 20px;${i < commands.length-1 ? 'border-bottom:1px solid var(--gray-100)' : ''};display:flex;gap:14px;align-items:flex-start;">
          <div style="flex:1;">
            <div style="font-size:var(--text-sm);color:var(--gray-900);margin-bottom:3px;">${c.desc}</div>
            <div style="font-size:var(--text-xs);font-family:monospace;background:var(--gray-100);color:#128C7E;padding:3px 8px;border-radius:4px;display:inline-block;">
              ${c.cmd}
            </div>
          </div>
          <button onclick="navigator.clipboard?.writeText('${c.cmd}').then(()=>showToast('Copied — paste it in WhatsApp','success'))"
            style="background:none;border:none;cursor:pointer;color:var(--gray-400);font-size:16px;flex-shrink:0;padding:4px;">⎘</button>
        </div>
      `).join('')}
    </div>

    <!-- HOW IT WORKS -->
    <div style="background:var(--green-pale);border:1px solid #BBF7D0;border-radius:var(--radius-md);padding:20px 24px;">
      <h3 style="font-size:var(--text-md);font-weight:700;color:#15803D;margin-bottom:12px;">How it works</h3>
      ${[
        ['Save the number', `Add ${botNumber} to your contacts as "AgroConnect Bot"`],
        ['Send a message',  'Type any command in plain English — no app download needed'],
        ['Get instant reply','The bot queries live data and replies within seconds'],
      ].map(([step, desc], i) => `
        <div style="display:flex;gap:12px;${i < 2 ? 'margin-bottom:12px' : ''}">
          <div style="width:26px;height:26px;border-radius:50%;background:#16A34A;color:white;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${i+1}</div>
          <div>
            <div style="font-size:var(--text-sm);font-weight:700;color:#15803D;">${step}</div>
            <div style="font-size:var(--text-xs);color:#16A34A;margin-top:1px;">${desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
},

});
