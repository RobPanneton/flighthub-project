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
  departure_time!: string;

  @Column()
  arrival_airport!: string;

  @Column()
  arrival_time!: string;

  @Column("decimal")
  price!: number;
}
