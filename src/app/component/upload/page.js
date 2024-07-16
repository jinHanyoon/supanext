'use client'
import { useState } from 'react'
import supabase from '../../api/supabaseaApi';
import useUserSession from '../../hooks/authdata'

export default function Upload({ user }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { userName } = useUserSession();

  console.log(userName);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) return;

    setUploading(true);

    const fileName = image.name.replace(/\s+/g, '-').toLowerCase();

    try {
      const { data, error } = await supabase.storage
        .from('test_img')
        .upload(`${fileName}`, image);

      if (error) {
        console.error('Error uploading image:', error);
      } else {
        console.log('Image uploaded successfully:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setUploading(false);
    }
  };


    return (
      <div>
        <h1>{user}</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadImage} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>

        
      </div>
    )
  }