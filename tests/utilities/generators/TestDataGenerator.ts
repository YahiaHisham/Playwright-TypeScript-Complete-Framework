import { faker } from '@faker-js/faker';

export class TestDataGenerator {
    
    /**
     * Generates a random full name.
     * @returns {string} Full Name
     */
    static getFullName(): string {
        return faker.person.fullName();
    }

    /**
     * Generates a random email.
     * @returns {string} Random Email
     */
    static getEmail(): string {
        return `${faker.person.firstName().toLowerCase()}${faker.number.int(1000)}@test.com`;
    }

    /**
     * Generates a random number of a given length.
     * @param {number} length - Length of the number
     * @returns {string} Random Number as String
     */
    static getRandomNumber(length: number): string {
        return faker.string.numeric(length);
    }

    /**
     * Generates a random phone number.
     * @returns {string} Random Phone Number
     */
    static getPhoneNumber(): string {
        return faker.phone.number();
    }

    /**
     * Generates a random street address.
     * @returns {string} Random Address
     */
    static getAddress(): string {
        return faker.location.streetAddress();
    }

    /**
     * Generates a random city.
     * @returns {string} Random City
     */
    static getCity(): string {
        return faker.location.city();
    }

    /**
     * Generates a random state.
     * @returns {string} Random State
     */
    static getState(): string {
        return faker.location.state();
    }

    /**
     * Generates a random zip code.
     * @returns {string} Random Zip Code
     */
    static getZipCode(): string {
        return faker.location.zipCode();
    }

    /**
     * Generates a random company name.
     * @returns {string} Random Company Name
     */
    static getCompanyName(): string {
        return faker.company.name();
    }

    /**
     * Generates a random UUID.
     * @returns {string} Random UUID
     */
    static getUUID(): string {
        return faker.string.uuid();
    }

    /**
     * Generates a random password with custom length.
     * @param {number} length - Length of the password
     * @returns {string} Random Password
     */
    static getRandomPassword(length: number): string {
        return faker.internet.password({ length });
    }

    /**
     * Generates a random past date.
     * @returns {string} Random Past Date (YYYY-MM-DD)
     */
    static getRandomDate(): string {
        return faker.date.past().toISOString().split('T')[0];
    }

    /**
     * Generates a random text message.
     * @returns {string} Random Text
     */
    static getRandomText(): string {
        return faker.lorem.sentence();
    }

     /**
     * Generates a random string of the specified length (letters + numbers).
     * @param {number} length - Length of the generated string.
     * @returns {string} Random alphanumeric string.
     */
     static getRandomChars(length: number): string {
        return faker.string.alpha(length);
    }
}
