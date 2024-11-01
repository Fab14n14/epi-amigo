import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioCondicion } from './Entitys/Usuario_condicion/usuarios-condicion.entity';
import { MedicamentosModule } from './Entitys/medicamentos/medicamentos.module';
import { CondicionesModule } from './Entitys/condiciones/condiciones.module';
import { UsuarioModule } from './Entitys/usuarios/usuario.module';
import { ContactosEmergenciaModule } from './Entitys/contactos-emergencia/contactos-emergencia.module'; // Asegúrate de que esta ruta sea correcta
import { Medicamento } from './Entitys/medicamentos/medicamento.entity';
import { join } from 'path'; // Para manejar rutas de archivos
import { CrisisModule } from './Entitys/crisis/crisis.module';
import { SintomasModule } from './Entitys/sintomas/sintomas.module';
import { InvitacionesModule} from './Entitys/invitaciones/invitaciones.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Las variables de entorno estarán disponibles globalmente
      envFilePath: join(__dirname, '..', 'config.env'), // Ruta del archivo de entorno
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('Conectando a la base de datos:', config.get<string>('DATABASE_NAME')); // Verificación de conexión
        return {
          type: 'postgres',
          host: config.get<string>('DATABASE_HOST'),
          port: config.get<number>('DATABASE_PORT'),
          username: config.get<string>('DATABASE_USER'),
          password: config.get<string>('DATABASE_PASSWORD'),
          database: config.get<string>('DATABASE_NAME'),
          autoLoadEntities: true, // Carga automática de entidades
          synchronize: false, // Solo para desarrollo, ¡cuidado con producción!
          logging: true, // Activa logging de consultas SQL
        };
      },
    }),
    TypeOrmModule.forFeature([UsuarioCondicion, Medicamento]), // Registra las entidades necesarias
    MedicamentosModule,
    CondicionesModule,
    UsuarioModule,
    ContactosEmergenciaModule,
    CrisisModule ,
    SintomasModule ,
   
  ],
})
export class AppModule {}
