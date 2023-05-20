import React from "react";

function Footer() {
  const current = new Date();
  const year = current.getFullYear();

  return (
    <footer>
      <p>&copy; {year}</p>;
    </footer>
  );
}
export default Footer;
