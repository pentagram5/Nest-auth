import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchUserDto } from './dto/read-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepo: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new UserEntity();
    newUser.email = createUserDto.email;
    newUser.name = createUserDto.name;
    newUser.profileImage = createUserDto.photo;
    newUser.type = createUserDto.type;
    return await this.userEntityRepo.save(newUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(searchUserDto: SearchUserDto) {
    return await this.userEntityRepo.findOne({
      where: {
        email: searchUserDto.email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
