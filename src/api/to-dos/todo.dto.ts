import { IsInt, Min, Max, IsMongoId, IsString, IsOptional, IsDate, IsBoolean } from "class-validator";
import { Type } from 'class-transformer';

export class AddTodoDTO {
  @IsString()
  title: string;

  @IsMongoId()
  @IsOptional()
  assignedTo: string

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDate: Date
}

export class SetCompletedDTO {
  @IsMongoId()
  id: string;
}