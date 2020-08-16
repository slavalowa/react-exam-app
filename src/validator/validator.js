export function configValidation(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ''
  }
}

export const validate = (value, validation = null) => (
    !validation.required || !validation ? true: value.trim() !== ''
)

export function validateForm(controls) {
  let isFormValid = true

  for (let item in controls) {
    if (controls.hasOwnProperty(item)) {
      isFormValid = controls[item].valid && isFormValid
    }
  }

  return isFormValid
}