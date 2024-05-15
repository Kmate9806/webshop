import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductDTO } from '../../../models';

import { User } from './User';
import { Category } from './Category';

@Entity()
export class Product implements ProductDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'text' })
    title: string;

    @Column({ nullable: true, type: 'text' })
    description: string;

    @Column()
    price: number;

    @Column()
    imgUrl: string;

    @Column({ nullable: true })
    brand: string;

    @Column({ type: 'date', nullable: true })
    expiration: string;

    @ManyToOne(() => User, (user) => user.products, { eager: true })
    uploader: User;

    @ManyToMany(() => Category, { eager: true })
    @JoinTable()
    categories: Category[];
}