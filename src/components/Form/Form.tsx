import React, { useState, useEffect } from 'react';
import './Form.scss';
import { getPosition, addNewUser } from '../../api/api';
import successImage from '../../images/success-image.svg';
import {validateEmail, validateName, validatePhone, validatePhoto} from "../../helpers/validators";


const PHOTO_PLACEHOLDER = 'Upload photo';

type Props = {
  reloadUsers: () => void;
}

export const Form: React.FC<Props> = ({ reloadUsers }) => {
  const [positions, setPositions] = useState<Position[]>();
  const [fileInfo, setFileInfo] = useState({
    name: PHOTO_PLACEHOLDER,
    width: 0,
    height: 0,
    size: 0,
  });
  const [file, setFile] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    selectedPosition: 1,
  })

  const [error, setError]=useState({
    errorName: '',
    errorEmail: '',
    errorPhone: '',
    errorFile: '',
  });

  const [sent, setSent] = useState(false);

  function handleName(name: string) {
    setUserInfo({...userInfo, name});
    setError({...error, errorName: ''});
  }

  function handleEmail(email: string) {
    setUserInfo({...userInfo, email: email.toLocaleLowerCase()});
    setError({...error, errorEmail: ''});
  }

  function handlePhone(phone: string) {
    setUserInfo({...userInfo, phone: phone});
    setError({...error, errorPhone: ''});

  }

  function nameBlurHandler (name: string){
    if(!validateName(name)){
      setError({...error, errorName: "Wrong name"})
    }
  }

  function emailBlurHandler(email: string){
    if(!validateEmail(email)) {
      setError({...error, errorEmail: "Not valid email"})
    }
  }

  function phoneBlurHandler(phone: string){
    if(!validatePhone(phone)) {
      setError({...error, errorPhone: "Not valid phone"})
    }
  }




  const submitHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!file) {
      setError({...error, errorFile: 'Please upload photo'});
    } else {
      addNewUser(
        userInfo.name,
        userInfo.email,
        userInfo.phone,
        userInfo.selectedPosition,
        file,
      ).then((res) => {

        if (res?.success) {
          reloadUsers();
          setSent(true);
        } else if (res?.fails) {
          let newErrors:Partial<typeof error> = {};

          if (res.fails.name) {
            newErrors.errorName = res.fails.name[0];
          }
          if (res.fails.email) {
            newErrors.errorEmail = res.fails.email[0];
          }
          if (res.fails.phone) {
            newErrors.errorPhone = res.fails.phone[0];
          }
          if (res.fails.photo) {
            newErrors.errorFile = res.fails.photo[0];
          }

          setError({...error, ...newErrors});
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
            className={'form__label ' + (error.errorName ? 'form__label-error' : '')}
            hidden={userInfo.name === ""}
          >
            Name
          </label>
          <input
            className={'form__input ' + (error.errorName? 'error__border' : '')}
            placeholder='Your name'
            value={userInfo.name}
            type="text"
            onChange={(e) => handleName(e.target.value)}
            onBlur={(e)=> nameBlurHandler(e.target.value)}
          />

          <div className='error__message'>{error.errorName}</div>
          <label
            className={'form__label ' + (error.errorEmail ? 'form__label-error' : '')}
            hidden={userInfo.email === ""}
          >
            Email
          </label>
          <input
            className={'form__input ' + (error.errorEmail ? 'error__border' : '')}
            placeholder='Email'
            value={userInfo.email}
            type="text"
            onChange={(e) => handleEmail(e.target.value)}
            onBlur={(e)=> emailBlurHandler(e.target.value)}
          />
          <div className='error__message'>{error.errorEmail}</div>
          <label
            className={'form__label ' + (error.errorPhone ? 'form__label-error' : '')}
            hidden={userInfo.phone === ""}
          >
            Phone
          </label>
          <input
            className={'form__input ' + (error.errorPhone ? 'error__border' : '')}
            placeholder='Phone'
            value={userInfo.phone}
            type="text"
            onChange={(e) => handlePhone(e.target.value)}
            onBlur={(e)=> phoneBlurHandler(e.target.value)}
          />
          <div className='form__phone'>+38 (XXX) XXX - XX - XX</div>
          <div className='error__message'>{error.errorPhone}</div>
          <div className='form__options'>
            <p>Select your position</p>
            {positions && positions.map(position => (
              <div key={position.id}>
                <input
                  className='form__position'
                  type="radio"
                  id={`position-${position.id}`}
                  name="position"
                  value={position.id}
                  checked={userInfo.selectedPosition === position.id}
                  onChange={() => setUserInfo({...userInfo, selectedPosition: position.id})}
                />
                <label htmlFor={`position-${position.id}`}>{position.name}</label><br></br>
              </div>
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
                const objectUrl = window.URL.createObjectURL(file);
                img.src = objectUrl;
                img.onload = function () {
                  window.URL.revokeObjectURL(objectUrl);

                  const newFileInfo = {
                    name: file.name,
                    width: img.width,
                    height: img.height,
                    size: file.size,
                  };
                  setFileInfo({
                    ...newFileInfo
                  });
                  setFile(file);
                  console.log()
                  console.log(validatePhoto(newFileInfo))

                  if(!validatePhoto(newFileInfo)){
                    setError({...error, errorFile: "not valid photo"})
                  } else {
                    setError({...error, errorFile: ''});
                  }
                };
              } else {
                setFileInfo({
                  name: PHOTO_PLACEHOLDER,
                  width: 0,
                  height: 0,
                  size: 0,
                });
                setFile(null);

              }

            }}
          />
          <div className="file__input-container">
            <label
              className={'file__button ' + (error.errorFile ? 'error__border' : '')}
              htmlFor="img-uploader"
            >
              Upload
            </label>
            <input
              className={'file__input ' + (error.errorFile ? 'error__border-file--input' : '')}
              id="file-name"
              value={fileInfo.name}
              disabled
            />
          </div>
          <div className='error__message'>{error.errorFile}</div>
        </div>
        <button
          onClick={(e) => submitHandler(e)}
          className="top_magrin_50"
          disabled={!userInfo.name || !userInfo.email || !userInfo.phone || fileInfo.name === PHOTO_PLACEHOLDER}
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
