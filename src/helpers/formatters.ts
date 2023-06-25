import { ValueType } from '@rc-component/mini-decimal'

export const rutFormatter = (rut: string) => {
  if (!rut) return ''
  const newRut = rut.replace(/\./g, '').replace(/-/g, '').trim().toLowerCase()
  const lastDigit = newRut.substring(-1, 1)
  const rutDigit = newRut.substring(0, newRut.length - 1)
  let format = ''
  for (let i = rutDigit.length; i > 0; i -= 1) {
    const e = rutDigit.charAt(i - 1)
    format = e.concat(format)
    if (i % 3 === 0) {
      format = '.'.concat(format)
    }
  }
  return format.concat('-').concat(lastDigit)
}

/*
  Formatter and parser for InputNumber component
  extracted from 
  https://stackoverflow.com/questions/63430864/regex-inputnumber-formatter-ant-design

*/

export const formatterNumber = (value: ValueType | undefined) => {
  if (!value) return '0'
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export const parserNumber = (value: string | undefined) => {
  if (!value) return '0'
  return Number.parseFloat(value.toString().replace(/\$\s?|(\.*)/g, "").replace(/(,{1})/g, ".")).toFixed(2)
}