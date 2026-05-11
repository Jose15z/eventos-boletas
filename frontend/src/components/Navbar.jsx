import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-title">Eventos y Boletas</span>
      <Link to="/">Comprar boleto</Link>
      <Link to="/eventos">CRUD Eventos</Link>
      <Link to="/clientes">CRUD Clientes</Link>
    </nav>
  );
}

export default Navbar;