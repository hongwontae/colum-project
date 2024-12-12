export function dateDataFormatted(date){
    const dateParts = date.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/);
    const year = dateParts[1]; // 2024
    const month = dateParts[2].padStart(2, "0"); // 10 (한 자리수일 경우 앞에 0 추가)
    const day = dateParts[3].padStart(2, "0"); // 01 (한 자리수일 경우 앞에 0 추가)
  
    return`${year}-${month}-${day}`;
}


export function matchResultDivide(result){
    const splitResult = result.split('');
    return [splitResult[0], splitResult[splitResult.length-1]]
}