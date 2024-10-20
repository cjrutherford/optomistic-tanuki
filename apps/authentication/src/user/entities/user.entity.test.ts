import { UserEntity } from './user.entity';
import { KeyDatum as KeyDataEntity } from '../../key-data/entities/key-datum.entity';
import { TokenEntity } from '../../tokens/entities/token.entity';

describe('UserEntity', () => {
    it('should have a UUID as the primary key', () => {
        const user = new UserEntity();
        expect(user).toHaveProperty('id');
        expect(typeof user.id).toBe('string');
    });

    it('should have an email column', () => {
        const user = new UserEntity();
        user.email = 'test@example.com';
        expect(user.email).toBe('test@example.com');
    });

    it('should have a firstName column', () => {
        const user = new UserEntity();
        user.firstName = 'John';
        expect(user.firstName).toBe('John');
    });

    it('should have a lastName column', () => {
        const user = new UserEntity();
        user.lastName = 'Doe';
        expect(user.lastName).toBe('Doe');
    });

    it('should have a password column', () => {
        const user = new UserEntity();
        user.password = 'password123';
        expect(user.password).toBe('password123');
    });

    it('should have a bio column of type text', () => {
        const user = new UserEntity();
        user.bio = 'This is a bio';
        expect(user.bio).toBe('This is a bio');
    });

    it('should have a one-to-many relationship with TokenEntity', () => {
        const user = new UserEntity();
        const token = new TokenEntity();
        user.tokens = [token];
        expect(user.tokens).toContain(token);
    });

    it('should have a one-to-one relationship with KeyDataEntity', () => {
        const user = new UserEntity();
        const keyData = new KeyDataEntity();
        user.keyData = keyData;
        expect(user.keyData).toBe(keyData);
    });
});