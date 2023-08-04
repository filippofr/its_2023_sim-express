import { IsMongoId, IsString, IsOptional, IsDate, IsBoolean } from "class-validator";
import { Transform, Type } from 'class-transformer';

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

export class QueryTodoDTO {
  @IsBoolean()
  @Transform(({ value }) => {
    value = value.toLowerCase();
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsOptional()
  showCompleted: boolean;
}

export class AssignmentParamsDTO {
  @IsMongoId()
  id: string;
}

export class AssignmentBodyDTO {
  @IsMongoId()
  userId: string;
}