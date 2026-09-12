import { IsOptional, IsString, MinLength, IsEnum, IsDateString } from 'class-validator';

export class UpdateSolicitudDto {
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'El título debe tener al menos 5 caracteres' })
  titulo?: string;

  @IsOptional()
  @IsString()
  cliente?: string;

  @IsOptional()
  @IsEnum(['Hardware', 'Software', 'Redes', 'Seguridad', 'Soporte Usuario'], {
    message: 'Categoría inválida. Permitidas: Hardware, Software, Redes, Seguridad, Soporte Usuario',
  })
  categoria?: string;

  @IsOptional()
  @IsEnum(['Baja', 'Media', 'Alta', 'Crítica'], {
    message: 'Prioridad inválida. Permitidas: Baja, Media, Alta, Crítica',
  })
  prioridad?: string;

  @IsOptional()
  @IsEnum(['Pendiente', 'En Proceso', 'Finalizada'], {
    message: 'Estado inválido. Permitidos: Pendiente, En Proceso, Finalizada',
  })
  estado?: string;

  @IsOptional()
  @IsString()
  @MinLength(15, { message: 'La descripción debe tener al menos 15 caracteres' })
  descripcion?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha debe estar en formato YYYY-MM-DD' })
  fechaSolicitud?: string;
}
