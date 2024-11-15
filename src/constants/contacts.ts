const address = '7000 Fredericia, Denmark';
const googleMapsLink = 'https://maps.app.goo.gl/h8cHAbw1dy66wZv37';
const phoneNumber = '+4540688222';
const email = 'cdefenseukraine@gmail.com';
const CVRnumber = '12352351';

export const contacts = {
  address: {
    text: address,
    link: googleMapsLink
  }, 
  phoneNumber: {
    get link() {
      const normalizedPhone = phoneNumber.slice(1).split('').filter((ch) => ch !== ' ').join('');
      return `tel:+ ${normalizedPhone}`;
    },
    get text() {
      const normalizedPhone = phoneNumber.slice(1).split('').filter((ch) => ch !== ' ').map((n, index) => {
        return index % 2 === 0 && index !== 0 ? ` ${n}` : n;
      }).join('');
      return `+${normalizedPhone}`;
    } 
  },

  email: {
    text: email,
    get link() {
      return `mailto:${this.text}`;
    } 
  },

  CVRnumber: {
    get text () {
      const normalizedCVR = CVRnumber.slice(1).split('').filter((ch) => ch !== ' ').join('');
      return `CVR No: ${normalizedCVR}`;
    } 
  }

};