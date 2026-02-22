Casos de uso:

1. Registrar usuário
   Entrada: email, senha
   Saída: User

2. Autenticar usuário
   Entrada: email, senha
   Saída: accessToken

3. Criar link encurtado
   Entrada: originalUrl
   Saída: ShortLink

4. Redirecionar link
   Entrada: shortCode
   Saída: originalUrl

   Regra:
   - Buscar URL no Redis primeiro
   - Registrar clique de forma assíncrona via fila
   - Não bloquear o redirecionamento

5. Listar links do usuário
   Entrada: userId
   Saída: lista de ShortLink

6. Obter estatísticas de um link
   Entrada: shortLinkId
   Saída:
   - totalClicks
   - lista de ClickEvent (paginada)
