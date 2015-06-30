export default function getDate(string){
   var stringArr = string.split(' ');
   var numArray = [];

   stringArr.forEach(function(item){
      if(parseInt(item)){
          numArray.push(item);
      }
   });

    var date = new Date();
    date.setDate(numArray[0]);


   return date;
}
