// ================= DATA SIMULASI =================
const dataPengguna = [
  { id:1, nama:"Rina Wulandari", email:"rina@ut.ac.id", password:"rina123", role:"UPBJJ-UT", lokasi:"UPBJJ Jakarta" },
  { id:2, nama:"Agus Pranoto", email:"agus@ut.ac.id", password:"agus123", role:"UPBJJ-UT", lokasi:"UPBJJ Makassar" },
  { id:3, nama:"Siti Marlina", email:"siti@ut.ac.id", password:"siti123", role:"Puslaba", lokasi:"Pusat" },
  { id:4, nama:"Doni Setiawan", email:"doni@ut.ac.id", password:"doni123", role:"Fakultas", lokasi:"FISIP" },
  { id:5, nama:"Admin SITTA", email:"admin@ut.ac.id", password:"admin123", role:"Administrator", lokasi:"Pusat" }
];

const dataTracking = {
  "2023001234": {
    nomorDO:"2023001234", nama:"Rina Wulandari", status:"Dalam Perjalanan", ekspedisi:"JNE", tanggalKirim:"2025-08-25",
    paket:"0JKT01", total:"Rp 180.000",
    perjalanan:[
      { waktu:"2025-08-25 10:12:20", keterangan:"Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka" },
      { waktu:"2025-08-25 14:07:56", keterangan:"Tiba di Hub: TANGERANG SELATAN" },
      { waktu:"2025-08-25 16:12:20", keterangan:"Diteruskan ke Kantor Jakarta Selatan" }
    ]
  },
  "2023005678": {
    nomorDO:"2023005678", nama:"Agus Pranoto", status:"Dikirim", ekspedisi:"Pos Indonesia", tanggalKirim:"2025-08-25",
    paket:"0UPBJJBDG", total:"Rp 220.000",
    perjalanan:[
      { waktu:"2025-08-25 10:12:20", keterangan:"Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka" },
      { waktu:"2025-08-25 14:07:56", keterangan:"Tiba di Hub: TANGERANG SELATAN" },
      { waktu:"2025-08-25 16:30:10", keterangan:"Diteruskan ke Kantor Kota Bandung" },
      { waktu:"2025-08-26 12:15:33", keterangan:"Tiba di Hub: Kota BANDUNG" },
      { waktu:"2025-08-26 15:06:12", keterangan:"Proses antar ke Cimahi" },
      { waktu:"2025-08-26 20:00:00", keterangan:"Selesai Antar. Penerima: Agus Pranoto" }
    ]
  }
};

var dataBahanAjar = [
  { kodeLokasi: "0TMP01", kodeBarang: "ASIP4301", namaBarang: "Pengantar Ilmu Komunikasi", jenisBarang: "BMP",
    edisi: "2", stok: 548, cover: "assets/pengantar_komunikasi.jpg"},
  { kodeLokasi: "0JKT01", kodeBarang: "EKMA4216", namaBarang: "Manajemen Keuangan", jenisBarang: "BMP",
    edisi: "3", stok: 392, cover: "assets/manajemen_keuangan.jpg"},
  { kodeLokasi: "0SBY02", kodeBarang: "EKMA4310", namaBarang: "Kepemimpinan", jenisBarang: "BMP",
    edisi: "1", stok: 278, cover: "assets/kepemimpinan.jpg"},
  { kodeLokasi: "0MLG01", kodeBarang: "BIOL4211", namaBarang: "Mikrobiologi Dasar", jenisBarang: "BMP",
    edisi: "2", stok: 165, cover: "assets/mikrobiologi.jpg"},
  { kodeLokasi: "0UPBJJBDG", kodeBarang: "PAUD4401", namaBarang: "Perkembangan Anak Usia Dini", jenisBarang: "BMP",
    edisi: "4", stok: 204, cover: "assets/paud_perkembangan.jpg"}
];

