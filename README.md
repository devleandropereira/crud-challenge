# CrudChallenge

Projeto frontend de gerenciamento de pagamentos com utilização do framework Angular v15 e simulação de integração backend com Json-Server.

O projeto possui página de login, dashboard e formulários de cadastro, edição e confirmação.

Todos os registros de acesso e pagamentos estão disponíveis em `db.json` na raíz do projeto.

Esse projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Login

No login deve ser preenchido e-mail e senha do usuário. Por padrão, pode ser utilizado o registro abaixo:
    
    e-mail: usuario@gmail.com 
    senha: usuario

Ambos campos são obrigatórios e o usuário tem a opção de clicar no ícone do campo para visualizar sua senha.

Em caso de acesso negado, o sistema irá retornar com a respectiva mensagem. Já em caso de sucesso será direcionado ao dashboard de pagamentos.

Foi configurado o tempo de expiração de sessão em 10 minutos.

## Dashboard

Em dashboard, a página irá listar os registros encontrados em `db.json` com as informações de usuário, título, data, valor e se está pago ou não.

É possível adicionar novos registros, alterar, remover e atualizar para pago. 

Também é possível mudar a ordenação dos registros na listagem, pesquisar por título (deve ser igual ao preenchido no registro) e navegar entre as páginas.

## Formulários

Os formulários foram elaborados em modais sendo o cadastro e edição os mesmos components, diferenciando apenas pela origem da sua chamada e ação ao salvar.
Os modais de confirmação também são os mesmos componentes, diferenciando também apenas pela origem da sua chamada sendo uma remoção ou pagamento (marcar como pago).

## Design

Foram utilizados os componentes do Material Angular v15 (inputs, dialog, snackbar, ícones, etc...) e estilos do Bootstrap v5 (espaçamentos, display, alinhamentos, tamanhos, etc...).

## Biblioteca Extra

Foi adicionado o ng2-currency-mask v13 para comportamento e validação do input de Valor encontrado no Formulário de cadastro/edição.

## Servidor de desenvolvimento

FRONTEND -> Execute `ng serve` no diretório do projeto e navegue para `http://localhost:4200/`. 

BACKEND -> Execute `npm install -g json-server` e para rodar (deixar aberto em uma outra aba do terminal, para que ele fique escutando suas ações de CRUD!), execute o seguinte comando na RAÍZ do projeto:
`json-server --watch db.json --port 3030`

## Testes unitários

Execute `ng test` para os testes unitário via [Karma](https://karma-runner.github.io).
