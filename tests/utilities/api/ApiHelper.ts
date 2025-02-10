import { APIRequestContext, APIResponse, request } from '@playwright/test';

// Handles JSON, FormData, and Raw Strings dynamically → No need to manually set headers.
export class ApiHelper {
    private static apiContext: APIRequestContext;

    /**
     * Initializes API context with base URL and headers.
     * @param {string} baseUrl - The base URL for the API.
     * @param {Record<string, string>} headers - Default headers for requests.
     */
    public static async initialize(baseUrl: string, headers: Record<string, string> = {}): Promise<void> {
        this.apiContext = await request.newContext({
            baseURL: baseUrl,
            extraHTTPHeaders: headers
        });
    }

    /**
     * Sends a GET request.
     * @param {string} endpoint - API endpoint.
     * @param {Record<string, string>} [queryParams] - Query parameters.
     * @returns {Promise<APIResponse>} API response.
     */
    public static async get(endpoint: string, queryParams?: Record<string, string>): Promise<APIResponse> {
        const url = queryParams ? `${endpoint}?${new URLSearchParams(queryParams)}` : endpoint;
        return await this.apiContext.get(url);
    }

    /**
     * Sends a POST request.
     * @param {string} endpoint - API endpoint.
     * @param {Record<string, any> | FormData | string} body - Request body (JSON, FormData, or raw string).
     * @returns {Promise<APIResponse>} API response.
     */
    public static async post(endpoint: string, body: Record<string, any> | FormData | string): Promise<APIResponse> {
        return await this.apiContext.post(endpoint, this.createRequestOptions(body));
    }

    /**
     * Sends a PUT request.
     * @param {string} endpoint - API endpoint.
     * @param {Record<string, any> | FormData | string} body - Request body (JSON, FormData, or raw string).
     * @returns {Promise<APIResponse>} API response.
     */
    public static async put(endpoint: string, body: Record<string, any> | FormData | string): Promise<APIResponse> {
        return await this.apiContext.put(endpoint, this.createRequestOptions(body));
    }

    /**
     * Sends a PATCH request.
     * @param {string} endpoint - API endpoint.
     * @param {Record<string, any> | FormData | string} body - Request body (JSON, FormData, or raw string).
     * @returns {Promise<APIResponse>} API response.
     */
    public static async patch(endpoint: string, body: Record<string, any> | FormData | string): Promise<APIResponse> {
        return await this.apiContext.patch(endpoint, this.createRequestOptions(body));
    }

    /**
     * Sends a DELETE request.
     * @param {string} endpoint - API endpoint.
     * @returns {Promise<APIResponse>} API response.
     */
    public static async delete(endpoint: string): Promise<APIResponse> {
        return await this.apiContext.delete(endpoint);
    }

    /**
     * Extracts JSON response from APIResponse.
     * @param {APIResponse} response - API response object.
     * @returns {Promise<any>} Parsed JSON data.
     */
    public static async getJsonResponse(response: APIResponse): Promise<any> {
        return await response.json();
    }

    /**
     * Creates request options based on body type.
     * @param {Record<string, any> | FormData | string} body - Request body.
     * @returns {Record<string, any>} Request options.
     */
    private static createRequestOptions(body: Record<string, any> | FormData | string): Record<string, any> {
        if (body instanceof FormData) {
            return { multipart: body }; // Handle FormData (file uploads)
        } else if (typeof body === 'string') {
            return { body }; // Handle raw string body (e.g., XML, plain text)
        } else {
            return { data: body }; // Default: JSON request body
        }
    }

    /**
     * Closes the API context.
     */
    public static async close(): Promise<void> {
        await this.apiContext.dispose();
    }
}
