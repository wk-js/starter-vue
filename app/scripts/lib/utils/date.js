'use strict'

const MONTHS = {
  en: [ 'January', 'February', 'March', 'April',  'May',  'June',    'July', 'August',  'September', 'October',  'November',  'December' ],
  fr: [ 'Janvier',  'Février',  'Mars', 'Avril',  'Mai',  'Juin', 'Juillet',   'Août',  'Septembre', 'Octobre',  'Novembre',  'Décembre' ],
  es: [   'Enero',  'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]
}

const DAYS = {
  en: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday',   'Friday', 'Saterday',   'Sunday' ],
  fr: [  'Lundi',   'Mardi',  'Mercredi',    'Jeudi', 'Vendredi',   'Samedi', 'Dimanche' ],
  es: [  'Lunes',  'Martes', 'Miércoles',   'Jueves',  'Viernes',   'Sábado',  'Domingo' ]
}

function getDayName(locale, index, slice) {
  if (!isNaN(slice)) return DAYS[locale][index].slice(0, slice)
  return DAYS[locale][index]
}

function getMonthName(locale, index, slice) {
  if (!isNaN(slice)) return MONTHS[locale][index].slice(0, slice)
  return MONTHS[locale][index]
}

export default {
  getDayName,
  getMonthName
}