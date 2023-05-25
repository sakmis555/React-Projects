import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>ⓒ Saksham Mishra {year}</p>
    </footer>
  );
}

export default Footer;
