import { UpdateUserDto } from './update-user.dto';

describe('UpdateUserDto', () => {
    it('should create an instance of UpdateUserDto', () => {
        const dto = new UpdateUserDto();
        expect(dto).toBeInstanceOf(UpdateUserDto);
    });

    it('should allow partial updates', () => {
        const dto = new UpdateUserDto();
        dto.firstName = 'John';
        dto.lastName = 'Doe';
        dto.email = 'john.doe@example.com';
        dto.bio = 'A short bio';
        dto.oldPassword = 'oldPassword123';
        dto.newPassword = 'newPassword123';
        dto.confirmPassword = 'newPassword123';

        expect(dto.firstName).toBe('John');
        expect(dto.lastName).toBe('Doe');
        expect(dto.email).toBe('john.doe@example.com');
        expect(dto.bio).toBe('A short bio');
        expect(dto.oldPassword).toBe('oldPassword123');
        expect(dto.newPassword).toBe('newPassword123');
        expect(dto.confirmPassword).toBe('newPassword123');
    });

    it('should allow empty fields', () => {
        const dto = new UpdateUserDto();
        expect(dto.firstName).toBeUndefined();
        expect(dto.lastName).toBeUndefined();
        expect(dto.email).toBeUndefined();
        expect(dto.bio).toBeUndefined();
        expect(dto.oldPassword).toBeUndefined();
        expect(dto.newPassword).toBeUndefined();
        expect(dto.confirmPassword).toBeUndefined();
    });
});