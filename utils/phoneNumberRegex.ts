export default function phoneNumberRegex(data: string){
    const regex = /^\+?[0-9]{1,15}$/;
    // const regex = /^[0-9+]*$/; // Hanya angka dan tanda + yang diperbolehkan.
    if (!regex.test(data)) {
      return; // Jangan perbarui state jika karakter tidak valid.
    }   
   
}