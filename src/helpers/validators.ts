const MAX_FILE_SIZE = 5 * 1e6; //5Mb
const MIN_IMAGE_SIZE = 70;
const ACCEPTED_IMG_EXTENSIONS = ['jpg', 'jpeg'];

export function validateName(name: string):boolean {
  return name.length >= 2 && name.length <= 60;
}

export function validateEmail(email: string):boolean {
  // eslint-disable-next-line no-control-regex
  const emailRegex = new RegExp(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$/);
  return emailRegex.test(email);
}


export function validatePhone(phone: string):boolean {
  const phoneRegex = new RegExp(/^[\+]{0,1}380([0-9]{9})$/)
  return phoneRegex.test(phone);
}

export function validatePhoto(image:{
  name: string,
  width: number,
  height: number,
  size: number,
}):boolean {
  const fileExtension = (image.name.split('.').pop())?.toLocaleLowerCase();

  return !(image.size > MAX_FILE_SIZE
    || !fileExtension
    || !ACCEPTED_IMG_EXTENSIONS.includes(fileExtension)
    || image.height < MIN_IMAGE_SIZE
    || image.width < MIN_IMAGE_SIZE
  );
}