const cursor = document.querySelector('.cursor');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

//rainbow cursor
window.addEventListener("load", (event) => {
  new cursoreffects.fairyDustCursor({
      colors: ["#ff0000", "#00ff00", "#0000ff", "#000000", "#000000", "#000000"],
      fairySymbol: "★",
  });
});

