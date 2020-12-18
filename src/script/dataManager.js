

export function makeCorrectStringFromDate(dateInMs) {
  let date = new Date(dateInMs);
  let month = ((date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let day = ((date.getDate() + 1 < 10) ? '0' + (date.getDate()) : date.getDate());

  return date.getFullYear() + '-' + month + '-' + day;
}

export default function extractData(df) {

  df.forEach(element => {

    let date = new Date(element.Date);


    element['Date'] = date.getTime();

  });

  return df;
}