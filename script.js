function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        showMap(lat, lon, "GPS orqali aniqlandi");
      },
      (error) => {
        console.warn("GPS ishlamadi, IP orqali davom etamiz.");
        getIpLocation(); // fallback to IP
      }
    );
  } else {
    console.warn("GPS mavjud emas, IP orqali davom etamiz.");
    getIpLocation(); // fallback
  }
}

async function getIpLocation() {
  try {
    const response = await fetch("https://ipinfo.io/json?token=30b737d2cb46e5");
    const data = await response.json();

    if (data.loc) {
      const [lat, lon] = data.loc.split(",");
      const html = `
        <p><strong>IP Manzil:</strong> ${data.ip}</p>
        <p><strong>Mamlakat:</strong> ${data.country}</p>
        <p><strong>Shahar:</strong> ${data.city}</p>
        <p><strong>Provayder:</strong> ${data.org}</p>
      `;
      showMap(lat, lon, "IP orqali aniqlandi", html);
    } else {
      alert("IP orqali joylashuvni aniqlab bo‘lmadi.");
    }
  } catch (err) {
    console.error("IP orqali joylashuvda xatolik:", err);
    alert("Hech qanday joylashuv aniqlanmadi.");
  }
}

function showMap(lat, lon, sourceText, extraInfo = "") {
  document.getElementById("infoBox").innerHTML = `
    ${extraInfo}
    <p><strong>Kenglik:</strong> ${lat}</p>
    <p><strong>Uzunlik:</strong> ${lon}</p>
    <p><em>${sourceText}</em></p>
  `;

  document.getElementById("mapContainer").innerHTML = `
    <iframe
      src="https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  `;
}