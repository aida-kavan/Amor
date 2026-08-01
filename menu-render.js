// ============================================================
// این فایل رو لازم نیست ویرایش کنی.
// این اسکریپت فقط داده‌های menu-data.js رو می‌خونه و منو رو می‌سازه.
// ============================================================

(function () {
  function toPersianDigits(str) {
    const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/\d/g, (d) => persian[d]);
  }

  function formatPrice(num) {
    // جدا کردن هر سه رقم با «،» و تبدیل به ارقام فارسی، مثل ۴۵۰،۰۰۰
    const withSeparators = Number(num).toLocaleString('en-US').replace(/,/g, '،');
    return toPersianDigits(withSeparators);
  }

  function injectLightboxStyles() {
    if (document.getElementById('amorLightboxStyles')) return;
    const style = document.createElement('style');
    style.id = 'amorLightboxStyles';
    style.textContent = `
      .itemImg img { cursor: zoom-in; }
      .amorLightboxOverlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 24px;
        box-sizing: border-box;
      }
      .amorLightboxOverlay.open {
        display: flex;
      }
      .amorLightboxOverlay img {
        max-width: 92vw;
        max-height: 88vh;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      }
      .amorLightboxClose {
        position: absolute;
        top: 18px;
        left: 18px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
        font-size: 22px;
        line-height: 1;
        cursor: pointer;
      }
      .amorLightboxClose:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    `;
    document.head.appendChild(style);
  }

  function getLightbox() {
    let overlay = document.getElementById('amorLightboxOverlay');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = 'amorLightboxOverlay';
    overlay.className = 'amorLightboxOverlay';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'amorLightboxClose';
    closeBtn.setAttribute('aria-label', 'بستن');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => closeLightbox());

    const img = document.createElement('img');
    img.id = 'amorLightboxImg';
    img.alt = '';

    overlay.appendChild(closeBtn);
    overlay.appendChild(img);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });

    document.body.appendChild(overlay);
    return overlay;
  }

  function openLightbox(src, alt) {
    const overlay = getLightbox();
    const img = document.getElementById('amorLightboxImg');
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('open');
  }

  function closeLightbox() {
    const overlay = document.getElementById('amorLightboxOverlay');
    if (overlay) overlay.classList.remove('open');
  }

  function buildItem(item, isVeryLast) {
    const wrapper = document.createElement('div');
    wrapper.className = 'MenuItems';
    if (isVeryLast) {
      wrapper.style.marginBottom = '50px';
    }

    if (item.img) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'itemImg flex';
      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.name || '';
      img.addEventListener('click', () => openLightbox(item.img, item.name));
      imgWrap.appendChild(img);
      wrapper.appendChild(imgWrap);
    }

    const detail = document.createElement('div');
    detail.className = 'itemDetail';
    if (!item.img) {
      detail.style.marginRight = '30px';
    }

    const h3 = document.createElement('h3');
    h3.textContent = item.name;
    detail.appendChild(h3);

    if (item.desc) {
      const p = document.createElement('p');
      p.textContent = item.desc;
      detail.appendChild(p);
    }

    const h5 = document.createElement('h5');
    h5.textContent = formatPrice(item.price);
    detail.appendChild(h5);

    if (item.orderBtn !== false) {
      const span = document.createElement('span');
      span.id = 'OrderBtn';
      span.textContent = 'اضافه کردن به سبد خرید';
      detail.appendChild(span);
    }

    wrapper.appendChild(detail);
    return wrapper;
  }

  function renderMenu() {
    injectLightboxStyles();
    const container = document.querySelector('.Restaurant');
    if (!container) {
      console.error('کانتینر ".Restaurant" توی HTML پیدا نشد.');
      return;
    }

    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    menuData.forEach((section, sIndex) => {
      const h1 = document.createElement('h1');
      h1.id = section.id;
      h1.textContent = section.title;
      fragment.appendChild(h1);

      const isLastSection = sIndex === menuData.length - 1;
      section.items.forEach((item, iIndex) => {
        const isVeryLast = isLastSection && iIndex === section.items.length - 1;
        fragment.appendChild(buildItem(item, isVeryLast));
      });
    });

    container.appendChild(fragment);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderMenu);
  } else {
    renderMenu();
  }
})();
