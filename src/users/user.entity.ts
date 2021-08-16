import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, Unique } from 'typeorm';
//import { hash } from 'bcrypt';
import { IsEmail, Min } from 'class-validator';
import * as crypto from 'crypto';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Min(8)
  password: string;

  @Column({
    length: 128,
  })
  public passwordSalt: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  // async hashPassword() {
  //   this.password = await hash(this.password, 10);
  // }
  public async hashPasswordWithSalt() {
    const salt = this.generateRandomSalt(128)
    this.passwordSalt = salt
    this.password = crypto
        .createHmac('sha256', salt)
        .update(this.password)
        .digest('hex')
  }

  private generateRandomSalt(length: number): string {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
  }
}