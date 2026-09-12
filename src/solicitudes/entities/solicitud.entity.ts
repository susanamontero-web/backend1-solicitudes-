import { ApiProperty } from '@nestjs/swagger';

export class Solicitud {
  @ApiProperty({ description: 'ID único', example: 1 })
  id!: number;

  @ApiProperty({ description: 'Título', example: 'Solicitud de nuevo equipo' })
  titulo!: string;

  @ApiProperty({ description: 'Cliente', example: 'Juan Pérez' })
  cliente!: string;

  @ApiProperty({
    description: 'Categoría',
    example: 'Hardware',
    enum: ['Hardware', 'Software', 'Redes', 'Seguridad', 'Soporte Usuario'],
  })
  categoria!: string;

  @ApiProperty({
    description: 'Prioridad',
    example: 'Media',
    enum: ['Baja', 'Media', 'Alta', 'Crítica'],
  })
  prioridad!: string;

  @ApiProperty({
    description: 'Estado',
    example: 'Pendiente',
    enum: ['Pendiente', 'En Proceso', 'Finalizada'],
  })
  estado!: string;

  @ApiProperty({
    description: 'Descripción',
    example: 'Se necesita reparar el disco duro...',
  })
  descripcion!: string;

  @ApiProperty({
    description: 'Fecha de solicitud',
    example: '2026-09-11',
  })
  fechaSolicitud!: string;
}
