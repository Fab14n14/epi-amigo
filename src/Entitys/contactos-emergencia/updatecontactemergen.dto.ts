import { PartialType } from '@nestjs/mapped-types';
import { CreateContactoEmergenciaDto } from './createcontactemergen.dto';

export class UpdateContactoEmergenciaDto extends PartialType(CreateContactoEmergenciaDto) {}
