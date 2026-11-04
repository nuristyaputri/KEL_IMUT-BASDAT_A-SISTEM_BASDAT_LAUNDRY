(function () {
  'use strict';

  var STORAGE_KEYS = {
    PROFILE: 'bersihin_pemilik_profile',
    TRANSACTIONS: 'bersihin_pemilik_transactions',
    EMPLOYEES: 'bersihin_pemilik_employees',
    SERVICES: 'bersihin_pemilik_services'
  };

  var DEFAULT_PROFILE = {
    kode: 'PML-001',
    nama: 'Raka Wijaya',
    role: 'Pemilik Laundry',
    telepon: '0812 7788 9900',
    email: 'raka@bersihin.id',
    alamat: 'Jl. Melati No. 12, Bandung'
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
      pembayaran: 'Belum Lunas'
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
      pembayaran: 'Lunas'
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
      pembayaran: 'Lunas'
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
      pembayaran: 'Belum Lunas'
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
      pembayaran: 'Lunas'
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
      pembayaran: 'Lunas'
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

  /* --------------------------------------------------------------------------
   * 2. HELPER FUNCTIONS & STORAGE API
   * -------------------------------------------------------------------------- */
  function getProfile() {
    try {
      var raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    saveProfile(DEFAULT_PROFILE);
    return DEFAULT_PROFILE;
  }

  function saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
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

  function getInitials(name) {
    if (!name) return 'RW';
    var parts = String(name).trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  function getFirstName(name) {
    if (!name) return 'Raka';
    return String(name).trim().split(/\s+/)[0];
  }

  function formatRupiah(num) {
    var n = Math.round(Number(num) || 0);
    return 'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function statusSlug(status) {
    var s = String(status || '').toLowerCase();
    if (s.indexOf('selesai') !== -1) return 'selesai';
    if (s.indexOf('diambil') !== -1) return 'diambil';
    return 'diproses';
  }

  function showToast(message, type) {
    var existing = document.getElementById('bersihin-owner-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'bersihin-owner-toast';
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
   * 3. SINKRONISASI TOPBAR & PROFIL GLOBAL
   * -------------------------------------------------------------------------- */
  function syncGlobalOwnerUI() {
    var profile = getProfile();
    var initials = getInitials(profile.nama);

    var userNames = document.querySelectorAll('.topbar .user-name');
    for (var i = 0; i < userNames.length; i++) {
      userNames[i].textContent = profile.nama;
    }

    var userRoles = document.querySelectorAll('.topbar .user-role');
    for (var j = 0; j < userRoles.length; j++) {
      userRoles[j].textContent = profile.role || 'Pemilik Laundry';
    }

    var userAvatars = document.querySelectorAll('.topbar .user-avatar');
    for (var k = 0; k < userAvatars.length; k++) {
      userAvatars[k].textContent = initials;
    }
  }

  /* --------------------------------------------------------------------------
   * 4. HALAMAN LOGIN PEMILIK (login.html)
   * -------------------------------------------------------------------------- */
  function initLoginPage() {
    var loginForm = document.querySelector('.login-form');
    if (!loginForm) return;

    var profile = getProfile();
    var kodeInput = document.getElementById('kode_pemilik');
    var passInput = document.getElementById('password');
    var forgotLink = document.querySelector('.forgot-link');

    if (kodeInput && profile.kode) {
      kodeInput.value = profile.kode;
    }

    loginForm.removeAttribute('onsubmit');
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var kode = kodeInput ? kodeInput.value.trim().toUpperCase() : '';
      var pass = passInput ? passInput.value.trim() : '';

      if (!kode) {
        showToast('Masukkan kode pemilik (contoh: PML-001).', 'error');
        if (kodeInput) kodeInput.focus();
        return;
      }

      if (!pass) {
        showToast('Masukkan kata sandi pemilik.', 'error');
        if (passInput) passInput.focus();
        return;
      }

      profile.kode = kode;
      saveProfile(profile);
      window.location.href = 'dashboard.html';
    });

    if (forgotLink) {
      forgotLink.addEventListener('click', function (e) {
        e.preventDefault();
        showToast('Silakan gunakan kode pemilik PML-001 atau ubah data di menu Profil Pemilik.');
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 5. HALAMAN DASHBOARD PEMILIK (dashboard.html)
   * -------------------------------------------------------------------------- */
  function initDashboardPage() {
    var ownerStats = document.querySelectorAll('.stat-card-owner');
    var recentFeed = document.querySelector('.recent-feed-list');
    if (ownerStats.length === 0 && !recentFeed) return;

    var profile = getProfile();
    var transactions = getTransactions();
    var employees = getEmployees();

    // Sapaan header
    var greetingH1 = document.querySelector('.page-header-text h1');
    if (greetingH1) {
      greetingH1.textContent = 'Selamat pagi, Pak ' + getFirstName(profile.nama);
    }

    // Hitung statistik
    var pendapatanLunas = 0;
    var piutangBelum = 0;
    var countBelum = 0;
    var countDiproses = 0;
    var countSelesai = 0;
    var countDiambil = 0;

    for (var i = 0; i < transactions.length; i++) {
      var t = transactions[i];
      if (t.pembayaran === 'Lunas') {
        pendapatanLunas += Number(t.totalNum) || 0;
      } else {
        piutangBelum += Number(t.totalNum) || 0;
        countBelum++;
      }

      var slug = statusSlug(t.status);
      if (slug === 'diproses') countDiproses++;
      else if (slug === 'selesai') countSelesai++;
      else if (slug === 'diambil') countDiambil++;
    }

    var activeEmpCount = 0;
    for (var e = 0; e < employees.length; e++) {
      if (employees[e].status === 'Aktif') activeEmpCount++;
    }

    // Update 4 Stat Cards
    if (ownerStats.length >= 4) {
      ownerStats[0].querySelector('.value').textContent = formatRupiah(pendapatanLunas);
      ownerStats[1].querySelector('.value').textContent = String(transactions.length);
      ownerStats[1].querySelector('.sub').textContent = countDiproses + ' sedang diproses';
      ownerStats[2].querySelector('.value').textContent = formatRupiah(piutangBelum);
      ownerStats[2].querySelector('.sub').textContent = countBelum + ' pembayaran tertunda';
      ownerStats[3].querySelector('.value').textContent = String(activeEmpCount);
      ownerStats[3].querySelector('.sub').textContent = 'Dari ' + employees.length + ' pegawai';
    }

    // Update Tren Pendapatan
    var monthAmount = document.querySelector('.month-amount');
    var growthPill = document.querySelector('.revenue-growth-pill');
    var prevMonthAmount = 178500;
    if (monthAmount) {
      monthAmount.textContent = formatRupiah(pendapatanLunas);
    }
    if (growthPill) {
      var diffPct = ((pendapatanLunas - prevMonthAmount) / prevMonthAmount) * 100;
      var sign = diffPct >= 0 ? '+' : '';
      growthPill.textContent = sign + diffPct.toFixed(1).replace('.', ',') + '%';
    }

    // Update Status Transaksi Mini Grid
    var miniBoxes = document.querySelectorAll('.status-mini-box strong');
    if (miniBoxes.length >= 3) {
      miniBoxes[0].textContent = String(countDiproses);
      miniBoxes[1].textContent = String(countSelesai);
      miniBoxes[2].textContent = String(countDiambil);
    }
    var statusTotalStrong = document.querySelector('.status-total-bar strong');
    if (statusTotalStrong) {
      statusTotalStrong.textContent = String(transactions.length);
    }

    // Render Transaksi Terbaru (4 teratas)
    if (recentFeed) {
      var maxItems = Math.min(4, transactions.length);
      var html = '';
      for (var r = 0; r < maxItems; r++) {
        var tr = transactions[r];
        var badgeClass = tr.pembayaran === 'Lunas' ? 'lunas' : 'belum';
        html +=
          '<div class="recent-feed-item" style="cursor:pointer;" data-trx="' + tr.kode + '">' +
            '<div class="recent-feed-left">' +
              '<div class="code">' + tr.kode + '</div>' +
              '<div class="meta">' + tr.pelanggan + ' &middot; ' + tr.layanan + '</div>' +
            '</div>' +
            '<div class="recent-feed-right">' +
              '<span class="price">' + tr.total + '</span>' +
              '<span class="pay-badge ' + badgeClass + '">' + tr.pembayaran + '</span>' +
            '</div>' +
          '</div>';
      }
      recentFeed.innerHTML = html;

      var items = recentFeed.querySelectorAll('.recent-feed-item');
      for (var m = 0; m < items.length; m++) {
        items[m].addEventListener('click', function () {
          var code = this.getAttribute('data-trx');
          window.location.href = 'pembayaran.html?trx=' + encodeURIComponent(code);
        });
      }
    }
  }

  /* --------------------------------------------------------------------------
   * 6. HALAMAN PENGAWASAN TRANSAKSI (transaksi.html)
   * -------------------------------------------------------------------------- */
  function initTransaksiPage() {
    var topbarTitle = document.querySelector('.topbar-title');
    if (!topbarTitle || topbarTitle.textContent.trim() !== 'Transaksi') return;

    var tbody = document.querySelector('.data-table tbody');
    var searchInput = document.querySelector('.search-box input');
    var filterSelect = document.querySelector('.filter-select');
    if (!tbody) return;

    function renderTable() {
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
          t.telepon.toLowerCase().indexOf(query) !== -1 ||
          t.layanan.toLowerCase().indexOf(query) !== -1;

        if (matchStatus && matchQuery) {
          filtered.push(t);
        }
      }

      if (filtered.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="7" style="text-align:center; padding:32px; color:#90A1B9;">Tidak ada transaksi yang sesuai dengan filter pencarian.</td></tr>';
        return;
      }

      var html = '';
      for (var j = 0; j < filtered.length; j++) {
        var row = filtered[j];
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
              '<span class="status-pill ' + sSlug + '" data-kode="' + row.kode + '" title="Klik untuk ubah status pengerjaan" style="cursor:pointer;">' +
                '<span class="dot"></span>' +
                row.status +
              '</span>' +
            '</td>' +
            '<td>' +
              '<a href="pembayaran.html?trx=' + encodeURIComponent(row.kode) + '" class="icon-action-btn" title="Lihat Pembayaran">' +
                '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                  '<polyline points="9 18 15 12 9 6"></polyline>' +
                '</svg>' +
              '</a>' +
            '</td>' +
          '</tr>';
      }
      tbody.innerHTML = html;

      // Klik pada status-pill untuk siklus status pengerjaan (Diproses -> Selesai -> Diambil)
      var pills = tbody.querySelectorAll('.status-pill');
      for (var p = 0; p < pills.length; p++) {
        pills[p].addEventListener('click', function () {
          var kode = this.getAttribute('data-kode');
          var list = getTransactions();
          var orderCycle = ['Diproses', 'Selesai', 'Diambil'];
          for (var k = 0; k < list.length; k++) {
            if (list[k].kode === kode) {
              var idx = orderCycle.indexOf(list[k].status);
              var nextStatus = orderCycle[(idx + 1) % orderCycle.length];
              list[k].status = nextStatus;
              saveTransactions(list);
              renderTable();
              showToast('Status ' + kode + ' diubah menjadi ' + nextStatus + '.');
              break;
            }
          }
        });
      }
    }

    renderTable();

    if (searchInput) {
      searchInput.addEventListener('input', renderTable);
    }
    if (filterSelect) {
      filterSelect.addEventListener('change', renderTable);
    }
  }

  /* --------------------------------------------------------------------------
   * 7. HALAMAN PEMERIKSAAN PEMBAYARAN (pembayaran.html)
   * -------------------------------------------------------------------------- */
  function initPembayaranPage() {
    var topbarTitle = document.querySelector('.topbar-title');
    if (!topbarTitle || topbarTitle.textContent.trim() !== 'Pembayaran') return;

    var tbody = document.querySelector('.data-table tbody');
    var filterSelect = document.querySelector('.filter-select');
    var subtitleCount = document.querySelector('.card-header-title p');
    var amountGreen = document.querySelector('.stat-card-payment .amount.green');
    var amountAmber = document.querySelector('.stat-card-payment .amount.amber');
    var amountBlue = document.querySelector('.stat-card-payment .amount.blue');

    if (!tbody) return;

    var params = new URLSearchParams(window.location.search);
    var highlightTrx = params.get('trx');

    function renderPaymentPage() {
      var transactions = getTransactions();
      var filterVal = filterSelect ? filterSelect.value : 'semua';

      var lunasSum = 0;
      var belumSum = 0;
      var filtered = [];

      for (var i = 0; i < transactions.length; i++) {
        var t = transactions[i];
        if (t.pembayaran === 'Lunas') {
          lunasSum += Number(t.totalNum) || 0;
        } else {
          belumSum += Number(t.totalNum) || 0;
        }

        var isLunas = t.pembayaran === 'Lunas';
        if (
          filterVal === 'semua' ||
          (filterVal === 'lunas' && isLunas) ||
          (filterVal === 'belum' && !isLunas)
        ) {
          filtered.push(t);
        }
      }

      var totalSum = lunasSum + belumSum;
      if (amountGreen) amountGreen.textContent = formatRupiah(lunasSum);
      if (amountAmber) amountAmber.textContent = formatRupiah(belumSum);
      if (amountBlue) amountBlue.textContent = formatRupiah(totalSum);

      if (subtitleCount) {
        subtitleCount.textContent = filtered.length + ' transaksi ditampilkan';
      }

      var html = '';
      for (var j = 0; j < filtered.length; j++) {
        var row = filtered[j];
        var isPaid = row.pembayaran === 'Lunas';
        var badgeClass = isPaid ? 'lunas' : 'belum';
        var btnClass = isPaid ? 'cancel-paid' : 'mark-paid';
        var btnText = isPaid ? 'Batalkan' : 'Tandai Lunas';
        var rowStyle =
          highlightTrx && row.kode === highlightTrx ? ' style="background:#EFF6FF;"' : '';

        html +=
          '<tr' + rowStyle + '>' +
            '<td><div class="trx-code dark-blue">' + row.kode + '</div></td>' +
            '<td>' +
              '<div class="cell-title">' + row.pelanggan + '</div>' +
              '<div class="cell-sub">' + row.telepon + '</div>' +
            '</td>' +
            '<td><span class="cell-date">' + row.tanggal + '</span></td>' +
            '<td><span class="cell-price">' + row.total + '</span></td>' +
            '<td><span class="pay-badge ' + badgeClass + '">' + row.pembayaran + '</span></td>' +
            '<td class="text-right">' +
              '<button type="button" class="btn-confirm-pay ' + btnClass + '" data-kode="' + row.kode + '">' +
                btnText +
              '</button>' +
            '</td>' +
          '</tr>';
      }
      tbody.innerHTML = html;

      var buttons = tbody.querySelectorAll('.btn-confirm-pay');
      for (var b = 0; b < buttons.length; b++) {
        buttons[b].addEventListener('click', function () {
          var kode = this.getAttribute('data-kode');
          var list = getTransactions();
          for (var k = 0; k < list.length; k++) {
            if (list[k].kode === kode) {
              var nowPaid = list[k].pembayaran !== 'Lunas';
              list[k].pembayaran = nowPaid ? 'Lunas' : 'Belum Lunas';
              saveTransactions(list);
              renderPaymentPage();
              showToast(
                nowPaid
                  ? 'Pembayaran ' + kode + ' berhasil ditandai Lunas.'
                  : 'Status lunas ' + kode + ' dibatalkan.'
              );
              break;
            }
          }
        });
      }
    }

    renderPaymentPage();

    if (filterSelect) {
      filterSelect.addEventListener('change', renderPaymentPage);
    }
  }

  /* --------------------------------------------------------------------------
   * 8. HALAMAN MANAJEMEN PEGAWAI (dtpegawai.html) & MODAL (+pegawai.html)
   * -------------------------------------------------------------------------- */
  function initPegawaiPage() {
    var topbarTitle = document.querySelector('.topbar-title');
    if (!topbarTitle || topbarTitle.textContent.trim() !== 'Pegawai') return;

    var tbody = document.querySelector('.data-table tbody');
    var searchInput = document.querySelector('.search-box input');
    var filterSelect = document.querySelector('.filter-select');
    var countSubtitle = document.querySelector('.card-header-title p');
    var statCards = document.querySelectorAll('.stat-card-v2');

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
          '<tr><td colspan="6" style="text-align:center; padding:32px; color:#90A1B9;">Tidak ada data pegawai yang cocok.</td></tr>';
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
                '<span>' + e.telepon + '</span>' +
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
                '<span>' + shiftText + '</span>' +
              '</div>' +
            '</td>' +
            '<td>' +
              '<div class="cell-price">' + e.transaksi + '</div>' +
              '<div class="cell-sub">transaksi bulan ini</div>' +
            '</td>' +
            '<td>' +
              '<span class="status-pill ' + pillClass + '" data-toggle-kode="' + e.kode + '" title="Klik untuk ubah status" style="cursor:pointer;">' +
                '<span class="dot"></span>' +
                e.status +
              '</span>' +
            '</td>' +
            '<td>' +
              '<div class="table-actions">' +
                '<a href="+pegawai.html?mode=detail&kode=' + encodeURIComponent(e.kode) + '" class="btn-detail-link">Detail</a>' +
                '<a href="+pegawai.html?mode=edit&kode=' + encodeURIComponent(e.kode) + '" class="icon-action-btn" title="Edit">' +
                  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>' +
                    '<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>' +
                  '</svg>' +
                '</a>' +
                '<button type="button" class="icon-action-btn delete" data-del-kode="' + e.kode + '" title="Hapus">' +
                  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
                    '<polyline points="3 6 5 6 21 6"></polyline>' +
                    '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
                  '</svg>' +
                '</button>' +
              '</div>' +
            '</td>' +
          '</tr>';
      }

      tbody.innerHTML = html;

      // Toggle status aktif/nonaktif
      var statusPills = tbody.querySelectorAll('[data-toggle-kode]');
      for (var s = 0; s < statusPills.length; s++) {
        statusPills[s].addEventListener('click', function () {
          var kode = this.getAttribute('data-toggle-kode');
          var list = getEmployees();
          for (var k = 0; k < list.length; k++) {
            if (list[k].kode === kode) {
              list[k].status = list[k].status === 'Aktif' ? 'Nonaktif' : 'Aktif';
              saveEmployees(list);
              renderEmployeesTable();
              showToast('Status pegawai ' + list[k].nama + ' diubah menjadi ' + list[k].status + '.');
              break;
            }
          }
        });
      }

      // Tombol Hapus Pegawai
      var delBtns = tbody.querySelectorAll('[data-del-kode]');
      for (var d = 0; d < delBtns.length; d++) {
        delBtns[d].addEventListener('click', function () {
          var kode = this.getAttribute('data-del-kode');
          var list = getEmployees();
          var targetEmp = null;
          for (var k = 0; k < list.length; k++) {
            if (list[k].kode === kode) {
              targetEmp = list[k];
              break;
            }
          }
          if (!targetEmp) return;
          if (window.confirm('Hapus pegawai ' + targetEmp.nama + ' (' + targetEmp.kode + ')?')) {
            var updated = list.filter(function (item) {
              return item.kode !== kode;
            });
            saveEmployees(updated);
            renderEmployeesTable();
            showToast('Pegawai ' + targetEmp.nama + ' telah dihapus.');
          }
        });
      }
    }

    renderEmployeesTable();

    if (searchInput) searchInput.addEventListener('input', renderEmployeesTable);
    if (filterSelect) filterSelect.addEventListener('change', renderEmployeesTable);

    // Logika Modal di +pegawai.html
    var modalOverlay = document.querySelector('.modal-overlay');
    var namaInput = document.getElementById('nama_pegawai');
    if (!modalOverlay || !namaInput) return;

    var jabatanSelect = document.getElementById('jabatan');
    var teleponInput = document.getElementById('telepon');
    var alamatInput = document.getElementById('alamat');
    var shiftSelect = document.getElementById('shift');
    var statusSelect = document.getElementById('status_pegawai');
    var modalTitle = modalOverlay.querySelector('.modal-header h2');
    var modalDesc = modalOverlay.querySelector('.modal-header p');
    var modalForm = modalOverlay.querySelector('form');
    var submitBtn = modalOverlay.querySelector('button[type="submit"]');

    var params = new URLSearchParams(window.location.search);
    var mode = params.get('mode') || 'add';
    var editKode = params.get('kode');
    var existingEmp = null;

    if (editKode) {
      var empList = getEmployees();
      for (var m = 0; m < empList.length; m++) {
        if (empList[m].kode === editKode) {
          existingEmp = empList[m];
          break;
        }
      }
    }

    if (existingEmp) {
      namaInput.value = existingEmp.nama;
      if (jabatanSelect) jabatanSelect.value = existingEmp.jabatan;
      if (teleponInput) teleponInput.value = existingEmp.telepon;
      if (alamatInput) alamatInput.value = existingEmp.alamat;
      if (shiftSelect) {
        shiftSelect.value = String(existingEmp.shift).replace(/^Shift\s+/i, '');
      }
      if (statusSelect) statusSelect.value = existingEmp.status;

      if (mode === 'detail') {
        if (modalTitle) modalTitle.textContent = 'Detail Pegawai · ' + existingEmp.kode;
        if (modalDesc) {
          modalDesc.textContent =
            'Performa bulan ini: ' + existingEmp.transaksi + ' transaksi ditangani.';
        }
        namaInput.readOnly = true;
        if (jabatanSelect) jabatanSelect.disabled = true;
        if (teleponInput) teleponInput.readOnly = true;
        if (alamatInput) alamatInput.readOnly = true;
        if (shiftSelect) shiftSelect.disabled = true;
        if (statusSelect) statusSelect.disabled = true;
        if (submitBtn) submitBtn.textContent = 'Edit Data Pegawai';
      } else {
        if (modalTitle) modalTitle.textContent = 'Edit Pegawai · ' + existingEmp.kode;
        if (modalDesc) modalDesc.textContent = 'Perbarui informasi dan jadwal kerja pegawai.';
        if (submitBtn) submitBtn.textContent = 'Simpan Perubahan';
      }
    }

    // Klik backdrop atau Escape untuk menutup modal
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        window.location.href = 'dtpegawai.html';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        window.location.href = 'dtpegawai.html';
      }
    });

    if (modalForm) {
      modalForm.removeAttribute('onsubmit');
      modalForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (mode === 'detail' && existingEmp) {
          window.location.href =
            '+pegawai.html?mode=edit&kode=' + encodeURIComponent(existingEmp.kode);
          return;
        }

        var nama = namaInput.value.trim();
        var tel = teleponInput ? teleponInput.value.trim() : '';
        var alamat = alamatInput ? alamatInput.value.trim() : '';
        var jabatan = jabatanSelect ? jabatanSelect.value : 'Operator Laundry';
        var shift = shiftSelect ? shiftSelect.value : 'Pagi';
        var status = statusSelect ? statusSelect.value : 'Aktif';

        if (!nama || !tel) {
          showToast('Nama lengkap dan nomor telepon wajib diisi.', 'error');
          return;
        }

        var list = getEmployees();
        if (existingEmp) {
          for (var i = 0; i < list.length; i++) {
            if (list[i].kode === existingEmp.kode) {
              list[i].nama = nama;
              list[i].telepon = tel;
              list[i].alamat = alamat || 'Bandung';
              list[i].jabatan = jabatan;
              list[i].shift = shift;
              list[i].status = status;
              break;
            }
          }
          saveEmployees(list);
        } else {
          var maxNum = 0;
          for (var j = 0; j < list.length; j++) {
            var numPart = parseInt(String(list[j].kode).replace(/\D/g, ''), 10);
            if (!isNaN(numPart) && numPart > maxNum) maxNum = numPart;
          }
          var nextKode = 'PGW-' + String(maxNum + 1).padStart(3, '0');
          list.push({
            kode: nextKode,
            nama: nama,
            telepon: tel,
            alamat: alamat || 'Bandung',
            jabatan: jabatan,
            shift: shift,
            transaksi: 0,
            status: status
          });
          saveEmployees(list);
        }

        window.location.href = 'dtpegawai.html';
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 9. HALAMAN JENIS LAYANAN (layanan.html)
   * -------------------------------------------------------------------------- */
  function initLayananPage() {
    var topbarTitle = document.querySelector('.topbar-title');
    if (!topbarTitle || topbarTitle.textContent.trim() !== 'Layanan') return;

    var grid = document.querySelector('.services-grid-4');
    var searchInput = document.querySelector('.service-search input');
    var addBtn = document.querySelector('.page-header .btn-primary');
    if (!grid) return;

    function openServiceModal(existingService) {
      var oldModal = document.getElementById('service-crud-modal');
      if (oldModal) oldModal.remove();

      var isEdit = Boolean(existingService);
      var overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.id = 'service-crud-modal';

      overlay.innerHTML =
        '<div class="modal-card">' +
          '<div class="modal-header">' +
            '<div>' +
              '<h2>' + (isEdit ? 'Edit Layanan · ' + existingService.kode : 'Tambah Layanan Baru') + '</h2>' +
              '<p>Atur nama paket, harga per kilogram, dan estimasi durasi pengerjaan.</p>' +
            '</div>' +
            '<button type="button" class="modal-close-btn" id="close-svc-modal" title="Tutup">' +
              '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<line x1="18" y1="6" x2="6" y2="18"></line>' +
                '<line x1="6" y1="6" x2="18" y2="18"></line>' +
              '</svg>' +
            '</button>' +
          '</div>' +
          '<form class="modal-body" id="service-crud-form">' +
            '<div class="form-group">' +
              '<label class="form-label" for="svc_nama">Nama layanan</label>' +
              '<div class="input-box">' +
                '<input type="text" id="svc_nama" value="' + (isEdit ? existingService.nama : '') + '" placeholder="Contoh: Cuci Sepatu" required>' +
              '</div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group">' +
                '<label class="form-label" for="svc_harga">Harga per kg (Rp)</label>' +
                '<div class="input-box">' +
                  '<input type="number" id="svc_harga" min="1000" step="500" value="' + (isEdit ? existingService.harga : '15000') + '" required>' +
                '</div>' +
              '</div>' +
              '<div class="form-group">' +
                '<label class="form-label" for="svc_durasi">Estimasi pengerjaan</label>' +
                '<div class="input-box">' +
                  '<input type="text" id="svc_durasi" value="' + (isEdit ? existingService.durasi : '2 hari') + '" placeholder="Contoh: 2 hari" required>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
              '<button type="button" class="btn-outline" id="cancel-svc-modal">Batal</button>' +
              '<button type="submit" class="btn-primary">' + (isEdit ? 'Simpan Perubahan' : 'Tambah Layanan') + '</button>' +
            '</div>' +
          '</form>' +
        '</div>';

      document.body.appendChild(overlay);

      function closeModal() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }

      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
      });
      document.getElementById('close-svc-modal').addEventListener('click', closeModal);
      document.getElementById('cancel-svc-modal').addEventListener('click', closeModal);

      document.getElementById('service-crud-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var namaVal = document.getElementById('svc_nama').value.trim();
        var hargaVal = Number(document.getElementById('svc_harga').value) || 0;
        var durasiVal = document.getElementById('svc_durasi').value.trim() || '2 hari';

        if (!namaVal || hargaVal <= 0) {
          showToast('Lengkapi nama dan harga layanan dengan benar.', 'error');
          return;
        }

        var list = getServices();
        var colors = ['blue', 'purple', 'orange', 'green'];

        if (isEdit) {
          for (var i = 0; i < list.length; i++) {
            if (list[i].kode === existingService.kode) {
              list[i].nama = namaVal;
              list[i].harga = hargaVal;
              list[i].durasi = durasiVal;
              break;
            }
          }
          saveServices(list);
          showToast('Layanan ' + namaVal + ' berhasil diperbarui.');
        } else {
          var maxNum = 0;
          for (var j = 0; j < list.length; j++) {
            var num = parseInt(String(list[j].kode).replace(/\D/g, ''), 10);
            if (!isNaN(num) && num > maxNum) maxNum = num;
          }
          var nextKode = 'LYN-' + String(maxNum + 1).padStart(2, '0');
          list.push({
            kode: nextKode,
            nama: namaVal,
            harga: hargaVal,
            durasi: durasiVal,
            pesanan: 0,
            color: colors[list.length % colors.length]
          });
          saveServices(list);
          showToast('Layanan baru ' + namaVal + ' berhasil ditambahkan.');
        }

        closeModal();
        renderServicesGrid();
      });
    }

    function renderServicesGrid() {
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
                '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#62748E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
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
              '<button type="button" class="btn-service-edit" data-edit-kode="' + svc.kode + '">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                  '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>' +
                  '<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>' +
                '</svg>' +
                '<span>Edit</span>' +
              '</button>' +
              '<button type="button" class="btn-service-delete" data-del-kode="' + svc.kode + '">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                  '<polyline points="3 6 5 6 21 6"></polyline>' +
                  '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
                '</svg>' +
                '<span>Hapus</span>' +
              '</button>' +
            '</div>' +
          '</div>';
      }
      grid.innerHTML = html;

      var editBtns = grid.querySelectorAll('[data-edit-kode]');
      for (var e = 0; e < editBtns.length; e++) {
        editBtns[e].addEventListener('click', function () {
          var kode = this.getAttribute('data-edit-kode');
          var list = getServices();
          for (var k = 0; k < list.length; k++) {
            if (list[k].kode === kode) {
              openServiceModal(list[k]);
              break;
            }
          }
        });
      }

      var delBtns = grid.querySelectorAll('[data-del-kode]');
      for (var d = 0; d < delBtns.length; d++) {
        delBtns[d].addEventListener('click', function () {
          var kode = this.getAttribute('data-del-kode');
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
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        openServiceModal(null);
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 10. HALAMAN LAPORAN USAHA (laporan.html & background profile.html)
   * -------------------------------------------------------------------------- */
  function initLaporanPage() {
    var reportCards = document.querySelectorAll('.stat-card-report');
    if (reportCards.length === 0) return;

    var transactions = getTransactions();
    var services = getServices();

    var pendapatanBersih = 0;
    var piutang = 0;
    var countLunas = 0;
    var countDiproses = 0;
    var countSelesai = 0;
    var countDiambil = 0;
    var serviceCounts = {};

    for (var i = 0; i < transactions.length; i++) {
      var t = transactions[i];
      if (t.pembayaran === 'Lunas') {
        pendapatanBersih += Number(t.totalNum) || 0;
        countLunas++;
      } else {
        piutang += Number(t.totalNum) || 0;
      }

      var slug = statusSlug(t.status);
      if (slug === 'diproses') countDiproses++;
      else if (slug === 'selesai') countSelesai++;
      else if (slug === 'diambil') countDiambil++;

      serviceCounts[t.layanan] = (serviceCounts[t.layanan] || 0) + 1;
    }

    if (reportCards.length >= 4) {
      reportCards[0].querySelector('.value').textContent = formatRupiah(pendapatanBersih);
      reportCards[1].querySelector('.value').textContent = formatRupiah(piutang);
      reportCards[2].querySelector('.value').textContent = transactions.length + ' transaksi';
      reportCards[3].querySelector('.value').textContent = countLunas + ' transaksi';
    }

    // Performa Layanan Bars
    var barsContainer = document.querySelector('.report-bars-list');
    if (barsContainer && services.length > 0) {
      var totalTrx = Math.max(1, transactions.length);
      var barsHtml = '';
      for (var s = 0; s < services.length; s++) {
        var svcName = services[s].nama;
        var c = serviceCounts[svcName] || 0;
        var pct = c === 0 ? 8 : Math.round((c / totalTrx) * 1000) / 10;
        barsHtml +=
          '<div class="report-bar-item">' +
            '<div class="top-row">' +
              '<span class="name">' + svcName + '</span>' +
              '<span class="count">' + c + ' transaksi</span>' +
            '</div>' +
            '<div class="report-progress-track">' +
              '<div class="report-progress-fill" style="width: ' + pct + '%;"></div>' +
            '</div>' +
          '</div>';
      }
      barsContainer.innerHTML = barsHtml;
    }

    // Ringkasan Operasional
    var opsVals = document.querySelectorAll('.ops-summary-item .count-val');
    if (opsVals.length >= 3) {
      opsVals[0].textContent = String(countDiproses);
      opsVals[1].textContent = String(countSelesai);
      opsVals[2].textContent = String(countDiambil);
    }
  }

  /* --------------------------------------------------------------------------
   * 11. HALAMAN / MODAL PROFIL PEMILIK (profile.html)
   * -------------------------------------------------------------------------- */
  function initProfileModalPage() {
    var namaInput = document.getElementById('nama_pemilik');
    if (!namaInput) return;

    var profile = getProfile();
    var modalOverlay = document.querySelector('.modal-overlay');
    var teleponInput = document.getElementById('telepon_pemilik');
    var emailInput = document.getElementById('email_pemilik');
    var alamatInput = document.getElementById('alamat_usaha');
    var identityAvatar = document.querySelector('.owner-identity-avatar');
    var identityName = document.querySelector('.owner-identity-info h3');
    var identitySub = document.querySelector('.owner-identity-info p');
    var form = modalOverlay ? modalOverlay.querySelector('form') : null;

    function updateIdentityCard(data) {
      if (identityAvatar) identityAvatar.textContent = getInitials(data.nama);
      if (identityName) identityName.textContent = data.nama;
      if (identitySub) {
        identitySub.innerHTML = (data.kode || 'PML-001') + ' &middot; ' + (data.role || 'Pemilik Laundry');
      }
    }

    namaInput.value = profile.nama;
    if (teleponInput) teleponInput.value = profile.telepon;
    if (emailInput) emailInput.value = profile.email;
    if (alamatInput) alamatInput.value = profile.alamat;
    updateIdentityCard(profile);

    namaInput.addEventListener('input', function () {
      updateIdentityCard({
        nama: namaInput.value.trim() || profile.nama,
        kode: profile.kode,
        role: profile.role
      });
    });

    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
          window.location.href = 'dashboard.html';
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        window.location.href = 'dashboard.html';
      }
    });

    if (form) {
      form.removeAttribute('onsubmit');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var updatedNama = namaInput.value.trim();
        if (!updatedNama) {
          showToast('Nama pemilik tidak boleh kosong.', 'error');
          namaInput.focus();
          return;
        }

        profile.nama = updatedNama;
        profile.telepon = teleponInput ? teleponInput.value.trim() : profile.telepon;
        profile.email = emailInput ? emailInput.value.trim() : profile.email;
        profile.alamat = alamatInput ? alamatInput.value.trim() : profile.alamat;

        saveProfile(profile);
        syncGlobalOwnerUI();
        window.location.href = 'dashboard.html';
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 12. INISIALISASI SAAT DOM SIAP
   * -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    syncGlobalOwnerUI();
    initLoginPage();
    initDashboardPage();
    initTransaksiPage();
    initPembayaranPage();
    initPegawaiPage();
    initLayananPage();
    initLaporanPage();
    initProfileModalPage();
  });
})();

