export interface JwtSigner {
    sign(payload: { sub: number, email: string }): Promise<string>;
}