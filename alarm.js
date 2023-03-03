// Notification toast
function Notification(msg)
{   document.getElementById("toast-message").innerHTML="";
    const toastLiveExample = document.getElementById('liveToast');
    document.getElementById("toast-message").innerHTML=msg;
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}



// Getting Dom element
let timediv = document.getElementById("time-div");

// creating a date object
const date=new Date();
document.getElementById("earthAndTime").innerHTML='<i class="fa-solid fa-earth-asia earth"></i> '+date;
// Setting day Name Wise 
let day;
switch (date.getDay()) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case  6:
      day = "Sat";
  }

//   Setting Month Name wise
  let month;
  switch (date.getMonth()) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "Febuary";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case  6:
      month = "July";
      break;
    case 7:
        month="August";
        break;
    case 8:
        month="september";
        break;
    case 9:
        month="October";
        break;
    case 10:
        month="November";
        break;
    case 11: 
        month="December";
  }
  let year=date.getFullYear();
// setting day, month and year in (day,Month Year format : Wed,March 2023)
timediv.innerHTML = day + ","+month+" "+ year;


// Analog and digital Clock Here
(()=>{

    // getting DOM elements for analog clock
    let hrhand=document.getElementById("hour");
    let minhand=document.getElementById("minute");
    let sechand=document.getElementById("second");

    // getting Dom Elements for digital clock
    let digitalHour = document.getElementById("digital-hour");
    let digitalMinute = document.getElementById("digital-minute");
    let digitalSecond = document.getElementById("digital-second");
    let AmPm = document.getElementById("AmPm");

// using set Interval to change the position of second hand , minute hand and  hour hand.
    setInterval(()=>{
        let dateObj=new Date();
        let hr=dateObj.getHours();
        let min= dateObj.getMinutes();
        let sec=dateObj.getSeconds();

        hrhand.style.rotate = (hr*30)+(min/2)+"deg";
        minhand.style.rotate = (min*6)+"deg";
        sechand.style.rotate = (sec*6)+"deg";


        // Code for Digital Clock
        let datestr=dateObj.toLocaleTimeString();
       
        AmPm.innerHTML = datestr.substring(datestr.length-2,datestr.length);

        if(parseInt(datestr.substring(0,2)) <10?digitalHour.innerHTML="0"+datestr.substring(0,1):digitalHour.innerHTML=datestr.substring(0,2));
        
        if(min<10? digitalMinute.innerHTML="0"+min: digitalMinute.innerHTML=min);
        if(sec<10? digitalSecond.innerHTML="0"+sec: digitalSecond.innerHTML=sec);
        
       


    },1000);
})();



// Global Alarm Array to store Alarms:-

let Alarms=[];


// function createAlarm is triggered when the save button is clicked in the set new Alarm Model

// saving an Alarm After Setting it.
function createAlarm()
{
    let Alarm={};   /*creating alarm object  */
    let errors=[]; /*creating errors Array to store errors  */

   let alarmName = document.getElementById("alarmName");    /*getting alarm name  */
   let timeEntered= document.getElementById("time");         /*getting time of Alarm  */

    Alarm.name=alarmName.value;                 /*setting alarm name in the alarm object */

        //    validation on time
    if(timeEntered.value=="")
            {
                timeEntered.nextElementSibling.innerHTML="Please Enter Valid Time!";
                errors.push(1);
            }
    else
        {
            timeEntered.nextElementSibling.innerHTML="";

            if(!(errors.length==0))
            {
                errors.pop();
            }
            Alarm.time=timeEntered.value;
            
            // calculating Am / Pm in time 
           let ampm = timeEntered.value.slice(0,2) >= 12 ? 'pm' : 'am';

           Alarm.AmPm=ampm;
        }

    // getting days from a multi select box 

    let selected = document.getElementById("selectDays");
    let opts = [...selected.options].filter((option)=>{return option.selected && option.value!="";}).map(option => option.value);

            Alarm.days=opts;
            Alarm.id=Date.now();

            // Track/Audio set for an Alarm
    let track=document.getElementById("selectTrack");
         if(track.value==""?track.value='track-1':track.value); /* validating track if no track selected select nokia track by default */

        //  setting Track
        Alarm.track=track.value;

            Alarm.on=true; /*By Default An Alarm is turned On  */
        if(errors.length==0) /*if no errors are present */
        {   
             Alarms.push(Alarm);
            display(Alarm);
            displaylatest();
            

            document.getElementById("close").click();
            Notification("Alarm Created Successfully");
        }

   

//   close modal after validation and other things.
// to be done 
// not done yet!

}


