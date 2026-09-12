import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudDto, UpdateSolicitudDto } from './dto';
import { Solicitud } from './entities/solicitud.entity';

@ApiTags('solicitudes')
@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una nueva solicitud' })
  @ApiResponse({
    status: 201,
    description: 'Solicitud creada correctamente',
    type: Solicitud,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body(ValidationPipe) createSolicitudDto: CreateSolicitudDto): Solicitud {
    return this.solicitudesService.create(createSolicitudDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las solicitudes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de solicitudes',
    type: [Solicitud],
  })
  findAll(): Solicitud[] {
    return this.solicitudesService.findAll();
  }

  @Get('buscar')
  @ApiOperation({ summary: 'Buscar solicitudes' })
  @ApiQuery({ name: 'estado', required: false, description: 'Filtrar por estado' })
  @ApiQuery({ name: 'prioridad', required: false, description: 'Filtrar por prioridad' })
  @ApiQuery({ name: 'categoria', required: false, description: 'Filtrar por categoría' })
  @ApiResponse({
    status: 200,
    description: 'Solicitudes encontradas',
    type: [Solicitud],
  })
  search(
    @Query('estado') estado?: string,
    @Query('prioridad') prioridad?: string,
    @Query('categoria') categoria?: string,
  ): Solicitud[] {
    return this.solicitudesService.search(estado, prioridad, categoria);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar una solicitud por ID' })
  @ApiResponse({
    status: 200,
    description: 'Solicitud encontrada',
    type: Solicitud,
  })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  findOne(@Param('id') id: string): Solicitud {
    return this.solicitudesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una solicitud' })
  @ApiResponse({
    status: 200,
    description: 'Solicitud actualizada',
    type: Solicitud,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos o violación de reglas de negocio' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSolicitudDto: UpdateSolicitudDto,
  ): Solicitud {
    return this.solicitudesService.update(+id, updateSolicitudDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar una solicitud' })
  @ApiResponse({ status: 204, description: 'Solicitud eliminada' })
  @ApiResponse({
    status: 400,
    description: 'No se puede eliminar: solicitud en estado En Proceso o no Finalizada',
  })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  remove(@Param('id') id: string): void {
    this.solicitudesService.remove(+id);
  }
}
