import { UserService } from '../services/user.service';
import { Body, Controller, Delete, Get, Logger, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { RequestContext } from '@common/decorators/request-context.decorator';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { CreateUserDto, FilterUserDto, UpdatePasswordDto, UpdateUserDto, UserDto } from '../dtos';

// Guard
@Serialize(UserDto)
@Controller('users')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUsers(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterUserDto: FilterUserDto,
  ): Promise<BaseApiSuccessResponse<UserDto[]>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving all users.`);

    const users = await this.userService.getUsers(ctx, filterUserDto);

    return {
      success: true,
      statusCode: 200,
      message: `List of users`,
      data: users,
    };
  }

  @Get('/:id')
  async getUser(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<UserDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" retieving user details of id: ${id}`);

    const user = await this.userService.getUser(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `User details of id ${id}`,
      data: user,
    };
  }

  @Post('/')
  async createUser(
    @RequestContext() ctx: RequestContextDto,
    @Body() createUserDto: CreateUserDto,
  ): Promise<BaseApiSuccessResponse<UserDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" creating a new user.`);

    const user = await this.userService.createUser(ctx, createUserDto);

    return {
      success: true,
      statusCode: 201,
      message: `New user created of id ${user.id}`,
      data: user,
    };
  }

  @Put('/:id')
  async updateUser(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<BaseApiSuccessResponse<UserDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating user id${id}.`);

    const user = await this.userService.updateUser(ctx, id, updateUserDto);

    return {
      success: true,
      statusCode: 200,
      message: `User updated of id ${id}`,
      data: user,
    };
  }

  @Patch('/update-password/:id')
  async updatePassword(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<BaseApiSuccessResponse<UserDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" updating password of user id${id}.`);

    const user = await this.userService.updatePassword(ctx, id, updatePasswordDto);

    return {
      success: true,
      statusCode: 200,
      message: `User updated password of id ${id}`,
      data: user,
    };
  }

  @Delete('/:id')
  async deleteUser(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<UserDto>> {
    this.logger.verbose(`User "${ctx.user?.username}" deleting a user. of id: ${id}`);

    const user = await this.userService.deleteUser(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `User deleted of id ${id}`,
      data: user,
    };
  }

  @Post('/initiate')
  async initiateUser(@RequestContext() ctx: RequestContextDto) {
    this.logger.verbose(`User "${ctx.user?.username}" importing users`);

    const users = await this.userService.initiateUser(ctx);

    return {
      success: true,
      statusCode: 200,
      message: `Users data imported`,
      data: users,
    };
  }
}
