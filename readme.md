# 🟢 URL Shortener API

![badge](https://img.shields.io/badge/Node.js-18.x-green) ![badge](https://img.shields.io/badge/NestJS-10.x-red) ![badge](https://img.shields.io/badge/Prisma-5.x-blue) ![badge](https://img.shields.io/badge/Docker-24.x-lightgrey) ![badge](https://img.shields.io/badge/Postgres-15.x-orange) ![badge](https://img.shields.io/badge/RabbitMQ-3.12-purple) ![badge](https://img.shields.io/badge/Redis-7.x-yellow)

API de encurtamento de URLs, construída com foco em **alta performance, escalabilidade e arquitetura modular**, usando NestJS, Prisma ORM, Redis, RabbitMQ, e Microserviço para caching/alta concorrência

---

## ⚡ Features

* Criação de links curtos com validação robusta.
* Autenticação JWT
* Redirecionamento rápido e tracking de cliques.
* **Alta concorrência** com eventos de clique em **fire-and-forget**, processados via RabbitMQ.
* **WORKER** microserviço desacoplado que consome fila do RabbitMQ e atualiza estasticias.
* **Redis cache** para redirect e em tempo real, evitando gargalos no banco.
* Persistência em **PostgreSQL** com migrations gerenciadas pelo **Prisma**.
* Arquitetura modular seguindo **Clean Architecture** e **SOLID**
* Dockerizado, pronto para dev e produção.

---

## 🏗 Arquitetura

```text
src/
 ├─ application/    # Casos de uso e lógica de negócio
 ├─ domain/         # Entidades e contratos (repositories, interfaces)
 ├─ infrastructure/ # Implementações externas (Prisma, RabbitMQ, Redis)
 ├─ presentation/   # Controllers, DTOs e rotas HTTP
 └─ shared/         # Utilitários, exceptions, pipes
```

**Docker + Services:**

* **API**: NestJS + Node.js
* **Database**: PostgreSQL
* **Queue**: RabbitMQ (event-driven, fire-and-forget)
* **Cache**: Redis (alta concorrência, contagem de cliques em tempo real)
* **Woker**: Node.JS

---

## ⚙️ Setup Rápido (Docker)

Clone o projeto:

```bash
git clone <repo-url> && cd url-shortener
```

Suba os containers:

```bash
docker-compose build
docker-compose up -d
```

Entre no container da API e rode as migrations:

```bash
docker exec -it urlshorter_api_1 sh
npx prisma migrate dev --name=init
```

A API estará disponível em:

```text
http://localhost:3000
http://localhost:3000/swagger
```

---

## 🔧 Tecnologias

* **Node.js 18+**
* **NestJS 10+** (modular, escalável)
* **Prisma ORM 5+** (tipado e migrations)
* **PostgreSQL 15+** (robusto e confiável)
* **Redis 7+** (cache para alta concorrência)
* **RabbitMQ 3.12+** (event-driven fire-and-forget)
* **Docker + Docker Compose** (isolamento de dev/prod)
* **Jest** para testes unitários e integração

---

## 🚀 Endpoints Principais

| Endpoint                      | Método | Descrição                                          |
| ------------------------------| ------ | -------------------------------------------------- |
| `/auth/login`                 | POST   | Login                                              |
| `/auth/register`              | POST   | Criação de Usuário                                 |
| `/short-links`                | POST   | Criação de ShortLinks                              |
| `/short-links/:id/:status`    | PATCH  | Editar Link                                        |
| `/short-links/user/:user`     | GET    | Exibir Links do Usuário                            |
| `/short-links/user/:user`     | GET    | Exibir Links do Usuário                            |
| `/short-links/:id`            | DELETE | Excluir Link                                       |
| `/users/:id`                  | GET    | Informações do Usuário                             |
| `/users/:id`                  | DELETE | Excluir Usuário                                    |
| `/stats-link/link/:id`        | GET    | Estatisticas do link do usuário                    |
| `/redirect/:shortcode`        | GET    | Redirecionamento Performático                      |

---

## 📦 Boas práticas implementadas

* **Clean Architecture**: Separação clara entre domínio, aplicação e infraestrutura.
* **Alta concorrência**: Eventos de clique enviados para RabbitMQ com fire-and-forget, garantindo performance mesmo em picos.
* **Cache em Redis**: Dados que exigem alta leitura.
* **Dockerizado**: Ambiente reproduzível, isolado, pronto para CI/CD.
* **Tipagem forte com TypeScript**: Evita bugs comuns e facilita manutenção.
* **Migration-first com Prisma**: Controle de versão do banco de dados.
* **Extensível**: Fácil adicionar autenticação JWT, rate-limiting ou analytics avançado.

---

## 🎯 Próximos passos

* Dashboard para analytics de cliques e URLs, em tempo real via Redis.
* Rate-limiting e proteção anti-bot.
* Integração com frontend React ou Next.js.
* Testes Unitários
