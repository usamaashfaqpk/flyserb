import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDetailsDto } from './dto/save.dto';
import { SaveService } from './save.service';

@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  // this endpoint will be called from frontend to save the user name email and message inside the database
  @Post('user-data')
  async saveData(@Body() body: CreateUserDetailsDto) {
    const user = await this.saveService.saveUserDetails(
      body.name,
      body.email,
      body.message,
    );

    return {
      message: 'User details saved successfully',
      user,
    };
  }
}
