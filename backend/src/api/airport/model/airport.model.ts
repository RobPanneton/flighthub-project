import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("airports")
export class Airport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  city_code!: string;

  @Column()
  name!: string;

  @Column()
  city!: string;

  @Column()
  country_code!: string;

  @Column()
  region_code!: string;

  @Column({ type: "float" })
  latitude!: number;

  @Column({ type: "float" })
  longitude!: number;

  @Column()
  timezone!: string;
}
