import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { UserRole, UserStatus } from '../enums';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: [UserRole.User] })
  role: UserRole;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ name: 'mobile_no', nullable: true })
  mobileNo: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Active })
  status: UserStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted User of id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User of id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User Removed`);
  }
}
