package co.edu.uniquindio.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEvento;

    private String nombre;
    private LocalDate fecha;
    private String lugar;
    private Integer capacidad;
    private Integer boletosDisponibles;
    private String estadoEvento;

    @OneToMany(mappedBy = "evento")
    private List<Boleto> boletos;

    public Evento() {
    }

    public Evento(String nombre, LocalDate fecha, String lugar, Integer capacidad, Integer boletosDisponibles, String estadoEvento) {
        this.nombre = nombre;
        this.fecha = fecha;
        this.lugar = lugar;
        this.capacidad = capacidad;
        this.boletosDisponibles = boletosDisponibles;
        this.estadoEvento = estadoEvento;
    }

    public Long getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(Long idEvento) {
        this.idEvento = idEvento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getLugar() {
        return lugar;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public Integer getBoletosDisponibles() {
        return boletosDisponibles;
    }

    public void setBoletosDisponibles(Integer boletosDisponibles) {
        this.boletosDisponibles = boletosDisponibles;
    }

    public String getEstadoEvento() {
        return estadoEvento;
    }

    public void setEstadoEvento(String estadoEvento) {
        this.estadoEvento = estadoEvento;
    }
}