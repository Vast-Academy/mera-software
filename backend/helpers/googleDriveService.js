const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const os = require('os');

class GoogleDriveService {
  constructor(keyFilePath, folderName) {
    this.keyFilePath = keyFilePath;
    this.folderName = folderName;
    this.driveClient = this.createDriveClient();
  }

  createDriveClient() {
    const auth = new google.auth.GoogleAuth({
      keyFile: this.keyFilePath,
      scopes: ['https://www.googleapis.com/auth/drive']
    });
   
    return google.drive({ version: 'v3', auth });
  }

  // Create folder in Google Drive if it doesn't exist
  async createFolder() {
    try {
      console.log(`Looking for folder: ${this.folderName}`);
      
      // Check if folder already exists
      const response = await this.driveClient.files.list({
        q: `name='${this.folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)'
      });
      
      console.log(`Found ${response.data.files.length} matching folders`);
      
      if (response.data.files.length > 0) {
        // Folder exists, return the ID
        console.log(`Using existing folder: ${response.data.files[0].name} (${response.data.files[0].id})`);
        return response.data.files[0].id;
      }
      
      // Folder doesn't exist, create it
      console.log(`Creating new folder: ${this.folderName}`);
      const fileMetadata = {
        name: this.folderName,
        mimeType: 'application/vnd.google-apps.folder'
      };
      
      const newFolder = await this.driveClient.files.create({
        resource: fileMetadata,
        fields: 'id'
      });
      
      console.log(`Created folder with ID: ${newFolder.data.id}`);
      
      // Make the folder public so links will work
      await this.driveClient.permissions.create({
        fileId: newFolder.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });
      
      console.log(`Set public permissions on folder: ${newFolder.data.id}`);
      
      return newFolder.data.id;
    } catch (error) {
      console.error('Error creating folder:', error.message);
      if (error.response) {
        console.error('Response error details:', error.response.data);
      }
      throw error;
    }
  }

  // Upload file to Google Drive
  async uploadFile(fileName, fileBuffer, mimeType, folderId) {
    try {
      console.log(`Starting upload for file: ${fileName}`);
      
      const fileMetadata = {
        name: fileName,
        parents: [folderId]
      };
      
      // Create a temporary file
      const tempFilePath = path.join(os.tmpdir(), fileName);
      fs.writeFileSync(tempFilePath, fileBuffer);
      
      const media = {
        mimeType,
        body: fs.createReadStream(tempFilePath)
      };
      
      console.log(`Uploading file to Google Drive in folder: ${folderId}`);
      const response = await this.driveClient.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id,name,webViewLink'
      });
      
      console.log(`File uploaded with ID: ${response.data.id}`);
      
      // Set public permissions so anyone with the link can view
      console.log(`Setting public permissions for file: ${response.data.id}`);
      await this.driveClient.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });
      
      // Clean up temp file after upload
      fs.unlinkSync(tempFilePath);
      
      // For images, create an embedable link
      let embedLink = null;
      if (mimeType && mimeType.startsWith('image/')) {
        embedLink = `https://drive.google.com/uc?export=view&id=${response.data.id}`;
        console.log(`Created embed link for image: ${embedLink}`);
      }
      
      return {
        id: response.data.id,
        name: response.data.name,
        link: response.data.webViewLink,
        embedLink: embedLink
      };
    } catch (error) {
      console.error('Error uploading file:', error.message);
      if (error.response) {
        console.error('Response error details:', error.response.data);
      }
      throw error;
    }
  }

  // Delete file from Google Drive
  async deleteFile(fileId) {
    try {
      await this.driveClient.files.delete({
        fileId
      });
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // List files from a specific folder
  async listFiles(folderId) {
    try {
      const response = await this.driveClient.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: 'files(id, name, mimeType, webViewLink, createdTime)'
      });
      return response.data.files;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  // Set expiration time for a file (by scheduling deletion)
  async scheduleFileDeletion(fileId, expirationDays) {
    // This method would typically be used with a job scheduler
    // For demonstration purposes, we're just calculating the deletion date
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + expirationDays);
   
    // In a real application, you would store this information in your database
    // and use a job scheduler like node-cron to delete files when they expire
    return {
      fileId,
      deletionDate
    };
  }
  
  // Get a direct download link for a file
  getDownloadLink(fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  
  // Get an embedable link for images
  getEmbedableImageLink(fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  // Get an embedable link for documents (PDF, DOC, etc.)
getEmbedableDocumentLink(fileId) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
  }
}

module.exports = GoogleDriveService;