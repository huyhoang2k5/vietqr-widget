/**
 * VietQR Widget - Lightweight, zero-dependency VietQR Generator for websites
 * Author: huyhoang2k5 (https://github.com/huyhoang2k5/vietqr-widget)
 * License: MIT
 */
(function (global) {
  'use strict';

  const BANK_BINS = {
    'tpbank': '970423',
    'vietcombank': '970436',
    'mbbank': '970422',
    'techcombank': '970407',
    'acb': '970416',
    'bidv': '970418',
    'vietinbank': '970415',
    'vpbank': '970432',
    'hdbank': '970437',
    'ocb': '970448',
    'shb': '970443',
    'sacombank': '970403',
    'msb': '970426',
    'vib': '970441',
    'seabank': '970440',
    'namabank': '970428'
  };

  const VietQR = {
    /**
     * Get VietQR image URL
     * @param {Object} options
     * @param {string} options.bank - Bank code (e.g. 'tpbank', 'vietcombank') or BIN
     * @param {string} options.account - Account number
     * @param {number} [options.amount] - Payment amount in VND
     * @param {string} [options.memo] - Order description / transfer memo
     * @param {string} [options.template='compact2'] - 'compact', 'compact2', 'qr_only', 'print'
     * @param {string} [options.accountName] - Account holder name
     * @returns {string} URL of VietQR image
     */
    getUrl: function (options) {
      if (!options || !options.bank || !options.account) {
        throw new Error('VietQR: bank and account are required parameters.');
      }

      const bankKey = options.bank.toLowerCase().trim();
      const bin = BANK_BINS[bankKey] || options.bank;
      const account = encodeURIComponent(options.account.trim());
      const template = options.template || 'compact2';

      let url = `https://img.vietqr.io/image/${bin}-${account}-${template}.png`;
      const params = [];

      if (options.amount && Number(options.amount) > 0) {
        params.push(`amount=${encodeURIComponent(options.amount)}`);
      }
      if (options.memo) {
        params.push(`addInfo=${encodeURIComponent(options.memo)}`);
      }
      if (options.accountName) {
        params.push(`accountName=${encodeURIComponent(options.accountName)}`);
      }

      if (params.length > 0) {
        url += '?' + params.join('&');
      }

      return url;
    },

    /**
     * Auto-render VietQR in target element
     */
    render: function (target, options) {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (!el) return;

      const imgUrl = this.getUrl(options);
      el.innerHTML = `
        <div class="vietqr-container" style="display:inline-block; text-align:center; font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
          <img src="${imgUrl}" alt="VietQR Payment" style="max-width:100%; height:auto; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.1);" />
        </div>
      `;
    },

    /**
     * Scan DOM for data-vietqr elements
     */
    autoInit: function () {
      const elements = document.querySelectorAll('[data-vietqr]');
      elements.forEach((el) => {
        const bank = el.getAttribute('data-vietqr-bank') || el.getAttribute('data-bank');
        const account = el.getAttribute('data-vietqr-account') || el.getAttribute('data-account');
        const amount = el.getAttribute('data-vietqr-amount') || el.getAttribute('data-amount');
        const memo = el.getAttribute('data-vietqr-memo') || el.getAttribute('data-memo');
        const template = el.getAttribute('data-vietqr-template') || 'compact2';

        if (bank && account) {
          this.render(el, { bank, account, amount, memo, template });
        }
      });
    }
  };

  // Auto initialize on DOMContentLoaded
  if (typeof window !== 'undefined') {
    window.VietQR = VietQR;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => VietQR.autoInit());
    } else {
      VietQR.autoInit();
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = VietQR;
  }
})(typeof window !== 'undefined' ? window : this);
