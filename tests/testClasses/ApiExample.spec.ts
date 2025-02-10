import test from "playwright/test";
import { ApiHelper } from "../utilities/api/APIHelper";

test('this is an example of api helper class @smoke @regression', async ({ page }) => {

    //Send a GET Request with Query Parameters
    const getResponse = await ApiHelper.get('/users', { limit: '10', status: 'active' });
    console.log('GET Response:', await ApiHelper.getJsonResponse(getResponse));

    // Send a POST Request with JSON (Key-Value)
    const postResponse = await ApiHelper.post('/posts', {
        title: 'New Post',
        body: 'This is a sample post',
        userId: 1
    });
    console.log('POST Response:', await ApiHelper.getJsonResponse(postResponse));

    // Send a POST Request with FormData (File Upload)
    const formData = new FormData();
    formData.append('username', 'testUser');
    formData.append('password', 'testPassword');
    formData.append('file', new Blob(['Test file content']), 'testFile.txt');

    const postResponseWithFormdata = await ApiHelper.post('/upload', formData);
    console.log('File Upload Response:', await postResponseWithFormdata.text());

    // Send a PUT Request (Update Data)
    const putResponse = await ApiHelper.put('/users/1', { name: 'Updated User' });
    console.log('PUT Response:', await ApiHelper.getJsonResponse(putResponse));

    // Send a PATCH Request (Partial Update)
    const patchResponse = await ApiHelper.patch('/users/1', { email: 'updated@email.com' });
    console.log('PATCH Response:', await ApiHelper.getJsonResponse(patchResponse));

    // Send a DELETE Request
    const deleteResponse = await ApiHelper.delete('/users/1');
    console.log('DELETE Response:', deleteResponse.status());

});