package co.edu.uniquindio.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.uniquindio.backend.model.Evento;
import co.edu.uniquindio.backend.repository.EventoRepository;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:5173")
public class EventoController {

    private final EventoRepository eventoRepository;

    public EventoController(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    @GetMapping
    public List<Evento> listar() {
        return eventoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Evento obtenerPorId(@PathVariable Long id) {
        return eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
    }

    @PostMapping
    public Evento crear(@RequestBody Evento evento) {
        return eventoRepository.save(evento);
    }

    @PutMapping("/{id}")
    public Evento actualizar(@PathVariable Long id, @RequestBody Evento datos) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        evento.setNombre(datos.getNombre());
        evento.setFecha(datos.getFecha());
        evento.setLugar(datos.getLugar());
        evento.setCapacidad(datos.getCapacidad());
        evento.setBoletosDisponibles(datos.getBoletosDisponibles());
        evento.setEstadoEvento(datos.getEstadoEvento());

        return eventoRepository.save(evento);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        eventoRepository.deleteById(id);
    }
}