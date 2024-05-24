import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("airlines")
export class Airline {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @Column()
  logo!: string;
}
