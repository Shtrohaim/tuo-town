export default function () {
  const fieldValidation = (fields: any) => {
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const regexTel = /[^Z0-9]/g
    const regexName = /^([a-zа-яё]+)$/i

    const errors: any = {}
    let countErrors = 0
    for (const field in fields) {
      if (fields[field].value !== undefined) {
        fields[field].value = String(fields[field].value)
      } else {
        continue
      }
      if (fields[field].value.length === 0 && fields[field].required) {
        errors[field] = 'Поле не заполнено'
        countErrors++
      } else if (fields[field].value.length < 2 && fields[field].required) {
        errors[field] = 'Минимальная длина два символа'
        countErrors++
      }

      if (
        fields['tel'].value &&
        fields['tel'].value.replace(regexTel, '').length < 11 &&
        field === 'tel'
      ) {
        errors['tel'] = 'Поле заполнено не полностью'
        countErrors++
      }

      if (fields['email'].value && !regexEmail.test(fields['email'].value) && field === 'email') {
        errors['email'] = 'Некорректный E-mail'
        countErrors++
      }

      if (!regexName.test(fields['name'].value) && fields['name'].value && field === 'name') {
        errors['name'] = 'Имя должно содержать только буквы'
        countErrors++
      }

      if (fields[field].value === '' && !fields[field].required && errors[field]) {
        delete errors[field]
        countErrors--
      }
    }
    return {
      errors,
      countErrors
    }
  }

  return { fieldValidation }
}