// ========== TOGGLE PASSWORD ==========
function togglePasswordVisibility(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(`eye-icon-${fieldId}`);

    if (!passwordInput || !eyeIcon) return; // safety

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.setAttribute('d','M21.25,12a9.25,9.25,0,0,1-18.5,0V12H2.75a9.25,9.25,0,0,0,18.5,0ZM12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm0-8c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3Z');
    } else {
        passwordInput.type = 'password';
        eyeIcon.setAttribute('d','M12 4.5C7 4.5 2.73 7.61 0 12c2.73 4.39 7 7.5 12 7.5s9.27-3.11 12-7.5c-2.73-4.39-7-7.5-12-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5,5-5 5 2.24,5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3,3 3 3-1.34,3-3-1.34-3-3-3z');
    }
}

document.addEventListener("DOMContentLoaded", () => {

  // ===== DASHBOARD SEARCH =====
  const searchForm = document.getElementById("searchForm");
  if(searchForm){
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("searchInput").value.trim();
      if(input) {
        window.location.href = `tracking.html?do=${encodeURIComponent(input)}`;
      } else {
        alert("Masukkan nomor DO terlebih dahulu!");
      }
    });
  }

  // ===== TRACKING PAGE =====
  const hasil = document.getElementById("hasil");
  if(hasil){
    const urlParams = new URLSearchParams(window.location.search);
    const doNumber = urlParams.get("do");

    if(doNumber && dataTracking[doNumber]){
      const d = dataTracking[doNumber];
      const perjalananHTML = d.perjalanan.map(p => `<p>📦 ${p.waktu} — ${p.keterangan}</p>`).join("");
      hasil.innerHTML = `
        <h3>${d.nama}</h3>
        <p><strong>Status:</strong> ${d.status}</p>
        <p><strong>Ekspedisi:</strong> ${d.ekspedisi}</p>
        <p><strong>Tanggal Kirim:</strong> ${d.tanggalKirim}</p>
        <p><strong>Jenis Paket:</strong> ${d.paket}</p>
        <p><strong>Total Pembayaran:</strong> ${d.total}</p>
        <div class="perjalanan">
          <strong>Riwayat Perjalanan:</strong>
          ${perjalananHTML}
        </div>
      `;
    } else if(doNumber){
      hasil.innerHTML = `<p style="color:red; font-weight:600; text-align:center;">Nomor DO tidak ditemukan.</p>`;
    }
  }

  // ===== LOGIN =====
  const loginForm = document.getElementById("loginForm");
  if(loginForm){
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const password = document.getElementById("password").value.trim();
      const rememberMe = document.getElementById("rememberMe").checked;

      const user = dataPengguna.find(u =>
        (u.nama.toLowerCase() === name.toLowerCase() || u.email.toLowerCase() === name.toLowerCase()) &&
        u.password === password
      );

      if(user){
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("userLogin", JSON.stringify(user));
        window.location.href = "dashboard.html";
      } else {
        alert("Password salah atau akun tidak ditemukan!");
        document.getElementById("password").value = "";
        document.getElementById("password").focus();
      }
    });

    // Auto login
    const userStored = JSON.parse(localStorage.getItem("userLogin"));
    if(userStored) window.location.href = "dashboard.html";
  }

  // ===== DASHBOARD USER & LOGOUT =====
  const dashboardElement = document.querySelector(".dashboard");
  if(dashboardElement){
    const user =
      JSON.parse(localStorage.getItem("userLogin")) ||
      JSON.parse(sessionStorage.getItem("userLogin"));
    if(!user) { window.location.href="index.html"; return; }

    const greetingElement = document.getElementById("greeting");
    if(greetingElement){
      const now = new Date();
      const hour = now.getHours();
      let greeting = hour < 12 ? "Selamat pagi" :
                     hour < 15 ? "Selamat siang" :
                     hour < 18 ? "Selamat sore" :
                     "Selamat malam";
      greetingElement.textContent = `${greeting}, ${user.nama}!`;
    }

    const logoutBtn = document.getElementById("logout-btn");
    if(logoutBtn){
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("userLogin");
        sessionStorage.removeItem("userLogin");
        alert("Anda berhasil keluar!");
        window.location.href = "index.html";
      });
    }
  }

  // ===== DROPDOWN NAVBAR =====
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function(e){
      e.preventDefault();
      const parent = this.parentElement;
      document.querySelectorAll(".dropdown").forEach(drop => {
        if(drop !== parent) drop.classList.remove("active");
      });
      parent.classList.toggle("active");
    });
  });

  document.addEventListener("click", (e)=>{
    if(!e.target.closest(".dropdown")){
      document.querySelectorAll(".dropdown").forEach(drop => drop.classList.remove("active"));
    }
  });

});

