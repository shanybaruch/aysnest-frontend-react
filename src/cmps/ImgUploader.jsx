import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null }) {
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    if (!ev.target.files || ev.target.files.length === 0) {
      return
    }
    setIsUploading(true)
    try {
      const url = await uploadService.uploadImg(ev)
      if (url && typeof url === 'string') {
        if (onUploaded) onUploaded(url)
      } else {
        console.error('Upload failed: Invalid URL returned', url)
      }
    } catch (err) {
      console.error('Failed to upload', err)
    } finally {
      setIsUploading(false)
    }
  }


  return (
    <div className="img-uploader-container">
      <label
        htmlFor="imgUpload"
        className="edit-btn"
        style={{
          backgroundColor: 'var(--gray-light)',
          fontWeight: '500',
          padding: '.6em .8em',
          borderRadius: '10px',
          fontSize: '.8rem',
          cursor: 'pointer'
        }}
      >
        {isUploading ? 'Uploading...' : 'Edit'}
      </label>

      <input
        type="file"
        onChange={uploadImg}
        accept="image/*"
        id="imgUpload"
        style={{ display: 'none' }}
      />
    </div>
  )
}