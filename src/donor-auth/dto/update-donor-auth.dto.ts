import { PartialType } from '@nestjs/swagger';
import { CreateDonorAuthDto } from './create-donor-auth.dto';

export class UpdateDonorAuthDto extends PartialType(CreateDonorAuthDto) {}
