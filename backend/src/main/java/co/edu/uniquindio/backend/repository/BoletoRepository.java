package co.edu.uniquindio.backend.repository;

import co.edu.uniquindio.backend.model.Boleto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoletoRepository extends JpaRepository<Boleto, Long> {
}