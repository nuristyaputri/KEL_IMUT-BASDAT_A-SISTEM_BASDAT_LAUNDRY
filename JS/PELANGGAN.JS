(function () {
  'use strict';

  /* --------------------------------------------------------------------------
   * 1. KONSTANTA & DATA AWAL (DEFAULT STATE)
   * -------------------------------------------------------------------------- */
  var STORAGE_KEYS = {
    PROFILE: 'bersihin_pelanggan_profile',
    ORDERS: 'bersihin_pelanggan_orders',
    ACTIVE_TRX: 'bersihin_pelanggan_active_trx'
  };

  var DEFAULT_PROFILE = {
    id: 'PLG-001',
    nama: 'Nadia Putri',
    telepon: '0812 3456 7821',
    email: 'nadia.putri@email.com',
    alamat: 'Jl. Mawar No. 17, Bandung',
    notif: true
  };

  var LAYANAN_MAP = {
    'cuci-kering': {
      key: 'cuci-kering',
      name: 'Cuci Kering',
      pricePerKg: 9000,
      priceText: 'Rp 9.000',
      days: 2,
      meta: 'Rp 9.000 / kg · Estimasi 2 hari'
    },
    'cuci-setrika': {
      key: 'cuci-setrika',
      name: 'Cuci + Setrika',
      pricePerKg: 12000,
      priceText: 'Rp 12.000',
      days: 3,
      meta: 'Rp 12.000 / kg · Estimasi 3 hari'
    },
    'express': {
      key: 'express',
      name: 'Express',
      pricePerKg: 20000,
      priceText: 'Rp 20.000',
      days: 1,
      meta: 'Rp 20.000 / kg · Estimasi 1 hari'
    },
    'bed-cover': {
      key: 'bed-cover',
      name: 'Bed Cover',
      pricePerKg: 25000,
      priceText: 'Rp 25.000',
      days: 3,
      meta: 'Rp 25.000 / kg · Estimasi 3 hari'
    }
  };

  var DEFAULT_ORDERS = [
    {
      kode: 'TRX-240621',
      pelanggan: 'Nadia Putri',
      layanan: 'Cuci Kering',
      tanggal: '21 Jun 2024',
      estimasi: '23 Juni 2024',
      berat: '4.5 kg',
      beratNum: 4.5,
      total: 'Rp 40.500',
      totalNum: 40500,
      status: 'Diproses',
      statusClass: 'status-process',
      step: 2,
      waktuStep: ['21 Jun, 09:30', '21 Jun, 11:00', 'Menunggu', 'Menunggu'],
      catatan: 'Pisahkan pakaian berwarna putih'
    },
    {
      kode: 'TRX-240510',
      pelanggan: 'Nadia Putri',
      layanan: 'Cuci + Setrika',
      tanggal: '10 Mei 2024',
      estimasi: '13 Mei 2024',
      berat: '3.5 kg',
      beratNum: 3.5,
      total: 'Rp 42.000',
      totalNum: 42000,
      status: 'Diambil',
      statusClass: 'status-done',
      step: 4,
      waktuStep: ['10 Mei, 08:30', '10 Mei, 10:15', '12 Mei, 16:00', '13 Mei, 09:45'],
      catatan: ''
    },
    {
      kode: 'TRX-240418',
      pelanggan: 'Nadia Putri',
      layanan: 'Express',
      tanggal: '18 Apr 2024',
      estimasi: '19 April 2024',
      berat: '2 kg',
      beratNum: 2,
      total: 'Rp 40.000',
      totalNum: 40000,
      status: 'Diambil',
      statusClass: 'status-done',
      step: 4,
      waktuStep: ['18 Apr, 09:00', '18 Apr, 10:00', '19 Apr, 08:30', '19 Apr, 11:20'],
      catatan: ''
    }
  ];

  /* --------------------------------------------------------------------------
   * 2. HELPER FUNCTIONS & STORAGE API
   * -------------------------------------------------------------------------- */
  function getProfile() {
    try {
      var raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      // Fallback ke default
    }
    saveProfile(DEFAULT_PROFILE);
    return DEFAULT_PROFILE;
  }

  function saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      // Abaikan jika storage penuh / private mode
    }
  }

  function getOrders() {
    try {
      var raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // Fallback ke default
    }
    saveOrders(DEFAULT_ORDERS);
    return DEFAULT_ORDERS;
  }

  function saveOrders(orders) {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      // Abaikan jika gagal
    }
  }

  function findOrderByCode(code) {
    if (!code) return null;
    var normalized = String(code).trim().toUpperCase();
    var orders = getOrders();
    for (var i = 0; i < orders.length; i++) {
      if (orders[i].kode.toUpperCase() === normalized) {
        return orders[i];
      }
    }
    return null;
  }

  function getInitials(name) {
    if (!name) return 'NP';
    var parts = String(name).trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  function getFirstName(name) {
    if (!name) return 'Pelanggan';
    return String(name).trim().split(/\s+/)[0];
  }

  function formatRupiah(num) {
    var n = Math.round(Number(num) || 0);
    return 'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function formatBerat(num) {
    var n = Number(num) || 0;
    return (n % 1 === 0 ? n.toString() : n.toFixed(1)) + ' kg';
  }

  function showToast(message, type) {
    var existing = document.getElementById('bersihin-toast');
    if (existing) {
      existing.remove();
    }

    var toast = document.createElement('div');
    toast.id = 'bersihin-toast';
    var bgColor = type === 'error' ? '#DC2626' : '#10284C';
    toast.style.cssText = [
      'position: fixed',
      'bottom: 24px',
      'right: 24px',
      'z-index: 9999',
      'background: ' + bgColor,
      'color: #FFFFFF',
      'padding: 12px 18px',
      'border-radius: 12px',
      'font-size: 12px',
      'font-weight: 700',
      'box-shadow: 0 10px 25px rgba(16, 40, 76, 0.25)',
      'display: flex',
      'align-items: center',
      'gap: 10px',
      'opacity: 0',
      'transform: translateY(10px)',
      'transition: opacity 0.25s ease, transform 0.25s ease'
    ].join(';');

    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 260);
    }, 3200);
  }

  /* --------------------------------------------------------------------------
   * 3. SINKRONISASI NAVBAR & PROFIL GLOBAL
   * -------------------------------------------------------------------------- */
  function syncGlobalProfileUI() {
    var profile = getProfile();
    var initials = getInitials(profile.nama);

    var userNames = document.querySelectorAll('.user-name');
    for (var i = 0; i < userNames.length; i++) {
      userNames[i].textContent = profile.nama;
    }

    var userIds = document.querySelectorAll('.user-id');
    for (var j = 0; j < userIds.length; j++) {
      userIds[j].textContent = profile.id;
    }

    var avatars = document.querySelectorAll('.user-avatar');
    for (var k = 0; k < avatars.length; k++) {
      avatars[k].textContent = initials;
    }
  }

  /* --------------------------------------------------------------------------
   * 4. HALAMAN LOGIN (login.html)
   * -------------------------------------------------------------------------- */
  function initLoginPage() {
    var loginForm = document.querySelector('.login-form');
    if (!loginForm) return;

    var profile = getProfile();
    var telInput = document.getElementById('telepon');
    var passInput = document.getElementById('password');
    var forgotLink = document.querySelector('.forgot-link');

    if (telInput && profile.telepon) {
      telInput.value = profile.telepon;
    }

    // Hapus inline handler agar dikelola penuh oleh script ini
    loginForm.removeAttribute('onsubmit');

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var tel = telInput ? telInput.value.trim() : '';
      var pass = passInput ? passInput.value.trim() : '';

      if (!tel) {
        showToast('Masukkan nomor telepon yang terdaftar.', 'error');
        if (telInput) telInput.focus();
        return;
      }

      if (!pass) {
        showToast('Masukkan kata sandi akun Anda.', 'error');
        if (passInput) passInput.focus();
        return;
      }

      // Simpan nomor telepon ke profil jika diubah saat login
      profile.telepon = tel;
      saveProfile(profile);

      window.location.href = 'dashboard.html';
    });

    if (forgotLink) {
      forgotLink.addEventListener('click', function (e) {
        e.preventDefault();
        showToast('Hubungi petugas Bersihin Laundry (0812 2210 4567) untuk reset kata sandi.');
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 5. HALAMAN BERANDA / DASHBOARD (dashboard.html)
   * -------------------------------------------------------------------------- */
  function initDashboardPage() {
    var heroTitle = document.querySelector('.hero-title');
    var trackForm = document.querySelector('.track-search-row');
    var activeOrderCard = document.querySelector('.active-order-card');

    if (!heroTitle && !trackForm && !activeOrderCard) return;

    var profile = getProfile();
    var orders = getOrders();

    // Perbarui sapaan di Hero
    if (heroTitle) {
      heroTitle.textContent =
        'Hai, ' + getFirstName(profile.nama) + '! Cucian bersihmu sedang kami siapkan.';
    }

    // Cari pesanan aktif (prioritaskan yang berstatus 'Diproses', atau transaksi terbaru)
    var activeOrder = orders[0];
    for (var i = 0; i < orders.length; i++) {
      if (orders[i].status !== 'Diambil') {
        activeOrder = orders[i];
        break;
      }
    }

    // Render kartu lacak cepat di Hero
    var trackInput = trackForm ? trackForm.querySelector('.track-input') : null;
    var trackResultMini = document.querySelector('.track-result-mini');

    function updateMiniTrackCard(orderCode) {
      if (!trackResultMini) return;
      var found = findOrderByCode(orderCode);
      var metaEl = trackResultMini.querySelector('.track-mini-meta');
      var svcEl = trackResultMini.querySelector('.track-mini-service');
      var badgeEl = trackResultMini.querySelector('.status-badge');

      if (found) {
        trackResultMini.href = 'pesanan.html?trx=' + encodeURIComponent(found.kode);
        if (metaEl) metaEl.textContent = found.kode + ' · ' + profile.nama;
        if (svcEl) svcEl.textContent = found.layanan;
        if (badgeEl) {
          badgeEl.className = 'status-badge ' + found.statusClass;
          badgeEl.innerHTML =
            '<span class="status-dot"></span><span>' + found.status + '</span>';
        }
      } else {
        trackResultMini.href = 'pesanan.html';
        if (metaEl) metaEl.textContent = (orderCode || 'Kode TRX') + ' · Tidak ditemukan';
        if (svcEl) svcEl.textContent = 'Periksa kembali nomor nota Anda';
        if (badgeEl) {
          badgeEl.className = 'status-badge status-process';
          badgeEl.innerHTML = '<span class="status-dot"></span><span>Cek Nota</span>';
        }
      }
    }

    if (trackInput && activeOrder) {
      trackInput.value = activeOrder.kode;
      updateMiniTrackCard(activeOrder.kode);

      trackInput.addEventListener('input', function () {
        updateMiniTrackCard(trackInput.value);
      });
    }

    if (trackForm) {
      trackForm.removeAttribute('onsubmit');
      trackForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var code = trackInput ? trackInput.value.trim().toUpperCase() : '';
        var found = findOrderByCode(code);
        if (found) {
          window.location.href = 'pesanan.html?trx=' + encodeURIComponent(found.kode);
        } else {
          updateMiniTrackCard(code);
          showToast('Nomor transaksi "' + code + '" tidak ditemukan.', 'error');
        }
      });
    }

    // Render Kartu Pesanan Aktif & Stepper Horizontal
    if (activeOrderCard && activeOrder) {
      var estRight = document.querySelector('.section-meta-right');
      if (estRight) {
        estRight.textContent = 'Estimasi selesai: ' + activeOrder.estimasi;
      }

      var trxCodeEl = activeOrderCard.querySelector('.order-trx-code');
      var svcNameEl = activeOrderCard.querySelector('.order-service-name');
      var statVals = activeOrderCard.querySelectorAll('.order-stat-val');
      var statusBadge = activeOrderCard.querySelector('.status-badge');
      var idLink = activeOrderCard.querySelector('.order-id-group');

      if (trxCodeEl) trxCodeEl.textContent = activeOrder.kode;
      if (svcNameEl) svcNameEl.textContent = activeOrder.layanan;
      if (statVals.length >= 2) {
        statVals[0].textContent = activeOrder.berat;
        statVals[1].textContent = activeOrder.total;
      }
      if (idLink) {
        idLink.href = 'pesanan.html?trx=' + encodeURIComponent(activeOrder.kode);
      }
      if (statusBadge) {
        statusBadge.href = 'pesanan.html?trx=' + encodeURIComponent(activeOrder.kode);
        statusBadge.className = 'status-badge ' + activeOrder.statusClass;
        statusBadge.innerHTML =
          '<span class="status-dot"></span><span>' + activeOrder.status + '</span>';
      }

      // Perbarui Stepper Horizontal
      var steps = activeOrderCard.querySelectorAll('.stepper-step');
      var lineFill = activeOrderCard.querySelector('.stepper-line-fill');
      var currentStep = activeOrder.step || 2;

      if (lineFill) {
        var fillPercents = { 1: '0%', 2: '33.33%', 3: '66.66%', 4: '100%' };
        lineFill.style.width = fillPercents[currentStep] || '33.33%';
      }

      for (var s = 0; s < steps.length; s++) {
        var stepEl = steps[s];
        var timeEl = stepEl.querySelector('.stepper-time');
        if (s < currentStep) {
          stepEl.classList.add('done');
        } else {
          stepEl.classList.remove('done');
        }
        if (timeEl && activeOrder.waktuStep && activeOrder.waktuStep[s]) {
          timeEl.textContent = activeOrder.waktuStep[s];
        }
      }
    }
  }

  /* --------------------------------------------------------------------------
   * 6. HALAMAN PESANAN SAYA (pesanan.html)
   * -------------------------------------------------------------------------- */
  function initPesananPage() {
    var mainCard = document.querySelector('.pesanan-main-card');
    if (!mainCard) return;

    var params = new URLSearchParams(window.location.search);
    var requestedTrx = params.get('trx');
    var orders = getOrders();

    // Tentukan transaksi yang ditampilkan
    var currentOrder = findOrderByCode(requestedTrx);
    if (!currentOrder) {
      currentOrder = orders[0];
    }

    var sidebarForm = document.querySelector('.pesanan-sidebar form');
    var sidebarInput = document.querySelector('.sidebar-input');
    var foundAlertBox = document.querySelector('.found-alert-box');

    function renderMainOrderCard(order) {
      if (!order) return;

      var trxCodeEl = mainCard.querySelector('.order-trx-code');
      var svcNameEl = mainCard.querySelector('.order-service-name');
      var badgeEl = mainCard.querySelector('.order-card-top .status-badge');
      var stripValues = mainCard.querySelectorAll('.meta-strip-value');
      var timelineItems = mainCard.querySelectorAll('.timeline-item');

      if (trxCodeEl) trxCodeEl.textContent = order.kode;
      if (svcNameEl) svcNameEl.textContent = order.layanan;
      if (badgeEl) {
        badgeEl.className = 'status-badge ' + order.statusClass;
        badgeEl.innerHTML =
          '<span class="status-dot"></span><span>' + order.status + '</span>';
      }

      if (stripValues.length >= 3) {
        stripValues[0].textContent = order.tanggal;
        stripValues[1].textContent = order.berat;
        stripValues[2].textContent = order.total;
      }

      var activeStepCount = order.step || 2;
      for (var i = 0; i < timelineItems.length; i++) {
        if (i < activeStepCount) {
          timelineItems[i].classList.add('active');
        } else {
          timelineItems[i].classList.remove('active');
        }
      }
    }

    function renderSidebarAlert(order, searchedCode) {
      if (!foundAlertBox) return;
      var labelEl = foundAlertBox.querySelector('.found-alert-label');
      var svcEl = foundAlertBox.querySelector('.found-alert-service');
      var badgeEl = foundAlertBox.querySelector('.status-badge');

      if (order) {
        foundAlertBox.style.background = '';
        if (labelEl) {
          labelEl.style.color = '';
          labelEl.textContent = 'Transaksi ditemukan';
        }
        if (svcEl) svcEl.textContent = order.layanan;
        if (badgeEl) {
          badgeEl.className = 'status-badge ' + order.statusClass;
          badgeEl.innerHTML =
            '<span class="status-dot"></span><span>' + order.status + '</span>';
        }
      } else {
        foundAlertBox.style.background = '#FEF2F2';
        if (labelEl) {
          labelEl.style.color = '#DC2626';
          labelEl.textContent = 'Transaksi tidak ditemukan';
        }
        if (svcEl) svcEl.textContent = searchedCode || 'Periksa nomor nota';
        if (badgeEl) {
          badgeEl.className = 'status-badge status-process';
          badgeEl.innerHTML = '<span class="status-dot"></span><span>Tidak Ada</span>';
        }
      }
    }

    // Render awal
    renderMainOrderCard(currentOrder);
    if (sidebarInput && currentOrder) {
      sidebarInput.value = currentOrder.kode;
      renderSidebarAlert(currentOrder, currentOrder.kode);
    }

    // Interaksi form lacak di sidebar
    if (sidebarForm) {
      sidebarForm.removeAttribute('onsubmit');
      sidebarForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var code = sidebarInput ? sidebarInput.value.trim().toUpperCase() : '';
        var found = findOrderByCode(code);
        renderSidebarAlert(found, code);
        if (found) {
          renderMainOrderCard(found);
          showToast('Menampilkan detail transaksi ' + found.kode);
        } else {
          showToast('Transaksi "' + code + '" tidak ditemukan.', 'error');
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 7. HALAMAN RIWAYAT TRANSAKSI (riwayat_tr.html)
   * -------------------------------------------------------------------------- */
  function initRiwayatPage() {
    var historyCard = document.querySelector('.history-list-card');
    if (!historyCard) return;

    var profile = getProfile();
    var orders = getOrders();

    // Subjudul nama pelanggan
    var subEl = historyCard.querySelector('.history-card-sub');
    if (subEl) {
      subEl.textContent = 'Riwayat laundry ' + profile.nama;
    }

    // Hitung ringkasan 3 kartu
    var totalTransaksi = orders.length;
    var totalBerat = 0;
    var totalPengeluaran = 0;

    for (var i = 0; i < orders.length; i++) {
      totalBerat += Number(orders[i].beratNum) || 0;
      totalPengeluaran += Number(orders[i].totalNum) || 0;
    }

    var statValues = document.querySelectorAll('.summary-stat-value');
    if (statValues.length >= 3) {
      statValues[0].textContent = totalTransaksi + ' kali';
      statValues[1].textContent = formatBerat(totalBerat);
      statValues[2].textContent = formatRupiah(totalPengeluaran);
    }

    // Render daftar baris transaksi
    var rowsContainer = historyCard.querySelector('.history-card-header + div');
    if (!rowsContainer) return;

    var html = '';
    for (var j = 0; j < orders.length; j++) {
      var o = orders[j];
      var detailUrl = 'pesanan.html?trx=' + encodeURIComponent(o.kode);
      html +=
        '<div class="history-row">' +
          '<div class="history-row-left">' +
            '<div class="history-doc-icon">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>' +
                '<polyline points="14 2 14 8 20 8"></polyline>' +
              '</svg>' +
            '</div>' +
            '<div>' +
              '<a href="' + detailUrl + '" class="history-trx-id">' + o.kode + '</a>' +
              '<div class="history-trx-meta">' + o.tanggal + ' · ' + o.layanan + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="history-row-right">' +
            '<div class="history-price-col">' +
              '<div class="history-price">' + o.total + '</div>' +
              '<div class="history-weight">' + o.berat + '</div>' +
            '</div>' +
            '<a href="' + detailUrl + '" class="status-badge ' + o.statusClass + '">' +
              '<span class="status-dot"></span>' +
              '<span>' + o.status + '</span>' +
            '</a>' +
          '</div>' +
        '</div>';
    }

    rowsContainer.innerHTML = html;
  }

  /* --------------------------------------------------------------------------
   * 8. HALAMAN PEMESANAN / MODAL PESAN LAYANAN (pemesanan.html)
   * -------------------------------------------------------------------------- */
  function initPemesananPage() {
    var modalOverlay = document.querySelector('.modal-overlay');
    if (!modalOverlay) return;

    var params = new URLSearchParams(window.location.search);
    var key = params.get('layanan') || 'cuci-setrika';
    var selectedService = LAYANAN_MAP[key] || LAYANAN_MAP['cuci-setrika'];

    var subEl = document.getElementById('modal-sub');
    var nameEl = document.getElementById('modal-svc-name');
    var metaEl = document.getElementById('modal-svc-meta');
    var beratSelect = document.getElementById('berat');
    var catatanInput = document.getElementById('catatan');
    var form = modalOverlay.querySelector('form');

    function updateModalServiceInfo() {
      var weightRange = beratSelect ? beratSelect.value : '1-3';
      var estKg = weightRange === '1-3' ? 2 : weightRange === '3-5' ? 4 : 6;
      var estTotal = estKg * selectedService.pricePerKg;

      if (nameEl) nameEl.textContent = selectedService.name;
      if (metaEl) {
        metaEl.textContent =
          selectedService.meta + ' · Est. ' + formatRupiah(estTotal) + ' (~' + estKg + ' kg)';
      }
      if (subEl) {
        subEl.textContent = 'Lengkapi permintaan untuk layanan ' + selectedService.name + '.';
      }
    }

    updateModalServiceInfo();

    if (beratSelect) {
      beratSelect.addEventListener('change', updateModalServiceInfo);
    }

    // Tutup modal dengan tombol Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        window.location.href = 'layanan.html';
      }
    });

    if (form) {
      form.removeAttribute('onsubmit');
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var profile = getProfile();
        var orders = getOrders();
        var weightRange = beratSelect ? beratSelect.value : '1-3';
        var estKg = weightRange === '1-3' ? 2.5 : weightRange === '3-5' ? 4.0 : 6.0;
        var totalCost = estKg * selectedService.pricePerKg;

        // Buat kode transaksi baru yang unik
        var nextNum = 240622 + orders.length;
        var newCode = 'TRX-' + nextNum;

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        var monthsFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        var now = new Date();
        var tglMasuk = now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();

        var estDate = new Date(now.getTime() + selectedService.days * 24 * 60 * 60 * 1000);
        var tglEstimasi = estDate.getDate() + ' ' + monthsFull[estDate.getMonth()] + ' ' + estDate.getFullYear();

        var jamSekarang =
          String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
        var waktuDiterima = now.getDate() + ' ' + months[now.getMonth()] + ', ' + jamSekarang;

        var newOrder = {
          kode: newCode,
          pelanggan: profile.nama,
          layanan: selectedService.name,
          tanggal: tglMasuk,
          estimasi: tglEstimasi,
          berat: formatBerat(estKg),
          beratNum: estKg,
          total: formatRupiah(totalCost),
          totalNum: totalCost,
          status: 'Diproses',
          statusClass: 'status-process',
          step: 1,
          waktuStep: [waktuDiterima, 'Menunggu', 'Menunggu', 'Menunggu'],
          catatan: catatanInput ? catatanInput.value.trim() : ''
        };

        orders.unshift(newOrder);
        saveOrders(orders);

        window.location.href = 'pesanan.html?trx=' + encodeURIComponent(newCode);
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 9. HALAMAN PROFIL SAYA (profile.html)
   * -------------------------------------------------------------------------- */
  function initProfilePage() {
    var profileFormCard = document.querySelector('.profile-form-card');
    if (!profileFormCard) return;

    var profile = getProfile();

    var summaryAvatar = document.querySelector('.profile-avatar-lg');
    var summaryName = document.querySelector('.profile-summary-name');
    var summaryId = document.querySelector('.profile-summary-id');

    var namaInput = document.getElementById('nama');
    var teleponInput = document.getElementById('telepon');
    var emailInput = document.getElementById('email');
    var alamatInput = document.getElementById('alamat');
    var notifCheckbox = profileFormCard.querySelector('.checkbox-lg');
    var savedAlert = document.getElementById('saved-alert');
    var form = profileFormCard.querySelector('form');

    function renderProfileSummary(data) {
      var initials = getInitials(data.nama);
      if (summaryAvatar) summaryAvatar.textContent = initials;
      if (summaryName) summaryName.textContent = data.nama;
      if (summaryId) summaryId.textContent = data.id;
    }

    // Isi form dari state tersimpan
    if (namaInput) namaInput.value = profile.nama;
    if (teleponInput) teleponInput.value = profile.telepon;
    if (emailInput) emailInput.value = profile.email;
    if (alamatInput) alamatInput.value = profile.alamat;
    if (notifCheckbox) notifCheckbox.checked = Boolean(profile.notif);
    if (savedAlert) savedAlert.style.display = 'none';

    renderProfileSummary(profile);

    if (form) {
      form.removeAttribute('onsubmit');
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var updatedName = namaInput ? namaInput.value.trim() : '';
        if (!updatedName) {
          showToast('Nama lengkap tidak boleh kosong.', 'error');
          if (namaInput) namaInput.focus();
          return;
        }

        profile.nama = updatedName;
        profile.telepon = teleponInput ? teleponInput.value.trim() : profile.telepon;
        profile.email = emailInput ? emailInput.value.trim() : profile.email;
        profile.alamat = alamatInput ? alamatInput.value.trim() : profile.alamat;
        profile.notif = notifCheckbox ? notifCheckbox.checked : true;

        saveProfile(profile);
        renderProfileSummary(profile);
        syncGlobalProfileUI();

        if (savedAlert) {
          savedAlert.style.display = 'block';
        }
        showToast('Perubahan profil berhasil disimpan.');
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 10. INISIALISASI SAAT DOM SIAP
   * -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    syncGlobalProfileUI();
    initLoginPage();
    initDashboardPage();
    initPesananPage();
    initRiwayatPage();
    initPemesananPage();
    initProfilePage();
  });
})();