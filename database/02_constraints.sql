ALTER TABLE livros
ADD CONSTRAINT chk_quantidade_disponivel
CHECK (quantidade_disponivel >= 0);

ALTER TABLE emprestimos
ADD CONSTRAINT chk_datas_emprestimo
CHECK (data_devolucao_prevista >= data_emprestimo);

ALTER TABLE emprestimos
ADD CONSTRAINT chk_status_emprestimo
CHECK (status IN ('ATIVO', 'DEVOLVIDO', 'ATRASADO'));
