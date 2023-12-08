const inputValidation = (type, value) => {
  if (type === 'email') {
    if (value.length < 1) {
      return 'E-Mail не может быть пустым'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Невалидный адрес электронной почты'
    }
  } else if (type === 'password') {
    if (value.length < 1) {
      return 'Пароль не может быть пустым'
    }
    if (value.length < 4) {
      return 'Пароль не может быть короче 4 символов'
    }
  } else if (type === 'confirm') {
    if (value.length < 1) {
      return 'Подтверждение пароля не может быть пустым'
    }
    if (value.length < 4) {
      return 'Подтверждение пароля не может быть короче 4 символов'
    }
  } else if (type === 'title') {
    if (value.length < 1) {
      return 'Заголовок не может быть пустым'
    }
  } else if (type === 'content') {
    if (value.length < 1) {
      return 'Содержимое не может быть пустым'
    }
  }
  return ''
}

export default inputValidation
