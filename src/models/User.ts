import { Entity,PrimaryColumn,Column } from "typeorm";

@Entity("user")
export class User  {
    
    @PrimaryColumn("uuid")
    id: string;

    @Column("string")
    name: string;
    
    @Column("string")
    gender:string;
    
    @Column("number")
    age: number;
    
    @Column("number")
    ages: number;
    
    @Column("string")
    phone: string;
    
    @Column("date")
    birthdate: Date;

}