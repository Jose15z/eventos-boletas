package co.edu.uniquindio.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.uniquindio.backend.dto.CompraRequestDTO;
import co.edu.uniquindio.backend.model.Compra;
import co.edu.uniquindio.backend.service.CompraService;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://eventos-boletas.vercel.app"
})
public class CompraController {

    private final CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }

    @PostMapping
    public Compra comprarBoletos(@RequestBody CompraRequestDTO dto) {
        return compraService.comprarBoletos(dto);
    }
}