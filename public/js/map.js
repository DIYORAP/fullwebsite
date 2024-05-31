mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  center: coordinates,
  zoom: 9,
});
console.log(coordinates);

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML("<p> Exact location will be provided after booking</P>")
      .setMaxWidth("300px")
  )
  .addTo(map);
