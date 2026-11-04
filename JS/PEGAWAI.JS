(function () {
  'use strict';

  /* --------------------------------------------------------------------------
   * 1. KONSTANTA & DATA AWAL (DEFAULT STATE)
   * -------------------------------------------------------------------------- */
  var STORAGE_KEYS = {
    ACTIVE_USER: 'bersihin_pegawai_active_user',
    TRANSACTIONS: 'bersihin_pemilik_transactions', // Berbagi state transaksi agar sinkron
    CUSTOMERS: 'bersihin_pegawai_customers',
    SERVICES: 'bersihin_pemilik_services', // Berbagi state layanan agar sinkron
    EMPLOYEES: 'bersihin_pemilik_employees' // Berbagi state pegawai agar sinkron
  };

  var DEFAULT_ACTIVE_USER = {
    kode: 'PGW-001',
    nama: 'Farhan Akbar',
    jabatan: 'Administrator',
    telepon: '0812 2210 4567',
    alamat: 'Jl. Melati No. 12, Bandung',
    shift: 'Pagi',
    transaksi: 24,
    status: 'Aktif',
    bergabung: '12 Januari 2022',
    masaKerja: '3 tahun',
    password: '12345678'
  };

  var DEFAULT_TRANSACTIONS = [
    {
      kode: 'TRX-240621',
      tanggal: '21 Jun 2024',
      pelanggan: 'Nadia Putri',
      telepon: '0812 3456 7821',
      layanan: 'Cuci Kering',
      detailLayanan: '1 detail layanan',
      berat: '4.5 kg',
      beratNum: 4.5,
      total: 'Rp 40.500',
      totalNum: 40500,
      status: 'Diproses',
      pembayaran: 'Belum Lunas',
      pegawai: 'Farhan Akbar'
    },
    {
      kode: 'TRX-240620',
      tanggal: '20 Jun 2024',
      pelanggan: 'Rizky Aditya',
      telepon: '0857 1390 2274',
      layanan: 'Cuci + Setrika',
      detailLayanan: '1 detail layanan',
      berat: '3 kg',
      beratNum: 3,
      total: 'Rp 36.000',
      totalNum: 36000,
      status: 'Selesai',
      pembayaran: 'Lunas',
      pegawai: 'Maya Lestari'
    },
    {
      kode: 'TRX-240619',
      tanggal: '19 Jun 2024',
      pelanggan: 'Siti Rahma',
      telepon: '0813 8865 0912',
      layanan: 'Express',
      detailLayanan: '1 detail layanan',
      berat: '2.5 kg',
      beratNum: 2.5,
      total: 'Rp 50.000',
      totalNum: 50000,
      status: 'Diambil',
      pembayaran: 'Lunas',
      pegawai: 'Andi Setiawan'
    },
    {
      kode: 'TRX-240618',
      tanggal: '18 Jun 2024',
      pelanggan: 'Dimas Pratama',
      telepon: '0821 7762 4108',
      layanan: 'Cuci Kering',
      detailLayanan: '1 detail layanan',
      berat: '6 kg',
      beratNum: 6,
      total: 'Rp 54.000',
      totalNum: 54000,
      status: 'Diproses',
      pembayaran: 'Belum Lunas',
      pegawai: 'Farhan Akbar'
    },
    {
      kode: 'TRX-240617',
      tanggal: '17 Jun 2024',
      pelanggan: 'Aulia Safitri',
      telepon: '0819 5231 8410',
      layanan: 'Cuci + Setrika',
      detailLayanan: '1 detail layanan',
      berat: '4 kg',
      beratNum: 4,
      total: 'Rp 48.000',
      totalNum: 48000,
      status: 'Diambil',
      pembayaran: 'Lunas',
      pegawai: 'Maya Lestari'
    },
    {
      kode: 'TRX-240616',
      tanggal: '16 Jun 2024',
      pelanggan: 'Bayu Saputra',
      telepon: '0852 6742 9901',
      layanan: 'Express',
      detailLayanan: '1 detail layanan',
      berat: '3.5 kg',
      beratNum: 3.5,
      total: 'Rp 70.000',
      totalNum: 70000,
      status: 'Selesai',
      pembayaran: 'Lunas',
      pegawai: 'Andi Setiawan'
    }
  ];

  var DEFAULT_CUSTOMERS = [
    {
      kode: 'PLG-001',
      nama: 'Nadia Putri',
      telepon: '0812 3456 7821',
      alamat: 'Jl. Mawar No. 17, Bandung',
      bergabung: '10 Mei 2024',
      transaksi: 5
    },
    {
      kode: 'PLG-002',
      nama: 'Rizky Aditya',
      telepon: '0857 1390 2274',
      alamat: 'Jl. Cihampelas No. 22, Bandung',
      bergabung: '18 Mei 2024',
      transaksi: 3
    },
    {
      kode: 'PLG-003',
      nama: 'Siti Rahma',
      telepon: '0813 8865 0912',
      alamat: 'Jl. Merdeka No. 9, Bandung',
      bergabung: '01 Jun 2024',
      transaksi: 7
    },
    {
      kode: 'PLG-004',
      nama: 'Dimas Pratama',
      telepon: '0821 7762 4108',
      alamat: 'Jl. Pasteur No. 30, Bandung',
      bergabung: '06 Jun 2024',
      transaksi: 2
    }
  ];

  var DEFAULT_SERVICES = [
    {
      kode: 'LYN-01',
      nama: 'Cuci Kering',
      harga: 9000,
      durasi: '2 hari',
      pesanan: 42,
      color: 'blue'
    },
    {
      kode: 'LYN-02',
      nama: 'Cuci + Setrika',
      harga: 12000,
      durasi: '3 hari',
      pesanan: 36,
      color: 'purple'
    },
    {
      kode: 'LYN-03',
      nama: 'Express',
      harga: 20000,
      durasi: '1 hari',
      pesanan: 18,
      color: 'orange'
    },
    {
      kode: 'LYN-04',
      nama: 'Bed Cover',
      harga: 25000,
      durasi: '3 hari',
      pesanan: 11,
      color: 'green'
    }
  ];

  var DEFAULT_EMPLOYEES = [
    {
      kode: 'PGW-001',
      nama: 'Farhan Akbar',
      telepon: '0812 2210 4567',
      alamat: 'Jl. Melati No. 12, Bandung',
      jabatan: 'Administrator',
      shift: 'Pagi',
      transaksi: 24,
      status: 'Aktif'
    },
    {
      kode: 'PGW-002',
      nama: 'Maya Lestari',
      telepon: '0857 3401 8622',
      alamat: 'Jl. Cendana No. 8, Bandung',
      jabatan: 'Kasir',
      shift: 'Pagi',
      transaksi: 18,
      status: 'Aktif'
    },
    {
      kode: 'PGW-003',
      nama: 'Andi Setiawan',
      telepon: '0821 7732 1109',
      alamat: 'Jl. Sukajadi No. 41, Bandung',
      jabatan: 'Operator Laundry',
      shift: 'Siang',
      transaksi: 31,
      status: 'Aktif'
    },
    {
      kode: 'PGW-004',
      nama: 'Nisa Amelia',
      telepon: '0819 6021 4533',
      alamat: 'Jl. Anggrek No. 5, Bandung',
      jabatan: 'Operator Laundry',
      shift: 'Siang',
      transaksi: 22,
      status: 'Nonaktif'
    }
  ];

  /* --------------------------------------------------------------------------
   * 2. HELPER FUNCTIONS & STORAGE API
   * -------------------------------------------------------------------------- */
  function getActiveUser() {
    try {
      var raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    saveActiveUser(DEFAULT_ACTIVE_USER);
    return DEFAULT_ACTIVE_USER;
  }

  function saveActiveUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(user));
    } catch (e) {}
  }

  function getTransactions() {
    try {
      var raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    saveTransactions(DEFAULT_TRANSACTIONS);
    return DEFAULT_TRANSACTIONS;
  }

  function saveTransactions(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(list));
    } catch (e) {}
  }

  function getCustomers() {
    try {
      var raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    saveCustomers(DEFAULT_CUSTOMERS);
    return DEFAULT_CUSTOMERS;
  }

  function saveCustomers(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(list));
    } catch (e) {}
  }

  function getServices() {
    try {
      var raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    saveServices(DEFAULT_SERVICES);
    return DEFAULT_SERVICES;
  }

  function saveServices(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(list));
    } catch (e) {}
  }

  function getEmployees() {
    try {
      var raw = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    saveEmployees(DEFAULT_EMPLOYEES);
    return DEFAULT_EMPLOYEES;
  }

  function saveEmployees(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(list));
    } catch (e) {}
  }

  function getInitials(name) {
    if (!name) return 'FA';
    var parts = String(name).trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  function getFirstName(name) {
    if (!name) return 'Farhan';
    return String(name).trim().split(/\s+/)[0];
  }

  function formatRupiah(num, noSpace) {
    var n = Math.round(Number(num) || 0);
    var formatted = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (noSpace ? 'Rp' : 'Rp ') + formatted;
  }

  function formatBerat(num) {
    var n = Number(num) || 0;
    return (n % 1 === 0 ? n.toString() : n.toFixed(1)) + ' kg';
  }

  function statusSlug(status) {
    var s = String(status || '').toLowerCase();
    if (s.indexOf('selesai') !== -1) return 'selesai';
    if (s.indexOf('diambil') !== -1) return 'diambil';
    return 'diproses';
  }

  function showToast(message, type) {
    var existing = document.getElementById('bersihin-staff-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'bersihin-staff-toast';
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
    }, 3000);
  }

  /* --------------------------------------------------------------------------
   * 3. SINKRONISASI TOPBAR & NOTIFIKASI GLOBAL
   * -------------------------------------------------------------------------- */
  function syncGlobalStaffUI() {
    var user = getActiveUser();
    var initials = getInitials(user.nama);

    var userNames = document.querySelectorAll('.topbar .user-name');
    for (var i = 0; i < userNames.length; i++) {
      userNames[i].textContent = user.nama;
    }

    var userRoles = document.querySelectorAll('.topbar .user-role');
    for (var j = 0; j < userRoles.length; j++) {
      userRoles[j].textContent = user.jabatan || 'Administrator';
    }

    var userAvatars = document.querySelectorAll('.topbar .user-avatar');
    for (var k = 0; k < userAvatars.length; k++) {
      userAvatars[k].textContent = initials;
    }

    // Tombol lonceng notifikasi di Topbar
    var notifBtns = document.querySelectorAll('.notif-btn');
    for (var n = 0; n < notifBtns.length; n++) {
      notifBtns[n].addEventListener('click', function () {
        var transactions = getTransactions();
        var diprosesCount = 0;
        for (var t = 0; t < transactions.length; t++) {
          if (statusSlug(transactions[t].status) === 'diproses') {
            diprosesCount++;
          }
        }
        var dot = this.querySelector('.notif-dot');
        if (dot) dot.style.display = 'none';
        showToast(
          'Notifikasi: Ada ' +
            diprosesCount +
            ' cucian berstatus Diproses yang perlu diselesaikan hari ini.'
        );
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 4. HALAMAN LOGIN PEGAWAI (login.html)
   * -------------------------------------------------------------------------- */
  function initLoginPage() {
    var loginForm = document.querySelector('.login-form');
    if (!loginForm) return;

    var user = getActiveUser();
    var kodeInput = document.getElementById('kode_pegawai');
    var passInput = document.getElementById('password');

    if (kodeInput && user.kode) {
      kodeInput.value = user.kode;
    }

    loginForm.removeAttribute('onsubmit');
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var kode = kodeInput ? kodeInput.value.trim().toUpperCase() : '';
      var pass = passInput ? passInput.value.trim() : '';

      if (!kode) {
        showToast('Masukkan kode pegawai (contoh: PGW-001).', 'error');
        if (kodeInput) kodeInput.focus();
        return;
      }

      if (!pass) {
        showToast('Masukkan kata sandi Anda.', 'error');
        if (passInput) passInput.focus();
        return;
      }

      // Cari pegawai dari daftar jika kode cocok
      var employees = getEmployees();
      for (var i = 0; i < employees.length; i++) {
        if (employees[i].kode.toUpperCase() === kode) {
          user.kode = employees[i].kode;
          user.nama = employees[i].nama;
          user.jabatan = employees[i].jabatan;
          user.telepon = employees[i].telepon;
          user.alamat = employees[i].alamat;
          user.shift = employees[i].shift;
          user.transaksi = employees[i].transaksi;
          user.status = employees[i].status;
          break;
        }
      }

      saveActiveUser(user);
      window.location.href = 'dashboard.html';
    });
  }

  /* --------------------------------------------------------------------------
   * 5. HALAMAN DASHBOARD PEGAWAI (dashboard.html)
   * -------------------------------------------------------------------------- */
  function initDashboardPage() {
    var dashboardGrid = document.querySelector('.dashboard-grid');
    if (!dashboardGrid) return;

    var user = getActiveUser();
    var greetingH1 = document.querySelector('.page-header-text h1');
    if (greetingH1) {
      greetingH1.textContent = 'Selamat pagi, ' + getFirstName(user.nama) + '!';
    }

    var statCards = document.querySelectorAll('.stat-card-v1');
    var tbody = dashboardGrid.querySelector('.data-table tbody');
    var searchInput = dashboardGrid.querySelector('.search-box input');
    var filterSelect = dashboardGrid.querySelector('.filter-select');
    var popularList = dashboardGrid.querySelector('.popular-list');
    var popularTotalVal = dashboardGrid.querySelector('.popular-total-box .val');

    function updateDashboardStatsAndPopular() {
      var transactions = getTransactions();
      var services = getServices();

      var countDiproses = 0;
      var extraWeight = 0;
      var extraRevenue = 0;

      for (var i = 0; i < transactions.length; i++) {
        var t = transactions[i];
        if (statusSlug(t.status) === 'diproses') countDiproses++;
      }

      // Hitung offset tambahan jika ada transaksi baru di luar 6 transaksi awal
      var deltaCount = transactions.length - 6;
      for (var d = 0; d < deltaCount; d++) {
        if (transactions[d]) {
          extraWeight += Number(transactions[d].beratNum) || 0;
          extraRevenue += Number(transactions[d].totalNum) || 0;
        }
      }

      var trxToday = Math.max(0, 12 + deltaCount);
      var totalWeightToday = Math.max(0, 48.5 + extraWeight);
      var revenueToday = Math.max(0, 624000 + extraRevenue);

      if (statCards.length >= 4) {
        statCards[0].querySelector('.stat-card-v1-value').textContent = String(trxToday);
        statCards[1].querySelector('.stat-card-v1-value').textContent = String(countDiproses);
        statCards[2].querySelector('.stat-card-v1-value').textContent =
          totalWeightToday.toFixed(1).replace('.', ',').replace(',0', '') + ' kg';
        statCards[3].querySelector('.stat-card-v1-value').textContent = formatRupiah(
          revenueToday,
          true
        );
      }

      // Render Layanan Terpopuler
      if (popularList && services.length > 0) {
        var totalPesanan = 0;
        var maxPesanan = 1;
        for (var s = 0; s < services.length; s++) {
          var pCount = Number(services[s].pesanan) || 0;
          totalPesanan += pCount;
          if (pCount > maxPesanan) maxPesanan = pCount;
        }

        var popHtml = '';
        var opacities = ['1', '0.86', '0.72', '0.58'];
        for (var k = 0; k < services.length; k++) {
          var svc = services[k];
          var cnt = Number(svc.pesanan) || 0;
          var widthPct = Math.max(15, Math.round((cnt / maxPesanan) * 85));
          var op = opacities[k % opacities.length];

          popHtml +=
            '<div class="popular-item">' +
              '<div class="popular-icon ' + (svc.color || 'blue') + '">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
                  '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>' +
                '</svg>' +
              '</div>' +
              '<div class="popular-info">' +
                '<div class="popular-info-top">' +
                  '<span class="name">' + svc.nama + '</span>' +
                  '<span class="count">' + cnt + '</span>' +
                '</div>' +
                '<div class="progress-track">' +
                  '<div class="progress-fill" style="width: ' + widthPct + '%; opacity: ' + op + ';"></div>' +
                '</div>' +
              '</div>' +
            '</div>';
        }
        popularList.innerHTML = popHtml;

        if (popularTotalVal) {
          popularTotalVal.textContent = String(totalPesanan);
        }
      }
    }

    function renderRecentTransactionsTable() {
      if (!tbody) return;
      var transactions = getTransactions();
      var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      var statusFilter = filterSelect ? filterSelect.value : 'semua';

      var filtered = [];
      for (var i = 0; i < transactions.length; i++) {
        var t = transactions[i];
        var slug = statusSlug(t.status);
        var matchStatus = statusFilter === 'semua' || slug === statusFilter;
        var matchQuery =
          !query ||
          t.kode.toLowerCase().indexOf(query) !== -1 ||
          t.pelanggan.toLowerCase().indexOf(query) !== -1 ||
          t.layanan.toLowerCase().indexOf(query) !== -1;

        if (matchStatus && matchQuery) {
          filtered.push(t);
        }
      }

      var displayList = filtered.slice(0, 5);
      if (displayList.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="7" style="text-align:center; padding:28px; color:#90A1B9;">Tidak ada transaksi yang sesuai filter.</td></tr>';
        return;
      }

      var html = '';
      for (var j = 0; j < displayList.length; j++) {
        var row = displayList[j];
        var sSlug = statusSlug(row.status);
        html +=
          '<tr>' +
            '<td>' +
              '<div class="trx-code">' + row.kode + '</div>' +
              '<div class="cell-sub">' + row.tanggal + '</div>' +
            '</td>' +
            '<td>' +
              '<div class="cell-title">' + row.pelanggan + '</div>' +
              '<div class="cell-sub">' + row.telepon + '</div>' +
            '</td>' +
            '<td>' +
              '<div class="cell-service">' + row.layanan + '</div>' +
              '<div class="cell-sub">' + (row.detailLayanan || '1 detail layanan') + '</div>' +
            '</td>' +
            '<td><span class="cell-weight">' + row.berat + '</span></td>' +
            '<td><span class="cell-price">' + row.total + '</span></td>' +
            '<td>' +
              '<span class="status-pill ' + sSlug + '" data-kode="' + row.kode + '" title="Klik untuk ubah status" style="cursor:pointer;">' +
                '<span class="dot"></span>' +
                row.status +
              '</span>' +
            '</td>' +
            '<td>' +
              '<a href="transaksi.html" class="icon-action-btn" title="Detail">' +
                '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                  '<polyline points="9 18 15 12 9 6"></polyline>' +
                '</svg>' +
              '</a>' +
            '</td>' +
          '</tr>';
      }
      tbody.innerHTML = html;

      var pills = tbody.querySelectorAll('.status-pill');
      for (var p = 0; p < pills.length; p++) {
        pills[p].addEventListener('click', function () {
          var kode = this.getAttribute('data-kode');
          var list = getTransactions();
          var cycle = ['Diproses', 'Selesai', 'Diambil'];
          for (var k = 0; k < list.length; k++) {
            if (list[k].kode === kode) {
              var next = cycle[(cycle.indexOf(list[k].status) + 1) % cycle.length];
              list[k].status = next;
              saveTransactions(list);
              updateDashboardStatsAndPopular();
              renderRecentTransactionsTable();
              showToast('Status ' + kode + ' diperbarui menjadi ' + next + '.');
              break;
            }
          }
        });
      }
    }

    updateDashboardStatsAndPopular();
    renderRecentTransactionsTable();

    if (searchInput) searchInput.addEventListener('input', renderRecentTransactionsTable);
    if (filterSelect) filterSelect.addEventListener('change', renderRecentTransactionsTable);
  }

  /* --------------------------------------------------------------------------
   * 6. HALAMAN DAFTAR TRANSAKSI (transaksi.html) & MODAL (+transaksi.html)
   * -------------------------------------------------------------------------- */
  function initTransaksiPage() {
    var topbarTitle = document.querySelector('.topbar-title');
    if (!topbarTitle || topbarTitle.textContent.trim() !== 'Transaksi') return;

    var tbody = document.querySelector('.data-table tbody');
    var searchInput = document.querySelector('.search-box input');
    var filterSelect = document.querySelector('.filter-select');
    var headerSubCount = document.querySelector('.page-header-text p');

    function renderTransaksiTable() {
      if (!tbody) return;
      var transactions = getTransactions();
      if (headerSubCount) {
        headerSubCount.textContent = transactions.length + ' transaksi tersimpan dalam sistem.';
      }

      var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      var statusFilter = filterSelect ? filterSelect.value : 'semua';

      var filtered = [];
      for (var i = 0; i < transactions.length; i++) {
        var t = transactions[i];
        var slug = statusSlug(t.status);
        var matchStatus = statusFilter === 'semua' || slug === statusFilter;
        var matchQuery =
          !query ||
          t.kode.toLowerCase().indexOf(query) !== -1 ||
          t.pelanggan.toLowerCase().indexOf(query) !== -1 ||
          t.telepon.toLowerCase().indexOf(query) !== -1 ||
          t.layanan.toLowerCase().indexOf(query) !== -1;

        if (matchStatus && matchQuery) {
          filtered.push(t);
        }
      }

      if (filtered.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="7" style="text-align:center; padding:32px; color:#90A1B9;">Tidak ada transaksi yang cocok dengan pencarian.</td></tr>';
        return;
      }

      var html = '';
      for (var j = 0; j < filtered.length; j++) {
        var row = filtered[j];
        html +=
          '<tr>' +
            '<td>' +
              '<div class="trx-code">' + row.kode + '</div>' +
              '<div class="cell-sub">' + row.tanggal + '</div>' +
            '</td>' +
            '<td>' +
              '<div class="cell-title">' + row.pelanggan + '</div>' +
              '<div class="cell-sub">' + row.telepon + '</div>' +
            '</td>' +
            '<td>' +
              '<div class="cell-service">' + row.layanan + '</div>' +
              '<div class="cell-sub">' + (row.detailLayanan || '1 detail layanan') + '</div>' +
            '</td>' +
            '<td><span class="cell-weight">' + row.berat + '</span></td>' +
            '<td><span class="cell-price">' + row.total + '</span></td>' +
            '<td>' +
              '<select class="status-select" data-status-kode="' + row.kode + '" aria-label="Status ' + row.kode + '">' +
                '<option value="Diproses"' + (row.status === 'Diproses' ? ' selected' : '') + '>Diproses</option>' +
                '<option value="Selesai"' + (row.status === 'Selesai' ? ' selected' : '') + '>Selesai</option>' +
                '<option value="Diambil"' + (row.status === 'Diambil' ? ' selected' : '') + '>Diambil</option>' +
              '</select>' +
            '</td>' +
            '<td>' +
              '<button type="button" class="icon-action-btn delete" data-del-trx="' + row.kode + '" title="Hapus">' +
                '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
                  '<polyline points="3 6 5 6 21 6"></polyline>' +
                  '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
                '</svg>' +
              '</button>' +
            '</td>' +
          '</tr>';
      }
      tbody.innerHTML = html;

      // Listener perubahan dropdown status
      var statusSelects = tbody.querySelectorAll('[data-status-kode]');
      for (var s = 0; s < statusSelects.length; s++) {
        statusSelects[s].addEventListener('change', function () {
          var kode = this.getAttribute('data-status-kode');
          var newStatus = this.value;
          var list = getTransactions();
          for (var k = 0; k < list.length; k++) {
            if (list[k].kode === kode) {
              list[k].status = newStatus;
              saveTransactions(list);
              showToast('Status ' + kode + ' berhasil diubah ke ' + newStatus + '.');
              break;
            }
          }
        });
      }

      // Listener tombol hapus transaksi
      var delBtns = tbody.querySelectorAll('[data-del-trx]');
      for (var d = 0; d < delBtns.length; d++) {
        delBtns[d].addEventListener('click', function () {
          var kode = this.getAttribute('data-del-trx');
          if (window.confirm('Hapus transaksi ' + kode + ' dari sistem?')) {
            var list = getTransactions().filter(function (item) {
              return item.kode !== kode;
            });
            saveTransactions(list);
            renderTransaksiTable();
            showToast('Transaksi ' + kode + ' telah dihapus.');
          }
        });
      }
    }

    renderTransaksiTable();
    if (searchInput) searchInput.addEventListener('input', renderTransaksiTable);
    if (filterSelect) filterSelect.addEventListener('change', renderTransaksiTable);

    // Logika Modal Tambah Transaksi (+transaksi.html)
    var modalOverlay = document.querySelector('.modal-overlay');
    if (!modalOverlay) return;

    var form = modalOverlay.querySelector('form');
    var inputs = modalOverlay.querySelectorAll('input');
    var selects = modalOverlay.querySelectorAll('select');
    var modalSub = modalOverlay.querySelector('.modal-header p');

    // Isi daftar layanan dan pegawai dari state
    var services = getServices();
    var employees = getEmployees();

    if (selects.length >= 1 && services.length > 0) {
      var svcHtml = '';
      for (var sc = 0; sc < services.length; sc++) {
        svcHtml +=
          '<option value="' + services[sc].nama + '">' + services[sc].nama + ' (' + formatRupiah(services[sc].harga) + '/kg)</option>';
      }
      selects[0].innerHTML = svcHtml;
    }

    if (selects.length >= 3 && employees.length > 0) {
      var empHtml = '';
      for (var em = 0; em < employees.length; em++) {
        if (employees[em].status === 'Aktif') {
          empHtml += '<option value="' + employees[em].nama + '">' + employees[em].nama + '</option>';
        }
      }
      if (empHtml) selects[2].innerHTML = empHtml;
    }

    function getServicePrice(name) {
      for (var i = 0; i < services.length; i++) {
        if (services[i].nama.toLowerCase() === String(name).toLowerCase()) {
          return Number(services[i].harga) || 9000;
        }
      }
      if (String(name).indexOf('Setrika Saja') !== -1) return 7000;
      return 12000;
    }

    function updateEstimatedTotal() {
      var mainSvc = selects[0] ? selects[0].value : 'Cuci Kering';
      var mainWeight = inputs[2] ? Number(inputs[2].value) || 0 : 0;
      var optSvc = selects[1] ? selects[1].value : 'Tidak ada';
      var optWeight = inputs[3] ? Number(inputs[3].value) || 0 : 0;

      var total = mainWeight * getServicePrice(mainSvc);
      if (optSvc !== 'Tidak ada' && optWeight > 0) {
        total += optWeight * getServicePrice(optSvc);
      }

      if (modalSub) {
        modalSub.textContent =
          total > 0
            ? 'Estimasi Total Tagihan: ' + formatRupiah(total)
            : 'Catat cucian masuk dari pelanggan.';
      }
      return total;
    }

    for (var idx = 0; idx < inputs.length; idx++) {
      inputs[idx].addEventListener('input', updateEstimatedTotal);
    }
    for (var sIdx = 0; sIdx < selects.length; sIdx++) {
      selects[sIdx].addEventListener('change', updateEstimatedTotal);
    }

    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) window.location.href = 'transaksi.html';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') window.location.href = 'transaksi.html';
    });

    if (form) {
      form.removeAttribute('onsubmit');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var namaPelanggan = inputs[0] ? inputs[0].value.trim() : '';
        var telPelanggan = inputs[1] ? inputs[1].value.trim() : '';
        var mainSvc = selects[0] ? selects[0].value : 'Cuci Kering';
        var mainWeight = inputs[2] ? Number(inputs[2].value) || 0 : 0;
        var optSvc = selects[1] ? selects[1].value : 'Tidak ada';
        var optWeight = inputs[3] ? Number(inputs[3].value) || 0 : 0;
        var staffName = selects[2] ? selects[2].value : 'Farhan Akbar';

        if (!namaPelanggan || !telPelanggan || mainWeight <= 0) {
          showToast('Lengkapi nama, telepon, dan berat cucian.', 'error');
          return;
        }

        var totalWeight = mainWeight + (optSvc !== 'Tidak ada' ? optWeight : 0);
        var totalCost = updateEstimatedTotal();
        var detailCount = optSvc !== 'Tidak ada' && optWeight > 0 ? '2 detail layanan' : '1 detail layanan';

        var list = getTransactions();
        var maxNum = 240621;
        for (var i = 0; i < list.length; i++) {
          var numPart = parseInt(String(list[i].kode).replace(/\D/g, ''), 10);
          if (!isNaN(numPart) && numPart > maxNum) maxNum = numPart;
        }
        var newKode = 'TRX-' + (maxNum + 1);

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        var now = new Date();
        var tglStr = now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();

        list.unshift({
          kode: newKode,
          tanggal: tglStr,
          pelanggan: namaPelanggan,
          telepon: telPelanggan,
          layanan: mainSvc,
          detailLayanan: detailCount,
          berat: formatBerat(totalWeight),
          beratNum: totalWeight,
          total: formatRupiah(totalCost),
          totalNum: totalCost,
          status: 'Diproses',
          pembayaran: 'Belum Lunas',
          pegawai: staffName
        });
        saveTransactions(list);

        // Tambah hitungan pesanan pada layanan terkait
        var svcList = getServices();
        for (var s = 0; s < svcList.length; s++) {
          if (svcList[s].nama === mainSvc) {
            svcList[s].pesanan = (Number(svcList[s].pesanan) || 0) + 1;
          }
        }
        saveServices(svcList);

        // Perbarui atau tambahkan pelanggan secara otomatis
        var custList = getCustomers();
        var foundCust = false;
        for (var c = 0; c < custList.length; c++) {
          if (custList[c].nama.toLowerCase() === namaPelanggan.toLowerCase()) {
            custList[c].transaksi = (Number(custList[c].transaksi) || 0) + 1;
            foundCust = true;
            break;
          }
        }
        if (!foundCust) {
          var nextCustId = 'PLG-' + String(custList.length + 1).padStart(3, '0');
          custList.push({
            kode: nextCustId,
            nama: namaPelanggan,
            telepon: telPelanggan,
            alamat: 'Bandung',
            bergabung: tglStr,
            transaksi: 1
          });
        }
        saveCustomers(custList);

        window.location.href = 'transaksi.html';
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 7. HALAMAN DATA PELANGGAN (pelanggan.html) & MODAL (+pelanggan.html)
   * -------------------------------------------------------------------------- */
  function initPelangganPage() {
    var topbarTitle = document.querySelector('.topbar-title');
    if (!topbarTitle || topbarTitle.textContent.trim() !== 'Pelanggan') return;

    var tbody = document.querySelector('.data-table tbody');
    var searchInput = document.querySelector('.search-box input');
    var statCards = document.querySelectorAll('.stat-card-v2');
    var countSubtitle = document.querySelector('.card-header-title p');

    function renderCustomersTable() {
      if (!tbody) return;
      var customers = getCustomers();
      var transactions = getTransactions();
      var query = searchInput ? searchInput.value.trim().toLowerCase() : '';

      var repeatCount = 0;
      for (var i = 0; i < customers.length; i++) {
        if ((Number(customers[i].transaksi) || 0) > 1) repeatCount++;
      }

      var totalTransValue = 0;
      for (var t = 0; t < transactions.length; t++) {
        totalTransValue += Number(transactions[t].totalNum) || 0;
      }

      if (statCards.length >= 3) {
        statCards[0].querySelector('.value').textContent = String(customers.length);
        statCards[1].querySelector('.value').textContent = String(repeatCount);
        statCards[2].querySelector('.value').textContent = formatRupiah(totalTransValue);
      }

      var filtered = [];
      for (var j = 0; j < customers.length; j++) {
        var c = customers[j];
        if (
          !query ||
          c.nama.toLowerCase().indexOf(query) !== -1 ||
          c.kode.toLowerCase().indexOf(query) !== -1 ||
          c.telepon.toLowerCase().indexOf(query) !== -1 ||
          c.alamat.toLowerCase().indexOf(query) !== -1
        ) {
          filtered.push(c);
        }
      }

      if (countSubtitle) {
        countSubtitle.textContent = filtered.length + ' pelanggan terdaftar';
      }

      if (filtered.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="6" style="text-align:center; padding:32px; color:#90A1B9;">Tidak ada pelanggan yang sesuai pencarian.</td></tr>';
        return;
      }

      var html = '';
      for (var k = 0; k < filtered.length; k++) {
        var cust = filtered[k];
        html +=
          '<tr>' +
            '<td>' +
              '<div class="cell-title extrabold">' + cust.nama + '</div>' +
              '<div class="cell-sub blue">' + cust.kode + '</div>' +
            '</td>' +
            '<td><span class="cell-service">' + cust.telepon + '</span></td>' +
            '<td style="color: #62748E;">' + cust.alamat + '</td>' +
            '<td style="color: #62748E;">' + cust.bergabung + '</td>' +
            '<td><span class="cell-price">' + cust.transaksi + 'x</span></td>' +
            '<td>' +
              '<div class="table-actions">' +
                '<a href="+pelanggan.html?mode=detail&kode=' + encodeURIComponent(cust.kode) + '" class="btn-detail-link">Detail</a>' +
                '<a href="+pelanggan.html?mode=edit&kode=' + encodeURIComponent(cust.kode) + '" class="icon-action-btn" title="Edit">' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>' +
                    '<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>' +
                  '</svg>' +
                '</a>' +
                '<button type="button" class="icon-action-btn delete" data-del-cust="' + cust.kode + '" title="Hapus">' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
                    '<polyline points="3 6 5 6 21 6"></polyline>' +
                    '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
                  '</svg>' +
                '</button>' +
              '</div>' +
            '</td>' +
          '</tr>';
      }
      tbody.innerHTML = html;

      var delBtns = tbody.querySelectorAll('[data-del-cust]');
      for (var d = 0; d < delBtns.length; d++) {
        delBtns[d].addEventListener('click', function () {
          var kode = this.getAttribute('data-del-cust');
          var list = getCustomers();
          var target = null;
          for (var m = 0; m < list.length; m++) {
            if (list[m].kode === kode) {
              target = list[m];
              break;
            }
          }
          if (!target) return;
          if (window.confirm('Hapus data pelanggan ' + target.nama + ' (' + target.kode + ')?')) {
            var updated = list.filter(function (item) {
              return item.kode !== kode;
            });
            saveCustomers(updated);
            renderCustomersTable();
            showToast('Pelanggan ' + target.nama + ' berhasil dihapus.');
          }
        });
      }
    }

    renderCustomersTable();
    if (searchInput) searchInput.addEventListener('input', renderCustomersTable);

    // Logika Modal +pelanggan.html
    var modalOverlay = document.querySelector('.modal-overlay');
    if (!modalOverlay) return;

    var form = modalOverlay.querySelector('form');
    var inputs = modalOverlay.querySelectorAll('input');
    var alamatArea = modalOverlay.querySelector('textarea');
    var modalTitle = modalOverlay.querySelector('.modal-header h2');
    var modalDesc = modalOverlay.querySelector('.modal-header p');
    var submitBtn = modalOverlay.querySelector('button[type="submit"]');

    var params = new URLSearchParams(window.location.search);
    var mode = params.get('mode') || 'add';
    var editKode = params.get('kode');
    var existingCust = null;

    if (editKode) {
      var list = getCustomers();
      for (var c = 0; c < list.length; c++) {
        if (list[c].kode === editKode) {
          existingCust = list[c];
          break;
        }
      }
    }

    if (existingCust) {
      if (inputs[0]) inputs[0].value = existingCust.nama;
      if (inputs[1]) inputs[1].value = existingCust.telepon;
      if (alamatArea) alamatArea.value = existingCust.alamat;

      if (mode === 'detail') {
        if (modalTitle) modalTitle.textContent = 'Detail Pelanggan · ' + existingCust.kode;
        if (modalDesc) {
          modalDesc.textContent =
            'Bergabung sejak ' +
            existingCust.bergabung +
            ' · Total ' +
            existingCust.transaksi +
            'x transaksi.';
        }
        if (inputs[0]) inputs[0].readOnly = true;
        if (inputs[1]) inputs[1].readOnly = true;
        if (alamatArea) alamatArea.readOnly = true;
        if (submitBtn) submitBtn.textContent = 'Edit Pelanggan';
      } else {
        if (modalTitle) modalTitle.textContent = 'Edit Pelanggan · ' + existingCust.kode;
        if (modalDesc) modalDesc.textContent = 'Perbarui informasi kontak dan alamat pelanggan.';
        if (submitBtn) submitBtn.textContent = 'Simpan Perubahan';
      }
    }

    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) window.location.href = 'pelanggan.html';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') window.location.href = 'pelanggan.html';
    });

    if (form) {
      form.removeAttribute('onsubmit');
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (mode === 'detail' && existingCust) {
          window.location.href =
            '+pelanggan.html?mode=edit&kode=' + encodeURIComponent(existingCust.kode);
          return;
        }

        var namaVal = inputs[0] ? inputs[0].value.trim() : '';
        var telVal = inputs[1] ? inputs[1].value.trim() : '';
        var alamatVal = alamatArea ? alamatArea.value.trim() : '';

        if (!namaVal || !telVal) {
          showToast('Nama lengkap dan nomor telepon wajib diisi.', 'error');
          return;
        }

        var custList = getCustomers();
        if (existingCust) {
          for (var i = 0; i < custList.length; i++) {
            if (custList[i].kode === existingCust.kode) {
              custList[i].nama = namaVal;
              custList[i].telepon = telVal;
              custList[i].alamat = alamatVal || 'Bandung';
              break;
            }
          }
          saveCustomers(custList);
        } else {
          var maxNum = 0;
          for (var j = 0; j < custList.length; j++) {
            var n = parseInt(String(custList[j].kode).replace(/\D/g, ''), 10);
            if (!isNaN(n) && n > maxNum) maxNum = n;
          }
          var nextKode = 'PLG-' + String(maxNum + 1).padStart(3, '0');
          var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
          var now = new Date();
          var tglBergabung =
            String(now.getDate()).padStart(2, '0') +
            ' ' +
            months[now.getMonth()] +
            ' ' +
            now.getFullYear();

          custList.push({
            kode: nextKode,
            nama: namaVal,
            telepon: telVal,
            alamat: alamatVal || 'Bandung',
            bergabung: tglBergabung,
            transaksi: 1
          });
          saveCustomers(custList);
        }

        window.location.href = 'pelanggan.html';
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 8. HALAMAN JENIS LAYANAN (layanan.html) & MODAL (+layanan.html)
   * -------------------------------------------------------------------------- */
  function initLayananPage() {
    var topbarTitle = document.querySelector('.topbar-title');
    if (!topbarTitle || topbarTitle.textContent.trim() !== 'Layanan') return;

    var grid = document.querySelector('.services-grid-4');
    var searchInput = document.querySelector('.service-search input');

    function renderServicesGrid() {
      if (!grid) return;
      var services = getServices();
      var query = searchInput ? searchInput.value.trim().toLowerCase() : '';

      var filtered = [];
      for (var i = 0; i < services.length; i++) {
        var s = services[i];
        if (
          !query ||
          s.nama.toLowerCase().indexOf(query) !== -1 ||
          s.kode.toLowerCase().indexOf(query) !== -1
        ) {
          filtered.push(s);
        }
      }

      if (filtered.length === 0) {
        grid.innerHTML =
          '<div style="grid-column: 1 / -1; text-align:center; padding:32px; color:#90A1B9; background:#FFFFFF; border-radius:16px; border:1.37px solid #E2E8F0;">Tidak ada layanan yang cocok dengan pencarian.</div>';
        return;
      }

      var html = '';
      for (var j = 0; j < filtered.length; j++) {
        var svc = filtered[j];
        html +=
          '<div class="service-card">' +
            '<div class="service-card-top">' +
              '<div class="service-card-icon ' + (svc.color || 'blue') + '">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
                  '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>' +
                '</svg>' +
              '</div>' +
              '<span class="service-code">' + svc.kode + '</span>' +
            '</div>' +
            '<div class="service-name">' + svc.nama + '</div>' +
            '<div class="service-price">' + formatRupiah(svc.harga) + ' <span>/ kg</span></div>' +
            '<div class="service-meta">' +
              '<span class="service-meta-duration">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
                  '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>' +
                  '<line x1="16" y1="2" x2="16" y2="6"></line>' +
                  '<line x1="8" y1="2" x2="8" y2="6"></line>' +
                  '<line x1="3" y1="10" x2="21" y2="10"></line>' +
                '</svg>' +
                svc.durasi +
              '</span>' +
              '<span>' + svc.pesanan + ' pesanan</span>' +
            '</div>' +
            '<div class="service-actions">' +
              '<a href="+layanan.html?mode=edit&kode=' + encodeURIComponent(svc.kode) + '" class="btn-service-edit">' +
                '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                  '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>' +
                  '<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>' +
                '</svg>' +
                'Edit' +
              '</a>' +
              '<button type="button" class="btn-service-delete" data-del-svc="' + svc.kode + '">' +
                '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                  '<polyline points="3 6 5 6 21 6"></polyline>' +
                  '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
                '</svg>' +
                'Hapus' +
              '</button>' +
            '</div>' +
          '</div>';
      }
      grid.innerHTML = html;

      var delBtns = grid.querySelectorAll('[data-del-svc]');
      for (var d = 0; d < delBtns.length; d++) {
        delBtns[d].addEventListener('click', function () {
          var kode = this.getAttribute('data-del-svc');
          var list = getServices();
          var target = null;
          for (var k = 0; k < list.length; k++) {
            if (list[k].kode === kode) {
              target = list[k];
              break;
            }
          }
          if (!target) return;
          if (window.confirm('Hapus layanan ' + target.nama + ' (' + target.kode + ')?')) {
            var updated = list.filter(function (item) {
              return item.kode !== kode;
            });
            saveServices(updated);
            renderServicesGrid();
            showToast('Layanan ' + target.nama + ' berhasil dihapus.');
          }
        });
      }
    }

    renderServicesGrid();
    if (searchInput) searchInput.addEventListener('input', renderServicesGrid);

    // Logika Modal +layanan.html
    var modalOverlay = document.querySelector('.modal-overlay');
    if (!modalOverlay) return;

    var form = modalOverlay.querySelector('form');
    var inputs = modalOverlay.querySelectorAll('input');
    var modalTitle = modalOverlay.querySelector('.modal-header h2');
    var submitBtn = modalOverlay.querySelector('button[type="submit"]');

    var params = new URLSearchParams(window.location.search);
    var editKode = params.get('kode');
    var existingSvc = null;

    if (editKode) {
      var svcList = getServices();
      for (var i = 0; i < svcList.length; i++) {
        if (svcList[i].kode === editKode) {
          existingSvc = svcList[i];
          break;
        }
      }
    }

    if (existingSvc) {
      if (modalTitle) modalTitle.textContent = 'Edit Layanan · ' + existingSvc.kode;
      if (submitBtn) submitBtn.textContent = 'Simpan Perubahan';
      if (inputs[0]) inputs[0].value = existingSvc.nama;
      if (inputs[1]) inputs[1].value = existingSvc.harga;
      if (inputs[2]) {
        var dNum = parseInt(String(existingSvc.durasi).replace(/\D/g, ''), 10);
        inputs[2].value = isNaN(dNum) ? 2 : dNum;
      }
    }

    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) window.location.href = 'layanan.html';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') window.location.href = 'layanan.html';
    });

    if (form) {
      form.removeAttribute('onsubmit');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var namaVal = inputs[0] ? inputs[0].value.trim() : '';
        var hargaVal = inputs[1] ? Number(inputs[1].value) || 0 : 0;
        var hariVal = inputs[2] ? Number(inputs[2].value) || 1 : 1;

        if (!namaVal || hargaVal <= 0) {
          showToast('Lengkapi nama layanan dan harga per kg.', 'error');
          return;
        }

        var list = getServices();
        var colors = ['blue', 'purple', 'orange', 'green'];

        if (existingSvc) {
          for (var j = 0; j < list.length; j++) {
            if (list[j].kode === existingSvc.kode) {
              list[j].nama = namaVal;
              list[j].harga = hargaVal;
              list[j].durasi = hariVal + ' hari';
              break;
            }
          }
          saveServices(list);
        } else {
          var maxNum = 0;
          for (var k = 0; k < list.length; k++) {
            var num = parseInt(String(list[k].kode).replace(/\D/g, ''), 10);
            if (!isNaN(num) && num > maxNum) maxNum = num;
          }
          var nextKode = 'LYN-' + String(maxNum + 1).padStart(2, '0');
          list.push({
            kode: nextKode,
            nama: namaVal,
            harga: hargaVal,
            durasi: hariVal + ' hari',
            pesanan: 0,
            color: colors[list.length % colors.length]
          });
          saveServices(list);
        }

        window.location.href = 'layanan.html';
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 9. HALAMAN MANAJEMEN PEGAWAI (pegawai.html) & MODAL (+pegawai.html)
   * -------------------------------------------------------------------------- */
  function initPegawaiPage() {
    var topbarTitle = document.querySelector('.topbar-title');
    if (!topbarTitle || topbarTitle.textContent.trim() !== 'Pegawai') return;

    var tbody = document.querySelector('.data-table tbody');
    var searchInput = document.querySelector('.search-box input');
    var filterSelect = document.querySelector('.filter-select');
    var statCards = document.querySelectorAll('.stat-card-v2');
    var countSubtitle = document.querySelector('.card-header-title p');

    function renderEmployeesTable() {
      if (!tbody) return;
      var employees = getEmployees();
      var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      var statusFilter = filterSelect ? filterSelect.value : 'semua';

      var activeCount = 0;
      var totalHandled = 0;
      var filtered = [];

      for (var i = 0; i < employees.length; i++) {
        var emp = employees[i];
        if (emp.status === 'Aktif') activeCount++;
        totalHandled += Number(emp.transaksi) || 0;

        var empStatusLower = String(emp.status).toLowerCase();
        var matchStatus = statusFilter === 'semua' || empStatusLower === statusFilter;
        var matchQuery =
          !query ||
          emp.nama.toLowerCase().indexOf(query) !== -1 ||
          emp.kode.toLowerCase().indexOf(query) !== -1 ||
          emp.jabatan.toLowerCase().indexOf(query) !== -1;

        if (matchStatus && matchQuery) {
          filtered.push(emp);
        }
      }

      var inactiveCount = employees.length - activeCount;
      if (statCards.length >= 3) {
        statCards[0].querySelector('.value').textContent = String(employees.length);
        statCards[1].querySelector('.value').textContent = String(activeCount);
        statCards[1].querySelector('.sub').textContent = inactiveCount + ' sedang nonaktif';
        statCards[2].querySelector('.value').textContent = String(totalHandled);
      }

      if (countSubtitle) {
        countSubtitle.textContent = filtered.length + ' dari ' + employees.length + ' pegawai';
      }

      if (filtered.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="6" style="text-align:center; padding:32px; color:#90A1B9;">Tidak ada pegawai yang cocok dengan filter.</td></tr>';
        return;
      }

      var html = '';
      for (var j = 0; j < filtered.length; j++) {
        var e = filtered[j];
        var initials = getInitials(e.nama);
        var pillClass = e.status === 'Aktif' ? 'aktif' : 'nonaktif';
        var shiftText =
          String(e.shift).toLowerCase().indexOf('shift') === 0 ? e.shift : 'Shift ' + e.shift;

        html +=
          '<tr>' +
            '<td>' +
              '<div class="emp-cell">' +
                '<div class="emp-avatar">' + initials + '</div>' +
                '<div>' +
                  '<div class="cell-title extrabold">' + e.nama + '</div>' +
                  '<div class="cell-sub semibold">' + e.kode + '</div>' +
                '</div>' +
              '</div>' +
            '</td>' +
            '<td>' +
              '<div class="inline-icon-text cell-service">' +
                '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#45556C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                  '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>' +
                '</svg>' +
                e.telepon +
              '</div>' +
              '<div class="cell-sub">' + e.alamat + '</div>' +
            '</td>' +
            '<td>' +
              '<div class="cell-title">' + e.jabatan + '</div>' +
              '<div class="cell-sub inline-icon-text">' +
                '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#90A1B9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                  '<circle cx="12" cy="12" r="10"></circle>' +
                  '<polyline points="12 6 12 12 16 14"></polyline>' +
                '</svg>' +
                shiftText +
              '</div>' +
            '</td>' +
            '<td>' +
              '<div class="cell-price">' + e.transaksi + '</div>' +
              '<div class="cell-sub">transaksi bulan ini</div>' +
            '</td>' +
            '<td>' +
              '<span class="status-pill ' + pillClass + '" data-toggle-emp="' + e.kode + '" title="Klik untuk ubah status" style="cursor:pointer;">' +
                '<span class="dot"></span>' +
                e.status +
              '</span>' +
            '</td>' +
            '<td>' +
              '<div class="table-actions">' +
                '<a href="profilepgw.html?kode=' + encodeURIComponent(e.kode) + '" class="btn-detail-link">Detail</a>' +
                '<a href="+pegawai.html?mode=edit&kode=' + encodeURIComponent(e.kode) + '" class="icon-action-btn" title="Edit">' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>' +
                    '<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>' +
                  '</svg>' +
                '</a>' +
                '<button type="button" class="icon-action-btn delete" data-del-emp="' + e.kode + '" title="Hapus">' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
                    '<polyline points="3 6 5 6 21 6"></polyline>' +
                    '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
                  '</svg>' +
                '</button>' +
              '</div>' +
            '</td>' +
          '</tr>';
      }
      tbody.innerHTML = html;

      var statusPills = tbody.querySelectorAll('[data-toggle-emp]');
      for (var s = 0; s < statusPills.length; s++) {
        statusPills[s].addEventListener('click', function () {
          var kode = this.getAttribute('data-toggle-emp');
          var list = getEmployees();
          for (var k = 0; k < list.length; k++) {
            if (list[k].kode === kode) {
              list[k].status = list[k].status === 'Aktif' ? 'Nonaktif' : 'Aktif';
              saveEmployees(list);
              renderEmployeesTable();
              showToast('Status ' + list[k].nama + ' diubah menjadi ' + list[k].status + '.');
              break;
            }
          }
        });
      }

      var delBtns = tbody.querySelectorAll('[data-del-emp]');
      for (var d = 0; d < delBtns.length; d++) {
        delBtns[d].addEventListener('click', function () {
          var kode = this.getAttribute('data-del-emp');
          var list = getEmployees();
          var target = null;
          for (var k = 0; k < list.length; k++) {
            if (list[k].kode === kode) {
              target = list[k];
              break;
            }
          }
          if (!target) return;
          if (window.confirm('Hapus pegawai ' + target.nama + ' (' + target.kode + ')?')) {
            var updated = list.filter(function (item) {
              return item.kode !== kode;
            });
            saveEmployees(updated);
            renderEmployeesTable();
            showToast('Pegawai ' + target.nama + ' telah dihapus.');
          }
        });
      }
    }

    renderEmployeesTable();
    if (searchInput) searchInput.addEventListener('input', renderEmployeesTable);
    if (filterSelect) filterSelect.addEventListener('change', renderEmployeesTable);

    // Logika Modal +pegawai.html
    var modalOverlay = document.querySelector('.modal-overlay');
    if (!modalOverlay) return;

    var form = modalOverlay.querySelector('form');
    var inputs = modalOverlay.querySelectorAll('input');
    var selects = modalOverlay.querySelectorAll('select');
    var alamatArea = modalOverlay.querySelector('textarea');
    var modalTitle = modalOverlay.querySelector('.modal-header h2');
    var submitBtn = modalOverlay.querySelector('button[type="submit"]');

    var params = new URLSearchParams(window.location.search);
    var editKode = params.get('kode');
    var existingEmp = null;

    if (editKode) {
      var empList = getEmployees();
      for (var i = 0; i < empList.length; i++) {
        if (empList[i].kode === editKode) {
          existingEmp = empList[i];
          break;
        }
      }
    }

    if (existingEmp) {
      if (modalTitle) modalTitle.textContent = 'Edit Pegawai · ' + existingEmp.kode;
      if (submitBtn) submitBtn.textContent = 'Simpan Perubahan';
      if (inputs[0]) inputs[0].value = existingEmp.nama;
      if (inputs[1]) inputs[1].value = existingEmp.telepon;
      if (alamatArea) alamatArea.value = existingEmp.alamat;
      if (selects[0]) selects[0].value = existingEmp.jabatan;
      if (selects[1]) selects[1].value = String(existingEmp.shift).replace(/^Shift\s+/i, '');
      if (selects[2]) selects[2].value = existingEmp.status;
    }

    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) window.location.href = 'pegawai.html';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') window.location.href = 'pegawai.html';
    });

    if (form) {
      form.removeAttribute('onsubmit');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var namaVal = inputs[0] ? inputs[0].value.trim() : '';
        var telVal = inputs[1] ? inputs[1].value.trim() : '';
        var alamatVal = alamatArea ? alamatArea.value.trim() : '';
        var jabatanVal = selects[0] ? selects[0].value : 'Operator Laundry';
        var shiftVal = selects[1] ? selects[1].value : 'Pagi';
        var statusVal = selects[2] ? selects[2].value : 'Aktif';

        if (!namaVal || !telVal) {
          showToast('Nama lengkap dan nomor telepon wajib diisi.', 'error');
          return;
        }

        var list = getEmployees();
        if (existingEmp) {
          for (var j = 0; j < list.length; j++) {
            if (list[j].kode === existingEmp.kode) {
              list[j].nama = namaVal;
              list[j].telepon = telVal;
              list[j].alamat = alamatVal || 'Bandung';
              list[j].jabatan = jabatanVal;
              list[j].shift = shiftVal;
              list[j].status = statusVal;
              break;
            }
          }
          saveEmployees(list);
        } else {
          var maxNum = 0;
          for (var k = 0; k < list.length; k++) {
            var n = parseInt(String(list[k].kode).replace(/\D/g, ''), 10);
            if (!isNaN(n) && n > maxNum) maxNum = n;
          }
          var nextKode = 'PGW-' + String(maxNum + 1).padStart(3, '0');
          list.push({
            kode: nextKode,
            nama: namaVal,
            telepon: telVal,
            alamat: alamatVal || 'Bandung',
            jabatan: jabatanVal,
            shift: shiftVal,
            transaksi: 0,
            status: statusVal
          });
          saveEmployees(list);
        }

        window.location.href = 'pegawai.html';
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 10. HALAMAN PROFIL PEGAWAI (profilepgw.html) & KEAMANAN (keamananakun.html)
   * -------------------------------------------------------------------------- */
  function initProfileAndSecurityModal() {
    var profileModal = document.querySelector('.profile-modal');
    if (!profileModal) return;

    var modalOverlay = document.querySelector('.modal-overlay');
    var activeUser = getActiveUser();
    var employees = getEmployees();

    var params = new URLSearchParams(window.location.search);
    var requestedKode = params.get('kode');
    var displayedEmp = activeUser;

    if (requestedKode) {
      for (var i = 0; i < employees.length; i++) {
        if (employees[i].kode === requestedKode) {
          displayedEmp = employees[i];
          break;
        }
      }
    }

    // Update Banner Profil
    var bannerAvatar = profileModal.querySelector('.profile-banner-avatar');
    var bannerName = profileModal.querySelector('.profile-banner-info h2');
    var bannerPill = profileModal.querySelector('.badge-aktif-pill');
    var bannerRoleCode = profileModal.querySelector('.role-code');

    function updateBannerUI(data) {
      if (bannerAvatar) bannerAvatar.textContent = getInitials(data.nama);
      if (bannerName) bannerName.textContent = data.nama;
      if (bannerPill) {
        bannerPill.textContent = String(data.status || 'AKTIF').toUpperCase();
      }
      if (bannerRoleCode) {
        bannerRoleCode.innerHTML =
          (data.jabatan || 'Administrator') + ' &middot; ' + (data.kode || 'PGW-001');
      }
    }

    updateBannerUI(displayedEmp);

    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) window.location.href = 'dashboard.html';
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') window.location.href = 'dashboard.html';
    });

    // Cek apakah di tab Informasi Profil atau Keamanan Akun
    var securityBox = profileModal.querySelector('.security-alert-box');
    var form = profileModal.querySelector('form.profile-modal-content');
    if (!form) return;

    form.removeAttribute('onsubmit');

    if (!securityBox) {
      // Tab Informasi Profil (profilepgw.html)
      var statStrong = form.querySelectorAll('.profile-stat-box strong');
      if (statStrong.length >= 3) {
        statStrong[0].textContent = String(displayedEmp.transaksi || 24);
        statStrong[1].textContent = String(displayedEmp.shift || 'Pagi').replace(/^Shift\s+/i, '');
        statStrong[2].textContent = displayedEmp.masaKerja || '3 tahun';
      }

      var inputs = form.querySelectorAll('input');
      var alamatArea = form.querySelector('textarea');

      if (inputs[0]) inputs[0].value = displayedEmp.nama;
      if (inputs[1]) inputs[1].value = displayedEmp.kode;
      if (inputs[2]) inputs[2].value = displayedEmp.telepon;
      if (inputs[3]) inputs[3].value = displayedEmp.jabatan;
      if (alamatArea) alamatArea.value = displayedEmp.alamat;

      if (inputs[0]) {
        inputs[0].addEventListener('input', function () {
          updateBannerUI({
            nama: inputs[0].value.trim() || displayedEmp.nama,
            status: displayedEmp.status,
            jabatan: displayedEmp.jabatan,
            kode: displayedEmp.kode
          });
        });
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var updatedNama = inputs[0] ? inputs[0].value.trim() : '';
        var updatedTel = inputs[2] ? inputs[2].value.trim() : '';
        var updatedAlamat = alamatArea ? alamatArea.value.trim() : '';

        if (!updatedNama) {
          showToast('Nama lengkap tidak boleh kosong.', 'error');
          return;
        }

        // Simpan ke daftar pegawai
        var empList = getEmployees();
        for (var j = 0; j < empList.length; j++) {
          if (empList[j].kode === displayedEmp.kode) {
            empList[j].nama = updatedNama;
            empList[j].telepon = updatedTel;
            empList[j].alamat = updatedAlamat;
            break;
          }
        }
        saveEmployees(empList);

        // Jika profil milik user yang sedang login, perbarui activeUser juga
        if (displayedEmp.kode === activeUser.kode) {
          activeUser.nama = updatedNama;
          activeUser.telepon = updatedTel;
          activeUser.alamat = updatedAlamat;
          saveActiveUser(activeUser);
          syncGlobalStaffUI();
        }

        showToast('Perubahan profil pegawai berhasil disimpan.');
        setTimeout(function () {
          window.location.href = 'dashboard.html';
        }, 650);
      });
    } else {
      // Tab Keamanan Akun (keamananakun.html)
      var passInputs = form.querySelectorAll('input[type="password"]');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var currentPass = passInputs[0] ? passInputs[0].value : '';
        var newPass = passInputs[1] ? passInputs[1].value : '';
        var confirmPass = passInputs[2] ? passInputs[2].value : '';

        if (!currentPass) {
          showToast('Masukkan kata sandi saat ini.', 'error');
          return;
        }
        if (newPass.length < 8) {
          showToast('Kata sandi baru minimal harus 8 karakter.', 'error');
          return;
        }
        if (newPass !== confirmPass) {
          showToast('Konfirmasi kata sandi baru tidak cocok.', 'error');
          return;
        }

        activeUser.password = newPass;
        saveActiveUser(activeUser);
        showToast('Kata sandi berhasil diperbarui.');
        setTimeout(function () {
          window.location.href = 'profilepgw.html';
        }, 700);
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 11. INISIALISASI SAAT DOM SIAP
   * -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    syncGlobalStaffUI();
    initLoginPage();
    initDashboardPage();
    initTransaksiPage();
    initPelangganPage();
    initLayananPage();
    initPegawaiPage();
    initProfileAndSecurityModal();
  });
})();

