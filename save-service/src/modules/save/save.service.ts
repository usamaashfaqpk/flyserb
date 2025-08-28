import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEmails } from './entities/save.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class SaveService {
  constructor(
    @InjectRepository(UserEmails)
    private userEmailsRepository: Repository<UserEmails>,
    private rabbit: RabbitmqService,
  ) {}

  async saveUserDetails(name: string, email: string, message: string) {
    try {
      const payload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      };
      // Logic to save user details to the database
      const userDetails = this.userEmailsRepository.create({ ...payload });
      const savedDetails = await this.userEmailsRepository.save(userDetails);

      // publish to RabbitMQ with routing key 'email'
      this.rabbit.publish('email', {
        email: savedDetails.email,
        name: savedDetails.name,
        message: savedDetails.message,
      });

      return userDetails;
    } catch {
      throw new BadRequestException('Failed to save user details');
    }
  }
}
