export default class Modal {
  constructor(element) {
    this._modal = document.querySelector(`${element}`);
    this._btnClose = this._modal.querySelector(`.btn-close`);
    this._btnEmail = this._modal.querySelector(`.btn-modal`);
    this._modalShare = this._modal.querySelector(`.modal-share`);
    this._modalContent = this._modal.querySelector(`.modal-content`);

    this._btnClose.addEventListener("click", this.closeModal.bind(this));
    this._btnEmail.addEventListener("click", this.sendEmail);
  }

  closeModal() {
    this._modal.style.display = "none";
  }

  showModal(showEnviarEmail = false) {
    this._modal.style.display = "block";
    if (showEnviarEmail) {
      this._btnEmail.style.display = "block";
      this._modalShare.style.display = "block";
    }
  }

  setModalText(text) {
    this._modalContent.innerText = text;
  }

  async sendEmail() {
    try {
      /* Chamar função na api que irá enviar email */
      // alert("E-mail enviado com sucesso");
    } catch (error) {
      console.error(error);
    }
  }
}
