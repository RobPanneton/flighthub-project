import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("flights")
export class Flight {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  airline!: string;

  @Column()
  number!: string;

  @Column()
  departure_airport!: string;

  @Column()
  departure_time!: Date;

  @Column()
  arrival_airport!: string;

  @Column()
  arrival_time!: Date;

  @Column("decimal")
  price!: number;
}
