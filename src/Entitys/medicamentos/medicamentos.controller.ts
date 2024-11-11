import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Put, 
  Delete, 
  NotFoundException 
} from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { Medicamento } from './medicamento.entity';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly medicamentosService: MedicamentosService) {}

  // Obtener todos los medicamentos con sus relaciones
  @Get()
  async findAll(): Promise<Medicamento[]> {
    return this.medicamentosService.findAll();
  }

  // Crear un medicamento vinculado a un usuario con condición
  @Post(':usuarioId')
  async create(
    @Param('usuarioId') usuarioId: number,
    @Body() medicamento: Partial<Medicamento>,
  ): Promise<Medicamento> {
    return this.medicamentosService.create(medicamento, usuarioId);
  }

  // Obtener un medicamento específico por su ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Medicamento> {
    const medicamento = await this.medicamentosService.findOne(id);
    if (!medicamento) {
      throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
    }
    return medicamento;
  }

  // Obtener todos los medicamentos de un usuario con condición específico
  @Get('usuario/:usuarioId')
  async findByUsuario(@Param('usuarioId') usuarioId: number): Promise<Medicamento[]> {
    return this.medicamentosService.findByUsuario(usuarioId);
  }

  @Post()
  async createMedicamento(
    @Body('id_usuario_condicion') usuarioId: number,
    @Body() medicamentoData: Partial<Medicamento>,
  ): Promise<Medicamento> {
    if (!usuarioId) {
      throw new Error('El usuarioId es requerido en el cuerpo de la solicitud.');
    }
    return this.medicamentosService.create(medicamentoData, usuarioId);
  }

  // Actualizar un medicamento por ID
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() medicamento: Partial<Medicamento>,
  ): Promise<Medicamento> {
    return this.medicamentosService.update(id, medicamento);
  }

  // Eliminar un medicamento por ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.medicamentosService.remove(id);
  }
}
