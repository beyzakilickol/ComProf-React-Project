
document.querySelector('.spanStar').addEventListener('click', function() {

    this.classList.add('checked');

  document.querySelector('.spanStar5').classList.remove('checked')
  document.querySelector('.spanStar2').classList.remove('checked')
    document.querySelector('.spanStar3').classList.remove('checked')
        document.querySelector('.spanStar4').classList.remove('checked')
});
document.querySelector('.spanStar2').addEventListener('click', function() {
  this.classList.add('checked');
  document.querySelector('.spanStar').classList.add('checked')

  document.querySelector('.spanStar3').classList.remove('checked')
  document.querySelector('.spanStar4').classList.remove('checked')
  document.querySelector('.spanStar5').classList.remove('checked')


});
document.querySelector('.spanStar3').addEventListener('click', function() {
  this.classList.add('checked');
  document.querySelector('.spanStar').classList.add('checked')
  document.querySelector('.spanStar2').classList.add('checked')

  document.querySelector('.spanStar4').classList.remove('checked')
  document.querySelector('.spanStar5').classList.remove('checked')
});
document.querySelector('.spanStar4').addEventListener('click', function() {
  this.classList.add('checked');
  document.querySelector('.spanStar').classList.add('checked')
  document.querySelector('.spanStar2').classList.add('checked')

  document.querySelector('.spanStar3').classList.add('checked')
  document.querySelector('.spanStar5').classList.remove('checked')
});
document.querySelector('.spanStar5').addEventListener('click', function() {
  this.classList.add('checked');
  document.querySelector('.spanStar').classList.add('checked')
  document.querySelector('.spanStar2').classList.add('checked')

  document.querySelector('.spanStar4').classList.add('checked')
  document.querySelector('.spanStar3').classList.add('checked')
});
