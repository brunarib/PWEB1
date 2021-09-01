CREATE OR REPLACE VIEW public.vw_compras
AS SELECT row_number() OVER () AS id,
    c.compra_id,
    c.cliente_id,
    u.usuario_id,
    u.nome,
    p.produto_id,
    p.descricao,
    pc.quantidade_produto,
    pc.valor_total_produto,
    c.valor_total,
    c.compra_efetuada,
    c.status
   FROM compra c
     LEFT JOIN produto_compra pc ON pc.compra_id = c.compra_id
     LEFT JOIN produto p ON p.produto_id = pc.produto_id
     LEFT JOIN cliente cl ON cl.cliente_id = c.cliente_id
     LEFT JOIN usuarios u ON u.usuario_id = cl.usuario_id;