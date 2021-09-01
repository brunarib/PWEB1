package br.com.pwebi.ecommerce.models.dtos;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("ComprasRelatorioFiltrosDTO")
public class ComprasRelatorioFiltrosDTO {


        @ApiParam(value = "Id of the device")
        private final Long compraId;


        @ApiParam(value = "Id of the device")
        private final Long cliente;


        @ApiParam(value = "Id of the device")
        private final Long usuarioId;

        @ApiParam(value = "Id of the device")
        private final String nomeUsuario;

        @ApiParam(value = "Id of the device")
        private final Long produtoId;

        @ApiParam(value = "Status of the device")
        private final String status;

        @ApiParam(value = "Date and time of creation device")
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        private final LocalDateTime inicioPeriodo;

        @ApiParam(value = "Date and time of the last update")
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        private final LocalDateTime fimPeriodo;



        public ComprasRelatorioFiltrosDTO( Long compraId,
                                                    Long cliente,
                                                    Long usuarioId,
                                                    String nomeUsuario,
                                                    Long produtoId,
                                                    LocalDateTime inicioPeriodo,
                                                    LocalDateTime fimPeriodo,
                                                    String status) {

            this.compraId = compraId;
            this.cliente = cliente;
            this.usuarioId = usuarioId;
            this.nomeUsuario = nomeUsuario;
            this.produtoId = produtoId;
            this.inicioPeriodo = inicioPeriodo;
            this.fimPeriodo = fimPeriodo;
            this.status = status;

        }


}
