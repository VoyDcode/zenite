# Front-End Design Engineering  
### **Turma:** 1TDSPB e 1TDSPR


---

Zênite é um aplicativo inteligente que te avisa com antecedência sobre tempestades, mudanças bruscas de clima e condições atmosféricas especiais. Com um design leve, notificações claras e uma linguagem acessível, o Zênite traduz dados meteorológicos em informações úteis para o seu dia a dia.
Se vai chover forte, mudar o vento, cair a temperatura ou surgir uma frente fria, o Zênite te avisa com carinho – e com precisão.


---

A aplicação foi construída utilizando **Next.js com App Router** e **TypeScript**, priorizando a criação de uma arquitetura modular, escalável e centrada em componentes reutilizáveis. A abordagem SPA é mantida com o uso de `useEffect`, `useState` e navegação por `next/navigation`.

#### Fluxo de Autenticação

- O login realiza uma requisição POST para a API back-end (Node.js/Express) hospedada no [Railway](https://zenite-gs-production.up.railway.app).  
- O token JWT é armazenado localmente (`localStorage`) e utilizado para proteger as rotas.  
- Middleware personalizado (implementado via `useEffect`) redireciona o usuário para `/login` caso não esteja autenticado.

####  Cadastro de Endereços

- O usuário informa um **CEP**, e os dados de endereço (rua, cidade, estado, bairro) são preenchidos automaticamente utilizando a API pública **ViaCEP**.  
- Após confirmação, o endereço é persistido via requisição POST para o back-end.

####  Clima e Alertas

- Cada endereço cadastrado é utilizado para buscar:  
  - Dados climáticos atuais via **OpenWeather API** (`/weather`)  
  - Alertas meteorológicos via **WeatherAPI** (`/alerts`)  
- A conversão de endereço textual em coordenadas geográficas (latitude/longitude) é feita via **OpenCage API**, permitindo chamadas baseadas em geolocalização.

####  Lógica de Sugestões

- A aplicação exibe recomendações com base em condições meteorológicas (ex: “Leve um casaco!” se a temperatura estiver abaixo de 18 °C), aplicando lógica condicional à resposta da API de clima.

####  Organização de Componentes

- **Pages**: páginas acessíveis via rotas (`/login`, `/cadastro`, etc.)  
- **Components**: UI reutilizável (inputs, cards, loading states)  
- **Services**: abstrações para consumo de APIs externas e da API própria  
- **Utils**: funções auxiliares (ex: parseamento de respostas, formatação de temperatura)  
- **Styles**: estilização com Tailwind, utilizando classes utilitárias.

####  Controle de Erros

- Feedback visual para o usuário em caso de:  
  - Erro na autenticação  
  - CEP inválido ou não encontrado  
  - APIs indisponíveis  
- Utilização de `try/catch` e validações com mensagens claras no front-end.

#### Segurança

- As rotas críticas são protegidas com validação de token JWT.  
- Campos de entrada são validados antes do envio.  
- A navegação é bloqueada caso o usuário tente acessar rotas sem autenticação válida.

---
#### Vercel
###### Obs: Devido a um erro desconhecido a versão do site da vercel não apresenta a estilização funcional 
https://zenite-phi.vercel.app/

#### Video
https://drive.google.com/file/d/1r2PCk8MeK2r_-JWV9cYdj3F58_Qei5wz/view?usp=sharing

---

### Membros do Projeto
Feedbacks são bem-vindos para melhorias contínuas!

| Gabriel Gomes                                                                                   | Natasha Mauricio                                                                               | Victor Rodrigues                                                                              |
|-------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| <img src="https://github.com/user-attachments/assets/2804f237-fa3e-44a0-8fd4-2bd31f2c7db0" width="150px"> | <img src="https://github.com/user-attachments/assets/b4362961-77c9-4d9f-8fd8-ec68476c0953" width="125px"> | <img src="https://github.com/user-attachments/assets/aa851d72-ced1-4501-8eec-69a0911c3af8" width="115px"> |
| **RM: 559597**                                                                                 | **RM: 561159**                                                                                 | **RM: 560087**                                                                                |
| [LinkedIn](https://www.linkedin.com/in/gabriel-gomes-cardoso-4513a9326/) <br> [GitHub](https://github.com/gaaaabz) | [LinkedIn](https://www.linkedin.com/in/natasha-mauricio-silva-santana/) <br> [GitHub](https://github.com/Natasha-Mauricio) | [LinkedIn](https://www.linkedin.com/in/victorrodrigues1227) <br> [GitHub](https://github.com/VoyDcode) |
