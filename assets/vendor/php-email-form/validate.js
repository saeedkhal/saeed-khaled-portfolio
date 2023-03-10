/**
 * PHP Email Form Validation - v3.4
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function () {
  'use strict';

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

      var formData = {

          service_id:"service_huhwaft",
          template_id:"template_3joprxm",
          user_id:"f-9SjXE9tHqkyvmJU",
          template_params:{
              name: document.getElementById('name').value,
              email: document.getElementById('email').value,
              subject: document.getElementById('subject').value,
              body: document.getElementById('body').value
          },

      };

      if (recaptcha) {
        if (typeof grecaptcha !== 'undefined') {
          grecaptcha.ready(function () {
            try {
              grecaptcha
                .execute(recaptcha, { action: 'php_email_form_submit' })
                .then((token) => {
                  formData.set('recaptcha-response', token);
                  php_email_form_submit(thisForm, action, formData);
                });
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(
            thisForm,
            'The reCaptcha javascript API url is not loaded!'
          );
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    displayLoading();

    fetch(action, {
      method: 'POST',
      body: JSON.stringify(formData) ,
      headers: {'Content-Type': 'application/json'},
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(
            `${response.status} ${response.statusText} ${response.url}`
          );
        }
      })
      .then((data) => {
        if (data.trim() == 'OK') {
          displayMessage()
          thisForm.reset();
          setTimeout(() =>{
            hideMessage();
          },2000)
        } else {
          throw new Error(
            data
              ? data
              : 'Form submission failed and no error message returned from: ' +
                action
          );
        }
      }).finally(() =>{
        hideLoading();
      })
      .catch((error) => {
        hideLoading();
        displayError(thisForm, error);
        setTimeout(() =>{
          hideError();
        },2000)
      });
  }

  function displayError() {
    document.querySelector('.error-message').classList.remove('d-none');
    document.querySelector('.error-message').classList.add('d-block');
  }
  function hideError(error) {
    document.querySelector('.error-message').innerHTML = '';
    document.querySelector('.error-message').classList.remove('d-block');
    document.querySelector('.error-message').classList.add('d-none');

  }
  function displayLoading () {
    document.querySelector('.loading').classList.add('d-block');
    document.querySelector('.loading').classList.remove('d-none');
  }
  function hideLoading () {
    document.querySelector('.loading').classList.remove('d-block');
    document.querySelector('.loading').classList.add('d-none');
  }
  function displayMessage () {
    document.querySelector('.sent-message').classList.add('d-block');
    document.querySelector('.sent-message').classList.remove('d-none');
  }
  function hideMessage () {
    document.querySelector('.sent-message').classList.remove('d-block');
    document.querySelector('.sent-message').classList.add('d-none');
  }
})();
