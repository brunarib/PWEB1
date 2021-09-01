package br.com.pwebi.ecommerce.models.dtos;

import lombok.Getter;

@Getter
public enum ComprasSortColumn {
    id("id"),
    status("status"),
    createdAt("createdAt"),
    updatedAt("updatedAt"),
    ip("ip"),
    mac("mac"),
    model("model"),
    name("name"),
    health("health"),
    haveWarning("haveWarning");

    private final String columnName;

    ComprasSortColumn(String columnName) {
        this.columnName = columnName;
    }
}
