Requisitos não funcionais:

- Redirecionamento deve ser O(1) usando Redis
- Banco relacional não deve ser acessado no redirect
- Estatísticas devem ser processadas via RabbitMQ
- Aplicação deve suportar múltiplas instâncias
- Código preparado para horizontal scaling
- Uso de índices no banco para shortCode e userId
- Logs estruturados
