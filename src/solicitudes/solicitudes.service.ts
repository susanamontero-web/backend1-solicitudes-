import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateSolicitudDto, UpdateSolicitudDto } from './dto';
import { Solicitud } from './entities/solicitud.entity';

@Injectable()
export class SolicitudesService {
  private solicitudes: Solicitud[] = [];
  private id = 1;

  create(createSolicitudDto: CreateSolicitudDto): Solicitud {
    // RN07: Validar que la fecha no sea posterior a la actual
    const fechaSolicitud = new Date(createSolicitudDto.fechaSolicitud);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSolicitud > hoy) {
      throw new BadRequestException('La fecha de solicitud no puede ser posterior a hoy');
    }

    // RN05: Crear la solicitud con estado Pendiente automáticamente
    const nuevaSolicitud: Solicitud = {
      id: this.id++,
      titulo: createSolicitudDto.titulo,
      cliente: createSolicitudDto.cliente,
      categoria: createSolicitudDto.categoria,
      prioridad: createSolicitudDto.prioridad,
      estado: 'Pendiente', // Estado automático
      descripcion: createSolicitudDto.descripcion,
      fechaSolicitud: createSolicitudDto.fechaSolicitud,
    };

    this.solicitudes.push(nuevaSolicitud);
    return nuevaSolicitud;
  }

  findAll(): Solicitud[] {
    return this.solicitudes;
  }

  findOne(id: number): Solicitud {
    const solicitud = this.solicitudes.find((sol) => sol.id === id);
    // RN10: Responder con error si no existe
    if (!solicitud) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }
    return solicitud;
  }

  /**
   * Buscar solicitudes por estado, prioridad y/o categoría
   */
  search(
    estado?: string,
    prioridad?: string,
    categoria?: string,
  ): Solicitud[] {
    return this.solicitudes.filter((sol) => {
      let coincide = true;

      if (estado && sol.estado !== estado) {
        coincide = false;
      }
      if (prioridad && sol.prioridad !== prioridad) {
        coincide = false;
      }
      if (categoria && sol.categoria !== categoria) {
        coincide = false;
      }

      return coincide;
    });
  }

  update(id: number, updateSolicitudDto: UpdateSolicitudDto): Solicitud {
    const solicitud = this.findOne(id);

    // RN09: No permitir transición de Finalizada a Pendiente
    if (solicitud.estado === 'Finalizada' && updateSolicitudDto.estado === 'Pendiente') {
      throw new BadRequestException('Una solicitud Finalizada no puede volver al estado Pendiente');
    }

    // RN07: Si se actualiza la fecha, validar que no sea futura
    if (updateSolicitudDto.fechaSolicitud) {
      const fechaSolicitud = new Date(updateSolicitudDto.fechaSolicitud);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      if (fechaSolicitud > hoy) {
        throw new BadRequestException('La fecha de solicitud no puede ser posterior a hoy');
      }
    }

    // Actualizar solo los campos proporcionados
    if (updateSolicitudDto.titulo !== undefined) solicitud.titulo = updateSolicitudDto.titulo;
    if (updateSolicitudDto.cliente !== undefined) solicitud.cliente = updateSolicitudDto.cliente;
    if (updateSolicitudDto.categoria !== undefined) solicitud.categoria = updateSolicitudDto.categoria;
    if (updateSolicitudDto.prioridad !== undefined) solicitud.prioridad = updateSolicitudDto.prioridad;
    if (updateSolicitudDto.estado !== undefined) solicitud.estado = updateSolicitudDto.estado;
    if (updateSolicitudDto.descripcion !== undefined) solicitud.descripcion = updateSolicitudDto.descripcion;
    if (updateSolicitudDto.fechaSolicitud !== undefined) solicitud.fechaSolicitud = updateSolicitudDto.fechaSolicitud;

    return solicitud;
  }

  remove(id: number): void {
    const solicitud = this.findOne(id);

    // RN08: No permitir eliminar si está En Proceso
    if (solicitud.estado === 'En Proceso') {
      throw new BadRequestException(
        'No se puede eliminar una solicitud en estado En Proceso. Debe estar en estado Finalizada',
      );
    }

    // Permitir eliminar solo si está Finalizada
    if (solicitud.estado !== 'Finalizada') {
      throw new BadRequestException(
        `No se puede eliminar una solicitud en estado ${solicitud.estado}. Solo se pueden eliminar solicitudes Finalizadas`,
      );
    }

    const index = this.solicitudes.findIndex((sol) => sol.id === id);
    this.solicitudes.splice(index, 1);
  }
}
