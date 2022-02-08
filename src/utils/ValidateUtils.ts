const validateEmail = (mail: string): boolean => {
  return /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/.test(
    mail
  )
}

const validateThaiCharacter = (character: string): boolean => {
  return /^[ก-๏\s]+$/.test(character)
}

const validateEngCharacter = (character: string): boolean => {
  return /^[A-Za-z]+$/.test(character)
}

const validateNumber = (number: string): boolean => {
  return /^\d+$/.test(number)
}


export default {
  validateEmail,
  validateThaiCharacter,
  validateEngCharacter,
  validateNumber
}
