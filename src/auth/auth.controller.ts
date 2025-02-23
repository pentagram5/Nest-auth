import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('/user/login/naver')
  @UseGuards(AuthGuard('naver'))
  async naverAuth(@Req() _req: Request) {}

  /* Get naver Auth Callback */
  @Get('/naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverAuthCallback(
    @Req() req,
    // @Res() res: Response, // : Promise<NaverLoginAuthOutputDto>
  ) {
    const { user } = req;
    const existUser = await this.userService.findOne({
      email: user.email,
      nickname: user.nickname,
      photo: user.photo,
    });
    if (!existUser) {
      await this.userService.create({
        email: user.email,
        name: user.nickname,
        photo: user.photo,
        type: 'naver',
      });
    }
    return { user };
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
