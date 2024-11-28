import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'user id',
  })
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, comment: 'user email' })
  email: string;

  @Column({ type: 'varchar', length: 255, comment: 'user name' })
  name: string;

  @Column({
    name: 'profile_image',
    type: 'varchar',
    length: 255,
    unique: true,
    comment: 'user profile Image',
  })
  profileImage: string;

  @Column({ type: 'varchar', length: 255, comment: 'user type' })
  type: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
