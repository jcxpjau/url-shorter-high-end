export class User {
    public readonly id: string;
    public readonly email: string;
    public readonly passwordHash: string;
    public readonly createdAt: Date;
  
    constructor(params: {
      id: string;
      email: string;
      passwordHash: string;
      createdAt: Date;
    }) {
      this.id = params.id;
      this.email = params.email;
      this.passwordHash = params.passwordHash;
      this.createdAt = params.createdAt;
    }
  }