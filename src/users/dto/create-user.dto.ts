export class CreateUserDto {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordSalt: string;
};

export class CreateAuthUserDto {
  public readonly email: string;
  public readonly password: string;
}

export class VerifyUserByEmailDto {
  public readonly email: string;
  public readonly password: string;
}