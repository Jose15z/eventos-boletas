package co.edu.uniquindio.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Boleto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBoleto;

    private String tipo;
    private Double precio;
    private String estadoBoleto;
    private LocalDate fechaCompra;

    @ManyToOne
    @JoinColumn(name = "id_evento")
    private Evento evento;

    @ManyToOne
    @JoinColumn(name = "id_compra")
    private Compra compra;

    public Boleto() {
    }

    public Boleto(String tipo, Double precio, String estadoBoleto, LocalDate fechaCompra, Evento evento, Compra compra) {
        this.tipo = tipo;
        this.precio = precio;
        this.estadoBoleto = estadoBoleto;
        this.fechaCompra = fechaCompra;
        this.evento = evento;
        this.compra = compra;
    }

    public Long getIdBoleto() {
        return idBoleto;
    }

    public void setIdBoleto(Long idBoleto) {
        this.idBoleto = idBoleto;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getEstadoBoleto() {
        return estadoBoleto;
    }

    public void setEstadoBoleto(String estadoBoleto) {
        this.estadoBoleto = estadoBoleto;
    }

    public LocalDate getFechaCompra() {
        return fechaCompra;
    }

    public void setFechaCompra(LocalDate fechaCompra) {
        this.fechaCompra = fechaCompra;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Compra getCompra() {
        return compra;
    }

    public void setCompra(Compra compra) {
        this.compra = compra;
    }
}