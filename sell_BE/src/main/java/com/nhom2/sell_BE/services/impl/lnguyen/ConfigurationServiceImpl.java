package com.nhom2.sell_BE.services.impl.lnguyen;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nhom2.sell_BE.entities.Configuration;
import com.nhom2.sell_BE.repositories.ConfigurationRepository;
import com.nhom2.sell_BE.services.lnguyen.ConfigServive;

import java.util.List;

@Service
public class ConfigurationServiceImpl implements ConfigServive {

    private final ConfigurationRepository configurationRepository;

    @Autowired
    public ConfigurationServiceImpl(ConfigurationRepository configurationRepository) {
        this.configurationRepository = configurationRepository;
    }

    @Override
    public List<Configuration> getConfig() {
        return configurationRepository.findAll();
    }
}
