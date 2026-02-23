export class User {
    public readonly id?: number; 
    public readonly name: string;
    public readonly email: string;
    public readonly passwordHash: string;
    public readonly createdAt: Date;
  
    constructor(params: {
      id?: number;
      name: string;
      email: string;
      password: string;
      createdAt: Date;
    }) {
      this.id = params.id;
      this.name = params.name;
      this.email = params.email;
      this.passwordHash = params.password;
      this.createdAt = params.createdAt;
    }
  }