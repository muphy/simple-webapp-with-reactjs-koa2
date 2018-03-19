import { Entity,PrimaryColumn,Column } from "typeorm";

@Entity("user")
export class User  {
    
    @PrimaryColumn("uuid")
    id: string;

    @Column()
    name: string;
    @Column()
    gender:string;
    @Column()
    age: number;
    @Column()
    ages: number;
    @Column()
    phone: string;
    @Column()
    birthdate: Date;

}