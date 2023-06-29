export function uploadFile(file: File, onProgress: (percentage: number) => void) {
  const url = 'https://api.cloudinary.com/v1_1/demo/image/upload';
  const key = 'docs_upload_example_us_preset';
  return new Promise<{ url: string }>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      resolve(resp);
    };

    xhr.onerror = (event) => reject(event);

    xhr.upload.onprogress = (event) => {
      // The ProgressEvent.lengthComputable read-only property is a boolean flag indicating if the resource concerned
      // by the ProgressEvent has a length that can be calculated.
      // If not, the ProgressEvent.total property has no significant value.
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100; // percentage of upload completed
        onProgress(Math.round(percentage));
      }
    };
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', key);
    xhr.send(formData);
  });
}

export default uploadFile;
