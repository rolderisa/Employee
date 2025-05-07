import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength, min } from "class-validator";

export class CreateEmployeeDTO {

    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @IsNotEmpty()
    firstName: string

    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @IsNotEmpty()
    lastName: string

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Length(16, 16)
    nationalId: string

    @IsNotEmpty()
    @MinLength(10)
    telephone: string

    @IsString()
    department: string

    @IsString()
    position: string

    @IsString()
    laptopManufacturer: string

    @IsString()
    model: string

    @IsString()
    serialNumber: string

}
