import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';

export class CreateSolicitudDto {
  @ApiProperty({ description: 'Título (mínimo 5 caracteres)', example: 'Solicitud de nuevo equipo' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString()
  @MinLength(5, { message: 'El título debe tener al menos 5 caracteres' })
  titulo!: string;

  @ApiProperty({ description: 'Cliente', example: 'Juan Pérez' })
  @IsNotEmpty({ message: 'El cliente es obligatorio' })
  @IsString()
  cliente!: string;

  @ApiProperty({
    description: 'Categoría',
    example: 'Hardware',
    enum: ['Hardware', 'Software', 'Redes', 'Seguridad', 'Soporte Usuario'],
  })
  @IsEnum(['Hardware', 'Software', 'Redes', 'Seguridad', 'Soporte Usuario'], {
    message: 'Categoría inválida. Permitidas: Hardware, Software, Redes, Seguridad, Soporte Usuario',
  })
  categoria!: string;

  @ApiProperty({
    description: 'Prioridad',
    example: 'Media',
    enum: ['Baja', 'Media', 'Alta', 'Crítica'],
  })
  @IsEnum(['Baja', 'Media', 'Alta', 'Crítica'], {
    message: 'Prioridad inválida. Permitidas: Baja, Media, Alta, Crítica',
  })
  prioridad!: string;

  @ApiProperty({
    description: 'Descripción (mínimo 15 caracteres)',
    example: 'Se necesita reparar el disco duro que presenta sectores dañados',
  })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString()
  @MinLength(15, { message: 'La descripción debe tener al menos 15 caracteres' })
  descripcion!: string;

  @ApiProperty({
    description: 'Fecha de solicitud (YYYY-MM-DD, no puede ser futura)',
    example: '2026-09-11',
  })
  @IsNotEmpty({ message: 'La fecha de solicitud es obligatoria' })
  @IsDateString({}, { message: 'La fecha debe estar en formato YYYY-MM-DD' })
  fechaSolicitud!: string;
}
