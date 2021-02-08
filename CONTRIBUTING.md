# Como contribuir

Para contribuir com esse projeto realize um fork dele observe se existe uma issue sobre o que você deseja implementar, caso não exista, crie uma, em seguida realize um fork do projeto, crie uma branch nesse fork e realize suas alterações desejadas, quando tiver tudo alterado e funcionando corretamente, realize um squash dos commits e abra um PR para mergear no projeto principal.

Read this in other languages: [English](CONTRIBUTING.en.md), [Português](CONTRIBUTING.md)

# Requisitos minimos para o PR ser aprovado
Caso algum desses requisitos não seja cumprido o PR será imediatamente reprovado até que seja feita as correções:
- Não possuir qualquer conteúdo ofensivo ou desrespeitoso em qualquer ponto, seja no texto do commit como no projeto
- Testes automatizados para a implementação
- CI passando com sucesso os testes automatizados, lint e tsc
- Sonarqube passando com sucesso nos quality gates
- Apenas 1 commit por PR
- Commit seguindo o padrão "[#ISSUE_ID] Descricao do commit", por exemplo: "[#49] Edited Readme"
- Tudo, exceto os textos, deve estar escrito em inglês
- Imports precisam estar organizado em grupos e cada grupo em ordem alfabética, seguindo o padrão do projeto