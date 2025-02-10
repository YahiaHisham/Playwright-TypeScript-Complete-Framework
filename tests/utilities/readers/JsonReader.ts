import * as fs from 'fs';
import * as path from 'path';


class JsonReader {
    private static readonly jsonFilesLocation = path.join(process.cwd(), 'tests', 'data', 'jsonFiles');
    private static readonly fileExtension = '.json';
    private static filePath: string;

    /**
     * Sets the file path based on the provided file name.
     * @param fileName - The name of the file to set the path for.
     */
    public static setFilePath(fileName: string): void {
        this.filePath = path.join(this.jsonFilesLocation, `${fileName}${this.fileExtension}`);
        console.log('File Path:', this.filePath);
    }

    /**
     * Updates a value in the JSON file based on the provided key path.
     * @param keyPath - The key path to update in the JSON file.
     * @param newValue - The new value to set.
     * @param fileName - The name of the file to update.
     */
    public static updateValueInJsonFile(keyPath: string, newValue: any, fileName: string): void {
        try {
            // Set the file path
            this.setFilePath(fileName);

            // Load the JSON file
            const fileData = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));

            // Traverse and update the value at the specified key path
            const keys = keyPath.split('.');
            let current = fileData;

            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (!current[key]) {
                    throw new Error(`Key path '${keyPath}' not found`);
                }
                current = current[key];
            }

            // Update the final key with the new value
            current[keys[keys.length - 1]] = newValue;

            // Save the updated JSON file
            fs.writeFileSync(this.filePath, JSON.stringify(fileData, null, 2), 'utf-8');
            console.log(`Updated keyPath '${keyPath}' with value '${newValue}' successfully.`);
        } catch (error) {
            console.error(`Error updating JSON file: ${error.message}`);
        }
    }

    /**
     * Retrieves a value from the JSON file based on the provided key path.
     * @param keyPath - The key path to retrieve from the JSON file.
     * @param fileName - The name of the file to retrieve from.
     * @returns The value at the specified key path.
     */
    public static getValueFromJsonFile(keyPath: string, fileName: string): any {
        try {
            // Set the file path
            this.setFilePath(fileName);

            // Load the JSON file
            const fileData = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));

            // Traverse the JSON object using the key path to retrieve the value
            const keys = keyPath.split('.');
            let current = fileData;

            for (const key of keys) {
                if (!current.hasOwnProperty(key)) {
                    throw new Error(`Key path '${keyPath}' not found`);
                }
                current = current[key];
            }

            console.log(`Retrieved value at keyPath '${keyPath}': ${current}`);
            return current; // Return the value found at the key path
        } catch (error) {
            console.error(`Error reading value from JSON file: ${error.message}`);
            throw error;
        }
    }
}

export default JsonReader;