// getting the list to render alarms in it
const list=document.getElementById("alarmList");

// displaying Alarm
/* this function saves a lot of time as we will be needing to render only one Alarm at a time 
 and will not be traversing through the Alarms Array again again for rendering the data.
*/

function display(alarm)
{
            if(alarm.on==true)
            {
                list.innerHTML+=
                ' <li class="list-group-item d-flex justify-content-between align-items-center"><span>'+alarm.name+' &nbsp;'+alarm.time+'<sub>'+alarm.AmPm +'</sub></span>  <div class="w-20 d-flex justify-content-around"> <i data-id="'+alarm.id +'" class="toggle on fa-solid fa-power-off"></i><i data-id="'+alarm.id +'" class="delete fa-solid fa-trash"></i>  </div></li>';
                    
            }
        else
            {
                list.innerHTML+=
                ' <li class="list-group-item d-flex justify-content-between align-items-center"><span>'+alarm.name+' &nbsp;'+alarm.time+'<sub>'+alarm.AmPm +'</sub></span>  <div class="w-20 d-flex justify-content-around"> <i data-id="'+alarm.id +'" class="toggle off fa-solid fa-power-off"></i><i data-id="'+alarm.id +'" class="delete fa-solid fa-trash"></i>  </div></li>';
            }

                checkAlarmToRing();
}


// Render alarms Here
function renderAlarms()
{
    list.innerHTML="";
    if(Alarms.length==0)
    {
        return;
    }
    else{
        for (const alarm of Alarms) {

            if(alarm.on==true)
                {
                    list.innerHTML+=
                    ' <li class="list-group-item d-flex justify-content-between align-items-center"><span>'+alarm.name+' &nbsp;'+alarm.time+'<sub>'+alarm.AmPm +'</sub></span>  <div class="w-20 d-flex justify-content-around"> <i data-id="'+alarm.id +'" class="toggle on fa-solid fa-power-off"></i><i data-id="'+alarm.id +'" class="delete fa-solid fa-trash"></i>  </div></li>';
                        
                }
            else
                {
                    list.innerHTML+=
                    ' <li class="list-group-item d-flex justify-content-between align-items-center"><span>'+alarm.name+' &nbsp;'+alarm.time+'<sub>'+alarm.AmPm +'</sub></span>  <div class="w-20 d-flex justify-content-around"> <i data-id="'+alarm.id +'" class="toggle off fa-solid fa-power-off"></i><i data-id="'+alarm.id +'" class="delete fa-solid fa-trash"></i>  </div></li>';
                }

            }
    }
    
};


// turn on or Off Alarm
function toggleOnOff(target){

    if(target.dataset==undefined || target ==null){
        return;
    }
 
    let dataid =target.dataset.id;
    for (const alarms of Alarms) {
        if(alarms.id==dataid)
        {
           
            if(alarms.on==true)
            {
                alarms.on=false;
                target.classList.remove("on");
                target.classList.add("off");
                Notification("Alarm turned Off!");
            }
            else
            {
               alarms.on=true;
               target.classList.add("on");
               target.classList.remove("off");
               Notification("Alarm Turned On!");
            }
            break;
        }
    }

    renderAlarms();
    displaylatest();
    checkAlarmToRing();
}


// remove Alarm Function is here!
function removeAlarm(target){
    const del = target.getAttribute('data-id'); /*also Works fine */
   
    // filtering the array and taking all the elements except the matched one (which is to be deleted)
    const newAlarms=Alarms.filter((t)=>{
        return t.id != del;
    });
    // filling Alarms again (we can also achieve the same functionality using array.splice method)
    Alarms=newAlarms;
    renderAlarms();
    displaylatest();
    Notification("Alarm Deleted Successfully!");
    // rendering total Alarms value
}


