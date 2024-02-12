const formatDate = (date) => {
    const options = {
      timeZone: 'Asia/Jakarta',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };

    const localizedDate = date
      ? new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))
      : new Date();

    return localizedDate.toLocaleDateString('en-US', options);
  };


function formatMataUang(amount, currency, locale = 'id-ID') {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
}
export { formatDate, formatMataUang };
