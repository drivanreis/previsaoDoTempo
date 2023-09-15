# Boas-vindas ao repositório do projeto Previsão do Tempo

# Orientações

<details>
  <summary><strong>‼️ Antes de começar a desenvolver</strong></summary><br />

  1. Clone o repositório

  2. Instale as dependências

* `npm install`.

<details>
  <summary><strong>🛠 Testes</strong></summary><br />

* <details><summary><b> Execução de testes de requisito</b></summary>

  Os testes deste projeto foram feitos por meio do [Cypress](https://www.cypress.io/how-it-works/). É utilizada nos testes a resolução `1366 x 768` (1366 pixels de largura por 768 pixels de altura) para testes de layout. Logo, recomenda-se desenvolver seu projeto usando a mesma resolução, via instalação [deste plugin](https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh?hl=en) do `Chrome` para facilitar a configuração dessa resolução, por exemplo.

  Para o projeto ser validado, todos os testes de comportamento devem passar. É possível testar isso local rodando `npm run cy`. Esse comando roda a suite de testes do Cypress que valida se o fluxo geral e os requisitos funcionais estão funcionando como deveriam. Você pode também executar o comando `npm run cy:open` para ter um resultado visual dos testes executados.

  Esses testes não consideram o layout de maneira geral, mas sim os atributos e as informações corretas, então preste atenção nisso! Os testes te darão uma mensagem de erro caso não estejam passando (seja qual for o motivo). 😉

  **Atenção**: Sua aplicação deve estar rodando para o Cypress no terminal poder testar.
  </details>

* <details><summary><b> Execução de um teste específico</b></summary>

  Para executar somente uma `spec` de testes, você pode rodar somente um arquivo de teste com o comando `npm run cy -- --spec cypress/integration/nomeDoArquivo_spec.js` ou pode selecionar qual delas você deseja após executar o comando `npm run cy:open`.

  Além disso, é possível rodar apenas um trecho de um `spec`. Para isso, basta utilizar a função .only após o `describe`, `it` ou `test`. Com isso, será possível que apenas parte de um teste rode localmente.

  </details>

</details>

<details>
  <summary><strong>💻 Protótipo do projeto no Figma</strong></summary><br />

  Além da qualidade do código e do atendimento aos requisitos, um bom layout é um dos aspectos responsáveis por melhorar a usabilidade de uma aplicação e turbinar seu portfólio!

  Você pode estar se perguntando: _"Como deixo meu projeto com um layout mais atrativo?"_ 🤔

  Nesse projeto, o layout já está pronto, no entanto, se quiser deixar seu projeto com sua cara, você poderá usar o Figma para criar um layout personalizado com base no protótipo que preparamos para você.

  - [protótipo do Figma](https://www.figma.com/file/1hP7zvxsVO3bguxES6Z5tj/%5BProject%5D%5BFrontend%5D-iChoveu?node-id=0%3A1&t=LssBwPTABbr9rIob-1)

</details>

# Acessando a API

<details>
<summary>Como acessar a API</summary><br />

Para isso, será necessário que você crie uma conta no [WeatherAPI](https://www.weatherapi.com/signup.aspx) e gere uma chave de API.

Após acessar sua conta, você verá uma tela como a seguinte:

![image](./images/weatherapi.png)

Nessa página, você deve clicar no botão `Copy` para copiar a chave (ou token) da API. É com ela que você vai se autenticar na API, então guarde-a em um lugar seguro.

Crie um arquivo `.env` na raiz do projeto e adicione a chave de API que você acabou de copiar, como no exemplo a seguir.

```sh
VITE_TOKEN=SEU_TOKEN_AQUI
```

O arquivo `.env` já está configurado no arquivo `.gitignore` para que não seja enviado para o repositório remoto, então seu token será mantido apenas localmente.

Daqui pra frente, você pode acessar o token por meio do objeto `import.meta.env.VITE_TOKEN` dentro de seu código.

Caso queira explorar a API, você poderá acessar a [documentação](https://www.weatherapi.com/docs/) e ver como ela funciona ou acessar o [playground](https://www.weatherapi.com/api-explorer.aspx) para testar as requisições.

</details>

# Publicações:
* [Previsão do Tempo no SURGE](https://previsaodotempo-ivan-reis.surge.sh/)

* [Previsão do Tempo no VERCEL](https://previsao-do-tempo-ia6j2b7p7-drivanreis.vercel.app/)

# Publicando uma aplicação com Surge
adicionar um novo script ao arquivo package.json
"build": "vite build" ou "build": "tsc && vite build"

* npm run build
cria a pasta dist e lembre de incluir a pasta dist no .gitignore
* npm install -g surge
* surge dist
Se for a sua primeira vez utilizando a ferramenta, uma mensagem no terminal aparecerá, solicitando a criação de uma conta. Basta adicionar o seu e-mail e criar uma senha. Depois, forneça as informações solicitadas no terminal