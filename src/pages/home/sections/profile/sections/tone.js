import React from 'react';
import toneAnalyzer from '../../../../../helpers/watson';

const GetTone = props => {

  const text = `my name is Julia and I'm 19 years old in 2017 was diagnosed with major 
  depressive disorder I almost lost this battle I didn't think it was gonna get better 
  but it did I've had anxiety since I was a little kid I always had this feeling that 
  something terrible was gonna happen and that presented itself and tightness in my 
  chest I'd get really shaky I would have a lot of stomach pain those were the physical
   ways that it came out for the longest time I didn't know that was my anxiety I just 
   knew that was something that happened to me around middle school I started to get
    depressed and it progressively got worse as I got into high school everything just 
    seemed kind of grey and a lot of worthlessness too I don't have anything to offer 
    from the outside I think I hit it pretty well I was a straight-a student I hung out 
    with my friends I babysat all the time I was involved in my church youth group I 
    didn't let people see that there was something going on that was what stayed closed 
    behind my bedroom door things started to feel more heavy I started to self-harm 
    as a way to cope I started having suicidal ideation I told my mom I don't think 
    I can keep myself safe and I know my parents were shocked when they knew how 
    bad it actually was it was on a Sunday night my mom called children's their 
    hotline I was evaluated by a social worker and I think it was honestly the first 
    time I was completely open about what was happening and I told my social worker 
    that I didn't necessarily want to die and I knew that I needed a break from what was
     happening from all the things I was feeling and death seems like the only option 
     I just remember crying to her and being like I don't know what else to do like I'm 
     stuck [Music] here I was completely broken I could barely see the point in staying 
     alive I felt so ashamed of myself and these people they just treated me like a person
      I felt validated and I had some hope and like you know I knew that like okay when.`;

  const toneParams = {
    toneInput: { 'text': text },
    contentType: 'application/json',
  };

  const watsone = () => {
    toneAnalyzer.tone(toneParams)
      .then(toneAnalysis => {
        console.log(JSON.stringify(toneAnalysis, null, 2));
      })
      .catch(err => {
        console.log('error:', err);
      });
  }

  return <button onClick={watsone}>get tone</button>
}

export default GetTone;