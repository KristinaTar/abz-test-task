import React, { useState, useEffect } from 'react';
import './Form.scss';
import { getPosition, addNewUser } from '../../api/api';
import successImage from '../../images/success-image.svg';


const PHOTO_PLACEHOLDER = 'Upload photo';

type Props = {
  reloadUsers: () => void;
}

export const Form: React.FC<Props> = ({ reloadUsers }) => {
  const [positions, setPositions] = useState<Position[]>();
  const [fileInfo, setFileInfo] = useState({
    name: PHOTO_PLACEHOLDER,
    width: 0,
    heigh: 0,
    size: 0,
  });
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(1)
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorFile, setErrorFile] = useState('');
  const [sent, setSent] = useState(false);

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    setErrorName('');

  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value.toLocaleLowerCase());
    setErrorEmail('');
  }

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(e.target.value);
    setErrorPhone('');
  }



  const submitHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!file) {
      setErrorFile('Please upload photo');
    } else {
      addNewUser(
        name,
        email,
        phone,
        selectedPosition,
        file,
      ).then((res) => {

        if (res?.success) {
          reloadUsers();
          setSent(true);
        } else if (res?.fails) {
          if (res.fails.name) {
            setErrorName(res.fails.name[0]);
          }
          if (res.fails.email) {
            setErrorEmail(res.fails.email[0]);
          }
          if (res.fails.phone) {
            setErrorPhone(res.fails.phone[0]);
          }
          if (res.fails.photo) {
            setErrorFile(res.fails.photo[0]);
          }
        }
      });
    }
  }


  useEffect(() => {
    getPosition().then((res) => {
      setPositions(res.positions);
      return res;
    })
  }, []);


  return (
    !sent
      ? <div className="form__container">
        <span className='text-header'>Working with POST request</span>
        <div className='input_container'>
          <label
            className={'form__label ' + (errorName ? 'form__label-error' : '')}
            hidden={name === ""}
          >
            Name
          </label>
          <input
            className={'form__input ' + (errorName ? 'error__border' : '')}
            placeholder='Your name'
            value={name}
            type="text"
            onChange={(e) => handleName(e)}
          />
          <div className='error__message'>{errorName}</div>
          <label
            className={'form__label ' + (errorEmail ? 'form__label-error' : '')}
            hidden={email === ""}
          >
            Email
          </label>
          <input
            className={'form__input ' + (errorEmail ? 'error__border' : '')}
            placeholder='Email'
            value={email}
            type="text"
            onChange={(e) => handleEmail(e)}
          />
          <div className='error__message'>{errorEmail}</div>
          <label
            className={'form__label ' + (errorPhone ? 'form__label-error' : '')}
            hidden={phone === ""}
          >
            Phone
          </label>
          <input
            className={'form__input ' + (errorPhone ? 'error__border' : '')}
            placeholder='Phone'
            value={phone}
            type="text"
            onChange={(e) => handlePhone(e)}
          />
          <div className='form__phone'>+38 (XXX) XXX - XX - XX</div>
          <div className='error__message'>{errorPhone}</div>
          <div className='form__options'>
            <p>Select your position</p>
            {positions && positions.map(position => (
              <>
                <input
                  className='form__position'
                  type="radio" id="html"
                  name="position"
                  value={position.id}
                  key={position.id}
                  checked={selectedPosition === position.id}
                  onChange={() => setSelectedPosition(position.id)}
                />
                <label htmlFor="html">{position.name}</label><br></br>
              </>
            ))}
          </div>
          <input
            id="img-uploader"
            type="file"
            name="img-uploader"
            accept="image/*"
            className="hidden"
            placeholder="Upload your photo"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.currentTarget.files) {
                const file = event.currentTarget.files![0];

                const img = new Image();
                var objectUrl = window.URL.createObjectURL(file);
                img.src = objectUrl;
                img.onload = function () {
                  window.URL.revokeObjectURL(objectUrl);

                  setFileInfo({
                    name: file.name,
                    width: img.width,
                    heigh: img.height,
                    size: file.size,
                  });
                  setFile(file);
                };
              } else {
                setFileInfo({
                  name: PHOTO_PLACEHOLDER,
                  width: 0,
                  heigh: 0,
                  size: 0,
                });
                setFile(null);
              }
              setErrorFile('');
            }
            }
          />
          <div className="file__input-container">
            <label
              className={'file__button ' + (errorFile ? 'error__border' : '')}
              htmlFor="img-uploader"
            >
              Upload
            </label>
            <input
              className={'file__input ' + (errorFile ? 'error__border-file--input' : '')}
              id="file-name"
              value={fileInfo.name}
              disabled
            />
          </div>
          <div className='error__message'>{errorFile}</div>
        </div>
        <button
          onClick={(e) => submitHandler(e)}
          className="top_magrin_50"
          disabled={!name || !email || !phone || fileInfo.name === PHOTO_PLACEHOLDER}
        >
          Sign up
        </button>
      </div >
      : <div>
        <h1 className="text-header">User successfully registered</h1>
        <img src={successImage} className="success-image" alt="successfully sent" />
      </div>
  );
}

export default Form;

