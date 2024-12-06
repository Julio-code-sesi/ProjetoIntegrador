package com.api.viagem.controller;

import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.api.viagem.dto.ViagemDTO;
import com.api.viagem.model.ViagemModel;
import com.api.viagem.repository.ViagemRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class ViagemController {

    @Autowired
    private ViagemRepository repo;

    @GetMapping
    public ResponseEntity<?> getAll() {
        var viagem = repo.findAll();
        if (viagem.isEmpty()) {
            return ResponseEntity.status(204).body(Map.of("message", "Nenhuma viagem encontrada."));
        }
        return ResponseEntity.ok(viagem);
    }

    @GetMapping("/{Id}")
    public ResponseEntity<?> getById(@PathVariable Long Id) {
        Optional<ViagemModel> viagem = repo.findById(Id);
        if (viagem.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Viagem não encontrada para o ID fornecido: " + Id));
        }
        return ResponseEntity.ok(viagem.get());
    }

    @PostMapping("/new")
    public ResponseEntity<?> newViagem(@RequestBody @Valid ViagemDTO data) {
        try {
            ViagemModel newViagem = new ViagemModel(data);
            repo.save(newViagem);
            return ResponseEntity.status(201).body(Map.of("message", "Viagem criada com sucesso."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Erro ao criar viagem: " + e.getMessage()));
        }
    }

    @PutMapping("/{Id}")
    public ResponseEntity<?> updateViagem(@PathVariable Long Id, @RequestBody @Valid ViagemDTO dto) {
        Optional<ViagemModel> exists = repo.findById(Id);
        if (exists.isPresent()) {
            ViagemModel update = exists.get();
            update.setNome(dto.Nome());  // Supondo que o DTO tenha getters
            update.setTelefone(dto.Telefone());
            update.setCPF(dto.CPF());
            update.setEmail(dto.Email());
            update.setOrigem(dto.Origem());
            update.setDestino(dto.Destino());
            update.setNumero_voo(dto.Numero_voo());
            update.setImgURL(dto.imgURL());
            try {
                repo.save(update);
                return ResponseEntity.ok(Map.of("message", "Viagem atualizada com sucesso.", "id", Id.toString()));
            } catch (Exception e) {
                return ResponseEntity.status(500).body(Map.of("error", "Erro ao atualizar viagem: " + e.getMessage()));
            }
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "Viagem não encontrada para o ID fornecido: " + Id));
        }
    }

    @DeleteMapping("/dell/{Id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long Id) {
        Optional<ViagemModel> exists = repo.findById(Id);
        if (exists.isPresent()) {
            try {
                repo.deleteById(Id);
                return ResponseEntity.ok(Map.of("message", "Viagem deletada com sucesso."));
            } catch (Exception e) {
                return ResponseEntity.status(500).body(Map.of("error", "Erro ao deletar viagem: " + e.getMessage()));
            }
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "Viagem não encontrada para o ID fornecido: " + Id));
        }
    }
}
