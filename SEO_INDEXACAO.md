# Controle de indexação das landing pages

Atualizado em 24/07/2026.

## Estratégia atual

- Nenhuma URL foi apagada.
- 22 URLs permanecem com `index, follow` e entram no sitemap.
- As outras 143 URLs continuam acessíveis com `noindex, follow` e ficam fora do sitemap.
- O `robots.txt` não bloqueia essas páginas, permitindo que o Google leia o `noindex`.
- Para liberar uma página posteriormente, adicione a cidade ao serviço correspondente em `src/data/seo-index-policy.json`, gere o build e envie o novo sitemap ao Search Console.

## URLs indexáveis

### Institucionais

1. `/`
2. `/servicos`
3. `/hifu`
4. `/politica-de-privacidade`

### Serviços principais em São Lourenço do Oeste

5. `/odontologia-estetica`
6. `/implantes-dentarios`
7. `/ortodontia`
8. `/harmonizacao-orofacial`
9. `/dtm-dor-orofacial`
10. `/ozonioterapia`
11. `/aluguel-de-hifu`
12. `/lipo-de-papada-hifu`

### Locação de HIFU em cidades com operação confirmada

13. `/aluguel-de-hifu-ampere`
14. `/aluguel-de-hifu-realeza`
15. `/aluguel-de-hifu-chapeco`
16. `/aluguel-de-hifu-pato-branco`
17. `/aluguel-de-hifu-curitiba`

### HIFU para papada em cidades com operação confirmada

18. `/lipo-de-papada-hifu-ampere`
19. `/lipo-de-papada-hifu-realeza`
20. `/lipo-de-papada-hifu-chapeco`
21. `/lipo-de-papada-hifu-pato-branco`
22. `/lipo-de-papada-hifu-curitiba`

## URLs temporariamente em noindex

### Páginas agregadoras por cidade

Todas as rotas `/servicos/{cidade}` estão temporariamente em `noindex`, pois usam o mesmo modelo e precisam receber conteúdo logístico específico antes de serem liberadas.

### Serviços odontológicos fora da cidade principal

As variantes regionais de odontologia estética, implantes, ortodontia, harmonização orofacial, DTM e ozonioterapia permanecem em `noindex` até haver conteúdo e modalidade de atendimento próprios para cada cidade.

### HIFU e locação ainda não confirmados para indexação

Permanecem em `noindex` as variantes de:

- Novo Horizonte
- Francisco Beltrão
- Dois Vizinhos
- Palmas
- Xanxerê
- Maravilha
- Pinhalzinho
- São José dos Pinhais
- Pinhais
- Araucária
- Colombo
- Batel
- Água Verde
- Bigorrilho
- Efapi
- Centro de Chapecó
- Concórdia
- Cascavel
- Toledo
- Erechim

Essas páginas podem ser liberadas quando o conteúdo comprovar como o equipamento chega à cidade, modalidade do serviço, disponibilidade, logística, área coberta e informações locais úteis.

## Processo para liberar uma URL

1. Reescrever a LP com conteúdo próprio e verdadeiro.
2. Confirmar que o serviço ocorre naquela cidade.
3. Adicionar a cidade à allowlist de `src/data/seo-index-policy.json`.
4. Executar `npm run build`.
5. Publicar a pasta `build`.
6. Enviar novamente o sitemap no Google Search Console.
7. Solicitar indexação da URL revisada.
