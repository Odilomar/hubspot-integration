import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: 'The email address of the contact.',
    default: 'example@hubspot.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The first name of the contact.',
    default: 'Jane',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    description: 'The last name of the contact.',
    default: 'Doe',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'The phone number of the contact.',
    default: '(555) 555-5555',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'The company of the contact.',
    default: 'HubSpot',
  })
  @IsString()
  company: string;

  @ApiProperty({
    description: 'The website of the contact.',
    default: 'https://www.hubspot.com',
  })
  @IsUrl()
  @IsString()
  website: string;
}
