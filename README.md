
# Hubspot e Google Sheet Integration

## Descrição do Projeto
Este projeto integra uma planilha do Google Sheets com o Hubspot para a publicação de contatos no CRM. Ele permite que os dados dos contatos armazenados na planilha sejam sincronizados automaticamente com o Hubspot, facilitando a gestão e atualização das informações de clientes.

## Funcionalidades
- **Sincronização Automática**: Sincroniza automaticamente os contatos do Google Sheets com o Hubspot.
- **Atualização de Contatos**: Atualiza os contatos existentes no Hubspot com as informações mais recentes da planilha.
- **Publicação de Novos Contatos**: Publica novos contatos do Google Sheets no CRM do Hubspot.

## Tecnologias Utilizadas
- **Google Sheets API**: Para acessar e manipular os dados da planilha.
- **Hubspot API**: Para publicar e atualizar os contatos no CRM do Hubspot.
- **Linguagem de Programação**: Node.js, Nest.js, Typescript

## Como Utilizar
 1. **Configuração Inicial**:
 - Requerimentos: Node.js >= 18;
 - Obtenha as credenciais do [Google Sheets API](https://medium.com/@sakkeerhussainp/google-sheet-as-your-database-for-node-js-backend-a79fc5a6edd9) e adicione o arquivo credentials.json no mesmo diretório do package.json. Já existe um credentails.example.json como referência.
  - Obtenha as credenciais do [Hubspot API](https://developers.hubspot.com/docs/api/developer-guides-resources) e adicione a API Key no arquivo .env do projeto. Já existe um arquivo .env.example como referência;
  - Configure as credenciais no arquivo de configuração do projeto.
  - Exemplo do template da planilha em csv
  ```
    company,firstname,lastname,email,phone,website
    Example Inc.,John,Doe,contact@example.com,(555) 555-5555,http://example.com
  ```

2. **Execução do Script**:
  - Execute o script principal para iniciar a sincronização dos contatos.
  - Instalação dos pacotes do projeto: `npm i`
  - Execução do projeto: `npm run start`
  - Acessar o swagger: `http://localhost:3000/api/#`
  - *Outros scripts*: 
  - Execução do projeto em desenvolvimento: `npm run start:dev`
  - Execução dos testes unitários: `npm run test`

3. **Monitoramento e Logs**:
  - Verifique os logs para monitorar o status da sincronização e identificar possíveis erros.

## Licença
Este projeto está licenciado sob a MIT License.