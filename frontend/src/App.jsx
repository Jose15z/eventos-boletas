import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ComprarBoleto from "./pages/ComprarBoleto";
import EventosCrud from "./pages/EventosCrud";
import ClientesCrud from "./pages/ClientesCrud";

function App() {
  return (
    <BrowserRouter>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f4f6f8;
          color: #222;
        }

        .navbar {
          background: #1f2937;
          padding: 16px 32px;
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .navbar-title {
          color: white;
          font-weight: bold;
          font-size: 20px;
          margin-right: 30px;
        }

        .navbar a {
          color: white;
          text-decoration: none;
          font-weight: 500;
        }

        .navbar a:hover {
          text-decoration: underline;
        }

        .page {
          max-width: 1100px;
          margin: 30px auto;
          padding: 24px;
          background: white;
          border-radius: 14px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
        }

        h1 {
          margin-top: 0;
          color: #111827;
        }

        .form-card {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 28px;
          padding: 20px;
          background: #f9fafb;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        label {
          font-weight: bold;
          font-size: 14px;
        }

        input, select {
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 15px;
        }

        button {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          background: #2563eb;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        button:hover {
          background: #1d4ed8;
        }

        .btn-danger {
          background: #dc2626;
        }

        .btn-danger:hover {
          background: #b91c1c;
        }

        .btn-secondary {
          background: #6b7280;
        }

        .btn-secondary:hover {
          background: #4b5563;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .full-width {
          grid-column: 1 / 3;
        }

        .message {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-weight: bold;
        }

        .success {
          background: #dcfce7;
          color: #166534;
        }

        .error {
          background: #fee2e2;
          color: #991b1b;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          text-align: left;
        }

        th {
          background: #f3f4f6;
        }

        .empty {
          text-align: center;
          padding: 30px;
          color: #6b7280;
        }

        @media (max-width: 768px) {
          .form-card {
            grid-template-columns: 1fr;
          }

          .full-width {
            grid-column: 1;
          }

          .navbar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <Navbar />

      <Routes>
        <Route path="/" element={<ComprarBoleto />} />
        <Route path="/eventos" element={<EventosCrud />} />
        <Route path="/clientes" element={<ClientesCrud />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;