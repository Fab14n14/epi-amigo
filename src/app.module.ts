import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuarioCondicion } from './Entitys/Usuario_condicion/usuarios-condicion.entity';
import { MedicamentosModule } from './Entitys/medicamentos/medicamentos.module';
import { CondicionesModule } from './Entitys/condiciones/condiciones.module';
import { UsuarioModule } from './Entitys/usuarios/usuario.module';
import { ContactosEmergenciaModule } from './Entitys/contactos-emergencia/contactos-emergencia.module'; // Asegúrate de que esta ruta sea correcta
import { Medicamento } from './Entitys/medicamentos/medicamento.entity';
import { CrisisModule } from './Entitys/crisis/crisis.module';
import { SintomasModule } from './Entitys/sintomas/sintomas.module'; 
import { UsuarioTipoCondicionModule } from './Entitys/UsuarioTipoCondicion/UsuarioTipoCondicion.module';
import { RecursosModule } from './Entitys/recursos/recursos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([UsuarioCondicion, Medicamento]), // Registra las entidades necesarias
    MedicamentosModule,
    CondicionesModule,
    UsuarioModule,
    ContactosEmergenciaModule,
    CrisisModule ,
    SintomasModule ,
    UsuarioTipoCondicionModule,
    RecursosModule,
   
  ],
})
export class AppModule {}
