CREATE OR REPLACE FUNCTION verificar_estoque_livro()
RETURNS TRIGGER AS $$
DECLARE
    estoque_atual INTEGER;
BEGIN
    SELECT quantidade_disponivel
    INTO estoque_atual
    FROM livros
    WHERE id = NEW.livro_id
    FOR UPDATE;

    IF estoque_atual IS NULL THEN
        RAISE EXCEPTION 'Livro não encontrado';
    END IF;

    IF estoque_atual <= 0 THEN
        RAISE EXCEPTION 'Livro sem estoque disponível';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION baixar_estoque_livro()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE livros
    SET quantidade_disponivel = quantidade_disponivel - 1
    WHERE id = NEW.livro_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION processar_devolucao()
RETURNS TRIGGER AS $$
BEGIN
    -- Impede devolução dupla
    IF OLD.status <> 'ATIVO' AND NEW.status = 'DEVOLVIDO' THEN
        RAISE EXCEPTION 'Empréstimo já foi finalizado';
    END IF;

    -- Se está devolvendo agora, aumenta estoque
    IF OLD.status = 'ATIVO' AND NEW.status = 'DEVOLVIDO' THEN
        UPDATE livros
        SET quantidade_disponivel = quantidade_disponivel + 1
        WHERE id = OLD.livro_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
