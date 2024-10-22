import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
    it('should create an instance of CreateUserDto', () => {
        const createUserDto = new CreateUserDto();
        expect(createUserDto).toBeInstanceOf(CreateUserDto);
    });

    it('should have the correct properties', () => {
        const createUserDto = new CreateUserDto();
        expect(createUserDto).toHaveProperty('firstName');
        expect(createUserDto).toHaveProperty('lastName');
        expect(createUserDto).toHaveProperty('email');
        expect(createUserDto).toHaveProperty('password');
        expect(createUserDto).toHaveProperty('bio');
        expect(createUserDto).toHaveProperty('confirmPassword');
    });

    it('should allow setting and getting properties', () => {
        const createUserDto = new CreateUserDto();
        createUserDto.firstName = 'John';
        createUserDto.lastName = 'Doe';
        createUserDto.email = 'john.doe@example.com';
        createUserDto.password = 'password123';
        createUserDto.bio = 'A short bio';
        createUserDto.confirmPassword = 'password123';

        expect(createUserDto.firstName).toBe('John');
        expect(createUserDto.lastName).toBe('Doe');
        expect(createUserDto.email).toBe('john.doe@example.com');
        expect(createUserDto.password).toBe('password123');
        expect(createUserDto.bio).toBe('A short bio');
        expect(createUserDto.confirmPassword).toBe('password123');
    });
});