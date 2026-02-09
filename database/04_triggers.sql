CREATE TRIGGER trg_verificar_estoque
BEFORE INSERT ON emprestimos
FOR EACH ROW
EXECUTE FUNCTION verificar_estoque_livro();

CREATE TRIGGER trg_baixar_estoque
AFTER INSERT ON emprestimos
FOR EACH ROW
EXECUTE FUNCTION baixar_estoque_livro();

CREATE TRIGGER trg_processar_devolucao
BEFORE UPDATE OF status ON emprestimos
FOR EACH ROW
EXECUTE FUNCTION processar_devolucao();