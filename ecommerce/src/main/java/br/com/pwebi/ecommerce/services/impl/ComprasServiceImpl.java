package br.com.pwebi.ecommerce.services.impl;

import br.com.pwebi.ecommerce.models.entities.ComprasViewEntity;
import br.com.pwebi.ecommerce.models.repositories.ComprasViewRepository;
import br.com.pwebi.ecommerce.services.interfaces.IComprasService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComprasServiceImpl implements IComprasService {

    private final ComprasViewRepository viewRepository;

    public ComprasServiceImpl(ComprasViewRepository viewRepository) {
        this.viewRepository = viewRepository;
    }

    @Override
    public List<ComprasViewEntity> findAll(Specification<ComprasViewEntity> specification) {
        return viewRepository.findAll(specification);
    }
}
