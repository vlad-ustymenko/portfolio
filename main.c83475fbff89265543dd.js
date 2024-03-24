/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;
// import html from './index.html'

const elemToggleFunc = function (elem) {
  elem.classList.toggle('active')
}

//header sticky

const header = document.querySelector('.header')

window.addEventListener('scroll', function () {
  if (window.scrollY >= 10) {
    header.classList.add('active')
  } else {
    header.classList.remove('active')
  }
})

//navbar toggle

const navToggleBtn = document.querySelector('.header__menu-btn')
const navbar = document.querySelector('.header__menu')
const navbarHeader = document.querySelectorAll('.header__menu-link')

for (let i = 0; i < navbarHeader.length; i++) {
  navbarHeader[i].addEventListener('click', function () {
    closeMenu(navbarHeader[i])
  })
}

const closeMenu = function (elem) {
  navToggleBtn.classList.remove('active')
  navbar.classList.remove('active')
  document.body.classList.remove('active')
}

navToggleBtn.addEventListener('click', function () {
  elemToggleFunc(navToggleBtn)
  elemToggleFunc(navbar)
  elemToggleFunc(document.body)
})

//skill toggle

const toggleBtnBox = document.querySelector('.skills__toggle')
const toggleBtns = document.querySelectorAll('.skills__toggle-btn')
const skillsBox = document.querySelector('.skills__box')

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener('click', function () {
    elemToggleFunc(toggleBtnBox)
    for (let i = 0; i < toggleBtns.length; i++) {
      elemToggleFunc(toggleBtns[i])
    }
    elemToggleFunc(skillsBox)
  })
}

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector('.header__theme-switcher')

themeToggleBtn.addEventListener('click', function () {
  elemToggleFunc(themeToggleBtn)

  if (themeToggleBtn.classList.contains('active')) {
    document.body.classList.remove('dark_theme')
    document.body.classList.add('light_theme')

    localStorage.setItem('theme', 'light_theme')
  } else {
    document.body.classList.add('dark_theme')
    document.body.classList.remove('light_theme')

    localStorage.setItem('theme', 'dark_theme')
  }
})

// telephone mask

document.addEventListener('DOMContentLoaded', function () {
  let phoneInput = document.querySelector('input[data-tel-input]')

  let getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, '')
  }

  let onPhoneInput = function (e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      formatedInputValue = '',
      selectionStart = input.selectionStart

    if (!inputNumbersValue) {
      return (input.value = '')
    }

    if (['0', '3'].indexOf(inputNumbersValue[0]) > -1) {
      let firstSymbol = inputNumbersValue[0] == '0' ? '+38 (0' : '+38 (0'

      formatedInputValue = firstSymbol + ''

      if (input.value.length != selectionStart) {
        console.log(e)
        if (e.data && /\D/g.test(e.data)) {
          input.value = inputNumbersValue
        }
        return
      }

      if (inputNumbersValue.length > 1) {
        formatedInputValue += inputNumbersValue.substring(3, 5)
      }

      if (inputNumbersValue.length > 5) {
        formatedInputValue += ') ' + inputNumbersValue.substring(5, 8)
      }

      if (inputNumbersValue.length > 8) {
        formatedInputValue += '-' + inputNumbersValue.substring(8, 10)
      }

      if (inputNumbersValue.length > 10) {
        formatedInputValue += '-' + inputNumbersValue.substring(10, 13)
      }
    } else {
      formatedInputValue = `+${inputNumbersValue}`.substring(0, 16)
    }
    input.value = formatedInputValue
  }

  let onPhoneKeyDown = function (e) {
    let input = e.target
    if (e.keyCode == 8 && getInputNumbersValue(input).length == 3) {
      input.value = ''
    }
  }

  let onPhonePaste = function (e) {
    let pasted = e.clipboardData || window.clipboardData,
      input = e.target,
      inputNumbersValue = getInputNumbersValue(input)

    if (pasted) {
      let pastedText = pasted.getData('Text')
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue
      }
    }
  }

  phoneInput.addEventListener('input', onPhoneInput)
  phoneInput.addEventListener('keydown', onPhoneKeyDown)
  phoneInput.addEventListener('paste', onPhonePaste)

  let focusPhoneInput = function (e) {
    let input = e.target
    if (input.value == '') {
      return (input.value = `+38 (`)
    }
  }

  let blurPhoneInput = function (e) {
    let input = e.target
    if (input.value == '+38 (') {
      return (input.value = '')
    }
  }
  phoneInput.addEventListener('focus', focusPhoneInput)
  phoneInput.addEventListener('blur', blurPhoneInput)
})

//Form JSMailer

const formElement = document.getElementById('form') // извлекаем элемент формы
formElement.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(formElement)
  var params = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  }
  const serviceID = 'service_y4m7fhw'
  const templateID = 'template_adwbfvr'
  if (params.name !== '' && params.email !== '' && params.phone.length > 18) {
    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        document.getElementById('name').value = ''
        document.getElementById('email').value = ''
        document.getElementById('phone').value = ''
        document.getElementById('message').value = ''
        console.log(res)
        alert(
          'Your message has been sent successfully. Thank you for your request.'
        )
      })
      .catch((err) => console.log(err))
  } else {
    alert('Enter a correct phone number')
  }
})

/******/ })()
;