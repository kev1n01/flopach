var map = L.map('map').setView([-9.8914517, -76.2279689], 16);

const styleDefault = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
styleDefault.addTo(map)

const icon = L.icon({
    iconUrl: 'assets/location-mechanic.png',
    iconSize: [100, 100],
})


var marker = L.marker([-9.8914633, -76.2281737], { icon: icon }).addTo(map);
marker.bindPopup('<h3>MECÁNICA AUTOMOTRIZ FLOPACH</h3>').openPopup();
