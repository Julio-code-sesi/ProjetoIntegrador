package com.api.viagem.model;

import com.api.viagem.dto.ViagemDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="User")
public class ViagemModel {
	

	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Id
		
	@Column(nullable = false) 
	private Long Id;
	
	@Column(nullable = false)
	private String Nome;
	
	@Column(nullable = false)
	private String Telefone;
	
	@Column(nullable = false)
	private String CPF;
	
	@Column(nullable = false)
	private String Email;
	
	@Column(nullable = false)
	private String Origem;
	
	@Column(nullable = false)
	private String Destino;
	
	@Column(nullable = false)
	private int Numero_voo;
	
	@Column(name = "imgURL")
	private String imgURL; //URL da img

	public ViagemModel() {
	
	}
	
	
	public ViagemModel(ViagemDTO dto) {
		this.Nome = dto.Nome();
		this.Telefone = dto.Telefone();
		this.CPF = dto.CPF();
		this.Email = dto.Email();
		this.Origem = dto.Origem();
		this.Destino = dto.Destino();
		this.Numero_voo = dto.Numero_voo();
		this.imgURL = dto.imgURL();
	}
	
	

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getNome() {
		return Nome;
	}

	public void setNome(String nome) {
		Nome = nome;
	}

	public String getTelefone() {
		return Telefone;
	}

	public void setTelefone(String telefone) {
		Telefone = telefone;
	}

	public String getCPF() {
		return CPF;
	}

	public void setCPF(String cPF) {
		CPF = cPF;
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public String getOrigem() {
		return Origem;
	}

	public void setOrigem(String origem) {
		Origem = origem;
	}

	public String getDestino() {
		return Destino;
	}

	public void setDestino(String destino) {
		Destino = destino;
	}

	public int getNumero_voo() {
		return Numero_voo;
	}

	public void setNumero_voo(int numero_voo) {
		Numero_voo = numero_voo;
	}

	public String getImgURL() {
		return imgURL;
	}

	public void setImgURL(String imgURL) {
		this.imgURL = imgURL;
	}
	
}

	


