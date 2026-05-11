package co.edu.uniquindio.backend.repository;


import co.edu.uniquindio.backend.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Long> {
}