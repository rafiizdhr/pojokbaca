document.addEventListener("DOMContentLoaded", function () {
    const teamMembers = [
        {
            name: "Ardi Setyiawan",
            position: "Informatika",
            imgSrc: "images/ardi.jpg",
        },
        {
            name: "Bintang Arya Nugraha",
            position: "Ilmu Pemerintahan",
            imgSrc: "images/bintang.jpg",
        },
        {
            name: "Devi Khuan Aurellia",
            position: "Akuntansi",
            imgSrc: "images/uan.jpg",
        },
        {
            name: "Enji Dwi Putri",
            position: "Farmasi",
            imgSrc: "images/enji.jpg",
        },
        {
            name: "Hermansyah",
            position: "Akuntansi",
            imgSrc: "images/herman.jpg",
        },
        {
            name: "Muhammad Arief Wicaksana",
            position: "Ilmu Pemerintahan",
            imgSrc: "images/arif.jpg",
        },
        {
            name: "Muhammad Haikal Saharuddin",
            position: "Farmasi",
            imgSrc: "images/haikal.jpg",
        },
        {
            name: "Putri Herli Wijaya",
            position: "Kehutanan",
            imgSrc: "images/uty.jpg",
        },
        {
            name: "Rafi Izdihaar",
            position: "Informatika",
            imgSrc: "images/rafi.jpg",
        },
        {
            name: "Saidul Bahri",
            position: "Ilmu Pemerintahan",
            imgSrc: "images/saidul.jpg",
        },
        {
            name: "Salsabila Maharani Amelia",
            position: "Statistika",
            imgSrc: "images/sabil.jpg",
        },
        {
            name: "Sumarni Ratuloli",
            position: "Ekonomi Syariah",
            imgSrc: "images/arni.jpg",
        }
    ];

    const teamRow = document.getElementById("teamRow");

    teamMembers.forEach(member => {
        const memberBox = document.createElement("div");
        memberBox.classList.add("col-lg-3", "col-sm-6");

        memberBox.innerHTML = `
        <div class="box">
          <div class="img-box">
            <img src="${member.imgSrc}" class="img1" alt="">
          </div>
          <div class="detail-box">
            <h5>${member.name}</h5>
            <p>${member.position}</p>
          </div>
        </div>
      `;

        teamRow.appendChild(memberBox);
    });
});
