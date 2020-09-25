package com.raioliver.contatos.controllers;

import com.raioliver.contatos.model.Contato;
import com.raioliver.contatos.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api")
@CrossOrigin("*")
public class ContatoController {

    @Autowired
    private ContatoRepository repository;

    @PostMapping
    public Contato salvar(@RequestBody Contato contato){
        return repository.save(contato);
    }

    @GetMapping("pessoas")
    public List<Contato> getPeople(){
        return this.repository.findAll();
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id){
        repository.deleteById(id);
    }

    @PutMapping("pessoas/{id}")
    public void atualizar(@PathVariable Integer id, @RequestBody Contato contatoAtualizada) {
        repository
                .findById(id)
                .map(pessoa -> {
                    pessoa.setNome(contatoAtualizada.getNome());
                    pessoa.setCpf(contatoAtualizada.getCpf());
                    pessoa.setCidade(contatoAtualizada.getCidade());
                    pessoa.setEstado(contatoAtualizada.getEstado());
                    pessoa.setEstadoCivil(contatoAtualizada.getEstadoCivil());
                    pessoa.setIdade(contatoAtualizada.getIdade());
                    return repository.save(contatoAtualizada);
                })
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Contato não encontrado"));

    }
}
