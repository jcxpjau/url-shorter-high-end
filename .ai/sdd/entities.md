Entidade User:
- id: uuid
- email: string
- passwordHash: string
- createdAt: Date

Entidade ShortLink:
- id: uuid
- userId: uuid
- originalUrl: string
- shortCode: string
- createdAt: Date
- isActive: boolean

Entidade ClickEvent:
- id: uuid
- shortLinkId: uuid
- ip: string
- userAgent: string
- createdAt: Date
