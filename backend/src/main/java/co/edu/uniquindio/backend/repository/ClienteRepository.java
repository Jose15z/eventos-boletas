package co.edu.uniquindio.backend.repository;


import co.edu.uniquindio.backend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}