// === BAHAN AJAR ===
document.getElementById("searchBa").addEventListener("submit", function(e) {
  e.preventDefault();

  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const hasilDiv = document.getElementById("hasil");

  if (input === "") {
    hasilDiv.innerHTML = "<p>Silakan masukkan nama bahan ajar yang ingin dicari.</p>";
    return;
  }

  const hasil = dataBahanAjar.find(item => 
    item.namaBarang.toLowerCase().includes(input) ||
    item.kodeBarang.toLowerCase().includes(input)
  );

  if (!hasil) {
    hasilDiv.innerHTML = `<p style="color:red;">Data tidak ditemukan untuk: "${input}"</p>`;
    return;
  }

  hasilDiv.innerHTML = `
    <div class="bahan-ajar-container">
      <img src="${hasil.cover}" alt="${hasil.namaBarang}">
      <h2>${hasil.namaBarang}</h2>
      <div class="info-item">
        <label>Kode Lokasi</label>
        <span>${hasil.kodeLokasi}</span>
      </div>
      <div class="info-item">
        <label>Kode Barang</label>
        <span>${hasil.kodeBarang}</span>
      </div>
      <div class="info-item">
        <label>Nama Barang</label>
        <span>${hasil.namaBarang}</span>
      </div>
      <div class="info-item">
        <label>Jenis Barang</label>
        <span>${hasil.jenisBarang}</span>
      </div>
      <div class="info-item">
        <label>Edisi</label>
        <span>${hasil.edisi}</span>
      </div>
      <div class="info-item">
        <label>Stok</label>
        <span>${hasil.stok}</span>
      </div>
    </div>
  `;
});

// === Menampilkan Koleksi Buku ===
function tampilkanKoleksi() {
  const koleksiContainer = document.getElementById('koleksiBuku');
  koleksiContainer.innerHTML = '';

  dataBahanAjar.forEach((bahan, index) => {
    const card = document.createElement('article');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${bahan.cover}" alt="${bahan.namaBarang}" class="cover" />
      <h3>${bahan.namaBarang}</h3>
      <div class="action">
        <button class="btn" onclick="tampilkanDetail(${index})">Detail</button>
      </div>
    `;

    koleksiContainer.appendChild(card);
  });
}

// === Menampilkan Detail Buku ===
function tampilkanDetail(index) {
  const bahan = dataBahanAjar[index];
  const hasilDiv = document.getElementById('hasil');

  hasilDiv.innerHTML = `
    <div class="bahan-ajar-container">
      <img src="${bahan.cover}" alt="${bahan.namaBarang}">
      <h2>${bahan.namaBarang}</h2>
      <div class="info-item"><label>Kode Lokasi:</label><span>${bahan.kodeLokasi}</span></div>
      <div class="info-item"><label>Kode Barang:</label><span>${bahan.kodeBarang}</span></div>
      <div class="info-item"><label>Jenis Barang:</label><span>${bahan.jenisBarang}</span></div>
      <div class="info-item"><label>Edisi:</label><span>${bahan.edisi}</span></div>
      <div class="info-item"><label>Stok:</label><span>${bahan.stok}</span></div>
    </div>
  `;
}

// === Jalankan otomatis saat halaman dibuka ===
document.addEventListener('DOMContentLoaded', tampilkanKoleksi);