export const icons = {
    
    function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, " ").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon])
  }