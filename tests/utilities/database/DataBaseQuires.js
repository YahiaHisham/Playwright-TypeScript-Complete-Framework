const sql = require('mssql');

export class DatabaseQuires {
    
    async connectToDatabase(projectsDatabase) {
        try {
            const pool = await sql.connect(projectsDatabase); // Await the connection
            console.log('Connected to the database!');
            return pool; // Return the connected pool
        } catch (err) {
            console.error('Database connection error, maybe your VPN isn\'t opened:', err);
            throw err;
        }
    }

    async getEmployeeDepartment(projectsDatabase, employeeId) {
        const pool = await this.connectToDatabase(projectsDatabase);
        const result = await pool.request().query(`Enter your query here '${employeeId}'`);
        console.log("Query result:", result.recordset);
        const employeeDepartment = result.recordset.length > 0 ? result.recordset[0].QuoteReferenceNo : null;
        await pool.close();
        return employeeDepartment;
    }
}