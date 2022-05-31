import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface MemoryCreationAttrs {
    title: string;
    content: string;
    description: string;
    userId: number;
    imageUrl: string;
}

@Table({tableName: 'memories'})
export class Memory extends Model<Memory, MemoryCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    // FIXME поменять на текст, или что там надо
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @Column({type: DataType.STRING, allowNull: false})
    date: string

    @Column({type: DataType.STRING})
    imageUrl: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User
}