/*display latest Alarms*/
function displaylatest()
{
    let recentAlarms=document.getElementById("recentAlarms");
    recentAlarms.innerHTML="";

    let limit;
    let alarms={};
    if(Alarms.length<=3?limit=0:limit=Alarms.length-3);

    for(let i=Alarms.length;i>=limit;i--)
    {
        
        alarms=Alarms[i-1];
        
        if (alarms == undefined || alarms == null) {
            // Now we know that foo is defined, we are good to go.
            return;
          }
            if(alarms.on==true)
                {
                    recentAlarms.innerHTML+=
                                ' <li class="list-group-item d-flex justify-content-between align-items-center lh-lg"><span>'+alarms.name+' &nbsp;'+alarms.time+'<sub>'+alarms.AmPm +'</sub></span>  <div class="w-20 d-flex justify-content-around"> <i data-id="'+alarms.id +'" class="toggle on fa-solid fa-power-off"></i><i data-id="'+alarms.id +'" class="delete fa-solid fa-trash"></i>  </div></li>';
                        
                }
            else
                {
                    recentAlarms.innerHTML+=
                    ' <li class="list-group-item d-flex justify-content-between align-items-center lh-lg"><span>'+alarms.name+' &nbsp;'+alarms.time+'<sub>'+alarms.AmPm +'</sub></span>  <div class="w-20 d-flex justify-content-around"> <i data-id="'+alarms.id +'" class="toggle off fa-solid fa-power-off"></i><i data-id="'+alarms.id +'" class="delete fa-solid fa-trash"></i>  </div></li>';
            
                }
    }
}



// check which Alarms to ring In the current Hour
function checkAlarmToRing()
{
    let date = new Date();
    let hour= date.getHours();
    
    for(const alarm of Alarms){
        if(alarm.on==true)
        {
            if(alarm.time.slice(0,2)==hour)
                        {
                        checkMinutes(alarm.id);
                        //   don't pass Alarm ; pass the Alarm id instead and if id doesn't exist then dont ring it
                        }
        }
        
    }
    
}


// check minutes of alarm after hours have matched and alarm is on 
function checkMinutes(id)
{   
    if(id=="" || id==null || id==undefined)
    {
        return;
    }
    

    // doing the check again and again will infact make timecomplexity worse but will enhance the functionality of the Project.

    for(const [i,alarm] of Alarms.entries()){
        if(alarm.id==id)
        {
           id=i;
           break;
        }
        
    }

    let Alarm;
   
    let interval=setInterval(()=>{

        Alarm=Alarms[id];
         
        if(Alarm==null || Alarm==undefined )
        {
            clearInterval(interval);
            return;
        }

        let alarmMinutes=Alarm.time.slice(3,Alarm.length);
        let min =  new Date().getMinutes();

       if(Alarm.on==true)
       {
            if(min == alarmMinutes)
                    {
                        clearInterval(interval);
                        ringAlarm(Alarm);
                    }
                    else if(min > alarmMinutes)
                    {
                        clearInterval(interval);
                    }
       }
       else
       {
        clearInterval(interval);
       }
        


    },5000);
}


// Ring Alarm with tune
function ringAlarm(Alarm)
{
            let track=Alarm.track;
            let audioTrack=document.getElementById(track);
            audioTrack.loop=true;
            audioTrack.play();
            ringingAlert('Alarm Is Ringing!',Alarm);
    
}


// display alert for ringing and stop ringing here
function ringingAlert(msg,Alarm)
    {   
        document.getElementById("Ring-Alarm").innerHTML="";
        document.getElementById("Ring-Alarm").innerHTML=msg+' <button type="button" class="btn btn-primary" id="stopAlarm1"  data-bs-dismiss="toast" aria-label="Close">Turn Off</button>';
       
        const toastLiveExample = document.getElementById('ringToast');
        

        document.getElementById("toastHeading").innerHTML="";
        document.getElementById("toastHeading").innerHTML=Alarm.time+Alarm.AmPm;

        document.getElementById("stopAlarm").addEventListener("click",stopAlarm);
        document.getElementById("stopAlarm1").addEventListener("click",stopAlarm);
       
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.autohide="false";
        toast.show();

        function stopAlarm()
        {
            let track=Alarm.track;
            let audioTrack=document.getElementById(track);
            audioTrack.loop=false;
            audioTrack.pause();
            audioTrack.currentTime=0;
            for(const a of Alarms)
            {
                if(a.id==Alarm.id)
                {
                    a.on=false;
                    renderAlarms();
                    displaylatest();
                    return;

                }

            }
        }
}


// handling click events on edit and delete buttons
function clickEvent(e)
{
    const target = e.target;
    console.log();
    if(target.classList[0]==="toggle"? toggleOnOff( e.target):"");
    else if(target.classList[0]==="delete"?removeAlarm(e.target):'');
}


// adding event listener to view and edit modal
(()=>{
  document.getElementById("viewAndEdit").addEventListener('click',clickEvent);
document.getElementById("recentAlarms").addEventListener('click',clickEvent);  
})();
