package co.edu.uniquindio.backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import co.edu.uniquindio.backend.dto.CompraRequestDTO;
import co.edu.uniquindio.backend.model.Boleto;
import co.edu.uniquindio.backend.model.Cliente;
import co.edu.uniquindio.backend.model.Compra;
import co.edu.uniquindio.backend.model.Evento;
import co.edu.uniquindio.backend.repository.ClienteRepository;
import co.edu.uniquindio.backend.repository.CompraRepository;
import co.edu.uniquindio.backend.repository.EventoRepository;

@Service
public class CompraService {

    private final ClienteRepository clienteRepository;
    private final EventoRepository eventoRepository;
    private final CompraRepository compraRepository;

    public CompraService(
            ClienteRepository clienteRepository,
            EventoRepository eventoRepository,
            CompraRepository compraRepository
    ) {
        this.clienteRepository = clienteRepository;
        this.eventoRepository = eventoRepository;
        this.compraRepository = compraRepository;
    }

    public Compra comprarBoletos(CompraRequestDTO dto) {

        Cliente cliente = clienteRepository.findById(dto.getIdCliente())
                .orElseThrow(() -> new RuntimeException("El cliente no existe"));

        Evento evento = eventoRepository.findById(dto.getIdEvento())
                .orElseThrow(() -> new RuntimeException("El evento no existe"));

        if (!cliente.getEstado().equalsIgnoreCase("ACTIVO")) {
            throw new RuntimeException("El cliente no está activo");
        }

        if (!evento.getEstadoEvento().equalsIgnoreCase("ACTIVO")) {
            throw new RuntimeException("El evento no está activo");
        }

        if (dto.getCantidadBoletos() <= 0) {
            throw new RuntimeException("La cantidad de boletos debe ser mayor a cero");
        }

        if (evento.getBoletosDisponibles() < dto.getCantidadBoletos()) {
            throw new RuntimeException("No hay boletos suficientes disponibles");
        }

        Compra compra = new Compra();
        compra.setCliente(cliente);
        compra.setFechaCompra(LocalDate.now());
        compra.setMetodoPago(dto.getMetodoPago());
        compra.setEstadoCompra("CONFIRMADA");

        double total = dto.getCantidadBoletos() * dto.getPrecioUnitario();
        compra.setTotal(total);

        List<Boleto> boletos = new ArrayList<>();

        for (int i = 0; i < dto.getCantidadBoletos(); i++) {
            Boleto boleto = new Boleto();
            boleto.setTipo(dto.getTipoBoleto());
            boleto.setPrecio(dto.getPrecioUnitario());
            boleto.setEstadoBoleto("VENDIDO");
            boleto.setFechaCompra(LocalDate.now());
            boleto.setEvento(evento);
            boleto.setCompra(compra);

            boletos.add(boleto);
        }

        compra.setBoletos(boletos);

        evento.setBoletosDisponibles(evento.getBoletosDisponibles() - dto.getCantidadBoletos());
        eventoRepository.save(evento);

        return compraRepository.save(compra);
    }
}
