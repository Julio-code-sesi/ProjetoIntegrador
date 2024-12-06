package com.api.viagem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.viagem.model.ViagemModel;

public interface ViagemRepository extends JpaRepository<ViagemModel, Long> {

}
