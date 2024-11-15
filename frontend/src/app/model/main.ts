export class currentBid{
    id:string="";
    name:string="";
    Country:string="";
    Records:any[]=[];
    base_p:number = 0;
}

export class getAcuHistory{
    id : string = ""
      team : string = ""
      pname : string = ""
      time : string = ""
      date : string = ""
      prize : number = 0
}

export class completedList{
    id : string = ""
      pname: string = ''
      tname: string = ''
      prize: number = 0
      bid_history: getAcuHistory[] =[]
}