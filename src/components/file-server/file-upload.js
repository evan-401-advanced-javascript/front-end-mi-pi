import React, { useState, useContext } from 'react';
import axios from 'axios';
import Message from './message';
import Progress from './progress';
import { LoginContext } from '../auth/context';
import '../../styling/upload.css';

const arr = [];

const If = (props) => {
  return props.condition ? props.children : null;
};

const FileUpload = () => {
  const context = useContext(LoginContext);

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [savedFiles, setSavedFiles] = useState([]);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    arr.push(filename);
    setSavedFiles(arr);

    try {
      const res = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt( // eslint-disable-line
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
            ),
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <>
      <If condition={context.loggedIn}>
        <div className="upload">
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
        </div>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            {
              savedFiles.map((files, i) => (
                <>
                <h3 className='text-center'>{savedFiles[i]}</h3>
                <button>Delete File</button>
                </>
              ))
            }

            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}

      </If>
    </>
  );
};

export default FileUpload;
