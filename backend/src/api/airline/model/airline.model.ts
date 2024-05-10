import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Airline {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;
}
